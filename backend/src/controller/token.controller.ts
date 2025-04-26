import { Request, Response } from "express";
import { TokenModel } from "../db/schema/token.schema";
import { Token, TokenQuery } from "../db/schema/token.schema.interface";
import { CrudService } from "../service/crud.service";
import Logger, { ILogger } from "../utils/logger";
import {ClientResponse} from '@packages/utils'
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
      const result =await this.tokenCrud.add(token, {
        contractAddress: token.contractAddress
      });
      res.status(200).json(result)
    } catch (error) {
      res.status(400).send({
        message:'Internal Error',
        detail:error  
      })
    }
  };

  getQuery = async (req: Request, res: Response) => {

    try {
      const { page=1, limit=50, ...query } = req.query as TokenQuery;
 
      const [total_records, data] = await Promise.all([
        TokenModel.countDocuments(query),
        TokenModel
            .find(query)
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit)
            .exec(),
    ]);
    const totalPages= Math.ceil(total_records / Math.max(limit, 1))
    const response:ClientResponse<Token[]>= {
        data,
        pagination: {
          total_records,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage:page > 1,
        },
    };
      res.status(200).json(response)
      this.logger.info("Get all ")
    } catch (error) {
      res.status(400).send({
        message:'Internal Error',
        detail:error  
      })
    }
  };
  getByAddress = async (req: Request, res: Response) => {
    const address=req.params.address as string
    try {
      const result =await this.tokenCrud.findOne({contractAddress:address});
      res.status(200).json(result)
    } catch (error) {
      res.status(400).send({
        message:'Internal Error',
        detail:error  
      })
    }
  };

updateOne = async (req: Request, res: Response) => {
  const address = req.params.address as string;
  const updates = req.body as Partial<Token>;

  try {
    const updated = await this.tokenCrud.updateOne(
      { contractAddress: address },
      updates
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).send({
      message: 'Internal Error',
      detail: error,
    });
  }
};

delete = async (req: Request, res: Response) => {
  const address = req.params.address as string;

  try {
    const deleted = await this.tokenCrud.removeDocument({ contractAddress: address });
    res.status(200).json({
      ...deleted,
      message: 'Token deleted successfully',
    });
  } catch (error) {
    res.status(400).send({
      message: 'Internal Error',
      detail: error,
    });
  }
};
}
