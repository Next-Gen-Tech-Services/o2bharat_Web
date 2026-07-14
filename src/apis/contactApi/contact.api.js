// import { getTokenLocal } from "../../utils/localStorage.util";

import ApiRoutes from "../../configs/config.api";
import HttpClient from "../index.api";
const baseURL = import.meta.env.VITE_API_URL;

class ContactApi extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      //   config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
      config.headers["ngrok-skip-browser-warning"] = `true`;

      config.headers["authkey"] = import.meta.env.VITE_AUTH_KEY;
      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (response) => {
        return Promise.resolve(response);
      }
    );
  };

  RaiseRequestConfig = ApiRoutes.Contact.RaiseRequest;

  submitFamilyForm = async (updateData) => {
    return this.instance({
      method: this.RaiseRequestConfig.Method,
      url: this.RaiseRequestConfig.Endpoint,
      //   headers: {},
      data: updateData,
    });
  };

}

export default ContactApi;
