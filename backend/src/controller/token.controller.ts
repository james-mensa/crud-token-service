import { Request, Response } from "express";
import { TokenModel } from "../db/schema/token.schema";
import { Token } from "../db/schema/token.schema.interface";
import { CrudService } from "../service/crud.service";
import Logger, { ILogger } from "../utils/logger";

export class TokenController {
  private logger: ILogger;

  private tokenCrud: CrudService<Token>;
  constructor() {
    this.logger = new Logger("Token Service").get();
    this.tokenCrud = new CrudService(TokenModel, this.logger);
  }
  add = async (req: Request, res: Response) => {
    try {
      const token = req.body as Token;
      const res = this.tokenCrud.add(token, {
        contractAddress: token.contractAddress
      });
    } catch (error) {}
  };

  getAll = async (req: Request, res: Response) => {};
  getById = async (req: Request, res: Response) => {};
  updateOne = async (req: Request, res: Response) => {};
  delete = async (req: Request, res: Response) => {};
}
