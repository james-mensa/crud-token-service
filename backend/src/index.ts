import { appConfig } from "./utils/config";
import MongoDBConnection from "./db/db-connection";
import Logger, {ILogger} from "./utils/logger";
import createServer from "./server/createServer";
import rootRouter from "./routers/routers";

class Application {
  private dbConnection: MongoDBConnection;
  logger: ILogger;
  
  constructor() {
    this.logger = new Logger("Application").get();
    this.dbConnection = new MongoDBConnection(appConfig.MONGO_URI, {
      dbName: appConfig.MONGO_DB_NAME_PREFIX
    });
  }

  async initialize() {
    try {
      await this.healthChecks();
      await this.start();
    } catch (error) {
      this.logger.error("Application initialization failed", { error });
      process.exit(1);
    }
  }


  private async healthChecks() {

    // check Prerequisites
    const port = appConfig.HTTP_PORT;
    if (!port) {
      this.logger.error("HTTP_PORT environment variable is required");
      throw new Error("Missing HTTP_PORT configuration");
    }

    // check db connection
    try {
      this.logger.info("Establishing database connection...", {
        mongoUri: appConfig.MONGO_URI
      });
      
      const isConnected = await this.dbConnection.isConnected();
      this.logger.info("Database connection status", { isConnected });
      
      if (!isConnected) {
        throw new Error("Failed to establish database connection");
      }
    } catch (error) {
      this.logger.error("Database connection failed", { error });
      throw error;
    }
  }

  private async start() {
    try {
      const httpServer = createServer(rootRouter, this.logger);
      const port = appConfig.HTTP_PORT;
      
      await new Promise<void>((resolve) => {
        httpServer.listen(port, () => {
          this.logger.info(`Server started on port: ${port}`);
          resolve();
        });
      });
      
      // Connect to DB 
      await this.dbConnection.connect();
    } catch (error) {
      this.logger.error("Server startup failed", { error });
      throw error;
    }
  }

  async shutdown() {
    try {
      this.logger.info("Shutting down application...");
      await this.dbConnection.close();
      this.logger.info("Application shutdown complete");
    } catch (error) {
      this.logger.error("Error during shutdown", { error });
    } finally {
      process.exit(0);
    }
  }
}

// entry point
(async () => {
  const application = new Application();
  
  try {
    await application.initialize();

    process.on("SIGTERM", () => application.shutdown());
    process.on("SIGINT", () => application.shutdown());
    process.on("unhandledRejection", (reason) => {
      application.logger.error("Unhandled rejection", { reason });
      application.shutdown();
    });
  } catch (error) {
    application.logger.error("Application failed to start", { error });
    process.exit(1);
  }
})();