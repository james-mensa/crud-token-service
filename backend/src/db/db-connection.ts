import mongoose from 'mongoose';
import  Logger,{ILogger}  from '../utils/logger';

export type DBConnectionOptions = {} & mongoose.ConnectOptions;

export default class MongoDBConnection {
    private uri!: string;
    private con!: mongoose.Mongoose;
    private options: mongoose.ConnectOptions;
    private logger:ILogger

    constructor(uri: string, options?: mongoose.ConnectOptions) {
        this.uri = uri;
        this.options = options || {};
        this.logger=new Logger('Database').get()
    }

    public  async isConnected() {
        try {
            const res = await mongoose.connect(this.uri);
            const version = res.version;
            await mongoose.disconnect();
            return { version };
        } catch (error) {
            
            this.logger.error('MongoDB connection error:', error);
            throw error;
        }
    }

    
    public async connect(): Promise<mongoose.Mongoose> {
        try {
            this.con = await mongoose.connect(this.uri, this.options);
        } catch (error) {
            this.logger.error('MongoDB connection error:', error);
            throw error;
        }
        return this.con;
    }

    public async close() {
        await this.con.disconnect();
    }
}
