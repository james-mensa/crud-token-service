export interface Pagination {
    page?: number;
    limit?: number;
    maxLimit?: number;
    defaultSort?: Record<string, 1 | -1>;
}