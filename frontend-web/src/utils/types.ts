import {ClientResponse} from '@packages/utils'

interface BaseQueryParams {
    limit?: number;
    page?: number;
  }

export interface RequestResponse<T> extends ClientResponse<T>{
    success:boolean
}

