import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({ baseURL });
    this._initializeResponseInterceptor();
  }

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  _handleResponse = (response) => {
    const { data } = response;

    // Optional: Uncomment for global toast messages
    /*
    if (data.status === "success") {
      toast.success(capitalize(data.message) || "Request successful!");
    } else if (data.status === "fail" || data.status === "error") {
      toast.error(capitalize(data.message) || "Something went wrong!");
    }
    */
    return data;
  };

  // _handleError = async ({ response, config }) => {
  //   const originalRequest = config;

  //   // Optional: Retry logic for 401 Unauthorized
  //   if (response?.status === 401 && !originalRequest._retry) {
  //     originalRequest._retry = true;
  //     toast.error("Session expired! Please Log in again.");

  //     return this.instance(originalRequest);
  //   }

  //   // Optional: Show error message
  //   // toast.error(response?.data?.message || "An unexpected error occurred!");

  //   return Promise.reject(response);
  // };
  _handleError = async ({ response, config }) => {
    const originalRequest = config;

    // --- Case 1: 401 Unauthorized ---
    // if (response?.status === 401) {
    //   // Only redirect if NOT on login-related pages
    //   if (
    //     !originalRequest._retry &&
    //     window.location.pathname !== "/login" &&
    //     window.location.pathname !== "/sign-up" &&
    //     window.location.pathname !== "/forgot-password" &&
    //     window.location.pathname !== "/reset-password"
    //   ) {
    //     originalRequest._retry = true;
    //     toast.error("Session expired! Please log in again.");
    //     window.location.href = "/login";
    //   }

    //   return Promise.reject(response);
    // }

    // --- Case 2: Other errors (400, 403, 404, 500, etc.) ---
    // if (response?.status >= 400) {
    //   const message =
    //     response?.data?.message ||
    //     response?.statusText ||
    //     "Something went wrong. Please try again.";
    //   console.error(message);
    // }

    // --- Retry network errors if not already retried ---
    if (!originalRequest._retry) {
      originalRequest._retry = true;
      return this.instance(originalRequest);
    }

    return Promise.reject(response);
  };
}

export default HttpClient;
