

export enum TokenType {
    ERC20 = 'ERC-20',
    ERC721 = 'ERC-721',
    ERC1155 = 'ERC-1155',
  }
  export interface Token{
    tokenType: TokenType;
    contractAddress: string;
    tokenName: string;
    tokenSymbol: string;
    decimal?: number;
    tokenID?: number;
    tokenIconUri?: string
  }

  export interface ResponseType<T>{
      message?:string,
      data:T| null,
      details?:object | string
  }
  
  export interface Pagination {
    total_records: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
  export interface ClientResponse<T> extends ResponseType<T>  {
      pagination?: Pagination
  }
  export interface TokenQuery extends Partial<Token> ,Pick<Pagination,'page' | 'limit'>{
    
  }