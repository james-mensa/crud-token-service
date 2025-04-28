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
    tokenIconUri?: string;
}
