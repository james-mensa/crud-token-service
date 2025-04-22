
import { Response } from "express";
import { ResponseType } from "../types";
import Logger, { ILogger } from "../logger";

export class ClientResponseHandler<T> {
  private res: Response;
  private logger: ILogger;
  constructor(res: Response, service?: string) {
    this.res = res;
    this.logger = new Logger(service ?? "").get();
  }
  public send(
    statusCode: 200 | 400  | 404 | 500 |401,
    message: string = "",
    data: T | T[] | null = null
  ) {
    const clientResponse: ResponseType<T | T[]> = { data };
    clientResponse.message = message;
    

    return this.res.status(statusCode).json(clientResponse);
  }

  handleError = (
    error: any,
    statusCode:200 | 400  | 404 | 500 |401 ,
    message: string
  ) => {
   
   
    this.logger.error(message)

    this.res.send({ code:statusCode, message });
  };
}