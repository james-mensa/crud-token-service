import { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/validator/aj-validator';
import { Token, TokenType } from '../schema/token.schema.interface';

export const TokenDocumentResponseId = 'TokenDocumentResponseId';

export const TokenDocumentSchema: JSONSchemaType<Token> = {
  $id: TokenDocumentResponseId,
  type: 'object',
  properties: {
    tokenType: {
      type: 'string',
      enum: [TokenType.ERC20, TokenType.ERC721, TokenType.ERC1155],
    },
    contractAddress: { type: 'string' },
    tokenName: { type: 'string' },
    tokenSymbol: { type: 'string' },
    decimal: { type: 'number', nullable: true },
    tokenID: { type: 'number', nullable: true },
    tokenIconUri: { type: 'string', nullable: true },
  },
  required: ['tokenType', 'contractAddress', 'tokenName', 'tokenSymbol'],
  additionalProperties: false,
};

ajv.addSchema(TokenDocumentSchema);
