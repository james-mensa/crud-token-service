import { Schema, model } from 'mongoose';

import { Token, TokenType } from './token.schema.interface';

const TokenSchema = new Schema<Token>({
    tokenType: { type: String, enum: Object.values(TokenType), required: true },
    contractAddress: { type: String, required: true ,unique:true},
    tokenName: { type: String, required: true },
    tokenSymbol: { type: String, required: true },
    decimal: { type: Number },
    tokenID: { type: Number },
    tokenIconUri: { type: String },
});
export default TokenSchema;

export const TokenModel = model<Token>('token', TokenSchema);
