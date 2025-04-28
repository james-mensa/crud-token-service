import { Token, TokenQuery } from "@packages/utils";
import { buildQuery } from "@utils/common";
import { apiService } from "./api.service";

const createToken = async (data: Token) => {
  return apiService.apiRequest<Token>("post", `tokens`, data);
};
const getTokens = async (queryParams?:TokenQuery) => {
  const query = buildQuery(queryParams);
  return apiService.apiRequest<Token[]>("get", `tokens${query}`);
};

const getToken = async (contract_address:string)=> {
    return  apiService.apiRequest<Token>('get',`tokens/${contract_address}`)
 };

 const updateToken= async (contract_address:string,data:Partial<Token>)=> {
    return  apiService.apiRequest<Token>('put',`tokens/${contract_address}`,data)
 };
 
 const deleteToken = async (contract_address:string)=> {
    return  apiService.apiRequest<null>('delete',`tokens/${contract_address}`)
 };
 

export const tokenApi = {
    createToken,
    getTokens,
    getToken,
    updateToken,
    deleteToken
};