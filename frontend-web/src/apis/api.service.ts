import { ClientResponse, IPagination } from "../config/types";
import { handleError } from "../utils/handleError";
import { authApiClient } from "./apiClient";

/**
 * Service class to handle API requests with various HTTP methods.
 */
class ApiService {
  /**
   * Generic method to handle API requests with dynamic content type and headers.
   *
   * @template T - The expected response data type.
   * @param {("get" | "post" | "put" | "delete")} method - The HTTP method to be used for the request.
   * @param {string} endpoint - The endpoint URL (relative to the API base URL).
   * @param {any} [data] - The data to be sent with the request (optional).
   * @param {Record<string, string>} [headers] - The custom headers to be included in the request (optional).
   *
   * @returns {Promise<ClientResponse<T>>} - A promise that resolves to the API response in a standardized format.
   */
  async apiRequest<T>(
    method: "get" | "post" | "put" | "delete" | "patch",
    endpoint: string,
    data?: object,
    headers?: Record<string, string>
  ): Promise<ClientResponse<T>> {
    let response: ClientResponse<T> = { message: "", success: false };
    try {
      const res = await authApiClient[method](endpoint, data, { headers });
      if ([200, 201, 202, 204, 205, 206].includes(res.status)) {
        let pagination: IPagination = {
          current_page: null,
          page_size: null,
          total_pages: null,
          hasPreviousPage: false,
          hasNextPage: false,
        };
        if (res.data?.extras?.pagination) {
          const paginationData = res.data?.extras?.pagination;
          pagination = {
            current_page: paginationData.current_page,
            page_size: paginationData.page_size,
            hasPreviousPage: paginationData.previous_page ? true : false,
            hasNextPage: paginationData.next_page ? true : false,
            total_pages: paginationData.total_pages,
          };
        }
        return {
          message:
            res.status === 204
              ? "Request successful"
              : res.data?.message || "Request completed successfully.",
          data: res.status === 204 ? undefined : (res.data?.data as T),
          pagination,
          success: true,
        };
      }

      return {
        ...response,
        message: `Unexpected response status: ${res.status}`,
      };
    } catch (error) {
      // console.log({error})
      const errorMessage = handleError(error);
      response.message = errorMessage.message;
    }
    return response;
  }
}

export const apiService = new ApiService();
