
import { ClientResponse } from "@packages/utils";
import { RequestResponse } from "@utils/types";
import { ApiClient } from "./apiClient";
import { handleError } from "@utils/errorHandler";

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
  ): Promise<RequestResponse<T>> {
    let response: RequestResponse<T> = { message: "",data:null, success: false };
    try {
      const res = await ApiClient[method](endpoint, data, { headers });
      if ([200, 201, 202, 204, 205, 206].includes(res.status)) {
   
        const clientResponse:ClientResponse<T>=res.data
        return {
          ...clientResponse,
          message:
          res.status === 204
              ? "Request successful"
              : res.data?.message || "Request completed successfully.",
          success: true,
        };
      }

      return {
        ...response,
        message: `Unexpected response status: ${res.status}`,
      };
    } catch (error) {
      const errorMessage = handleError(error);
      response.message = errorMessage.message;
    }
    return response;
  }
}

export const apiService = new ApiService();
