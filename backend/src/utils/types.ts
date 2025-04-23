export interface ResponseType<T>{
    message?:string,
    data:T| null,
    details?:object | string
 
}


export interface Pagination {
    page?: number;
    limit?: number;
    maxLimit?: number;
    defaultSort?: Record<string, 1 | -1>;
}

export interface PaginationResponse<T> extends ResponseType<T> {
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}