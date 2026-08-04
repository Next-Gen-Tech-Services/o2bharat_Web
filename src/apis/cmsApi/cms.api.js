import ApiRoutes from "../../configs/config.api";
import HttpClient from "../index.api";

const baseURL = import.meta.env.VITE_API_URL;

class CMSApi extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["ngrok-skip-browser-warning"] = `true`;
      if (import.meta.env.VITE_AUTH_KEY) {
        config.headers["authkey"] = import.meta.env.VITE_AUTH_KEY;
      }
      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.resolve(error)
    );
  };

  getContentBySlug = async (slug) => {
    return this.instance({
      method: ApiRoutes.CMS.GetContent.Method,
      url: ApiRoutes.CMS.GetContent.Endpoint,
      params: {
        scope: "GLOBAL",
        slug,
      },
    });
  };
}

export default CMSApi;
