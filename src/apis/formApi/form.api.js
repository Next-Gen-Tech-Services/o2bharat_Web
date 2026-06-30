// import { getTokenLocal } from "../../utils/localStorage.util";

import ApiRoutes from "../../configs/config.api";
import HttpClient from "../index.api";
const baseURL = import.meta.env.VITE_API_URL;

class FormApi extends HttpClient {
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

  submitFamilyFormConfig = ApiRoutes.FamilyForm.SubmitFamilyForm;
  getStateConfig = ApiRoutes.FamilyForm.GetState;
  getCityConfig = ApiRoutes.FamilyForm.GetCity;
  getCasteConfig = ApiRoutes.FamilyForm.GetCaste;
  getOccupationConfig = ApiRoutes.FamilyForm.GetOccupations;
  getEducationConfig = ApiRoutes.FamilyForm.GetEducation;
  getSurveyorsConfig = ApiRoutes.FamilyForm.GetSurveyors;
  getSubCasteConfig = ApiRoutes.FamilyForm.GetSubCaste;
  getGotraConfig = ApiRoutes.FamilyForm.GetGotras;


  submitFamilyForm = async (updateData) => {
    return this.instance({
      method: this.submitFamilyFormConfig.Method,
      url: this.submitFamilyFormConfig.Endpoint,
      //   headers: {},
      data: updateData,
    });
  };


  getStates = async ({ page = 1, limit = 10, search = "" } = {}) => {
    return this.instance({
      method: this.getStateConfig.Method,
      url: this.getStateConfig.Endpoint,
      params: {
        page,
        limit,
        search,
      },
    });
  };

  getCities = async ({
    stateId,
    page = 1,
    limit = 10,
  } = {}) => {
    return this.instance({
      method: this.getCityConfig.Method,
      url: this.getCityConfig.Endpoint,
      params: {
        stateId,
        page,
        limit,
      },
    });
  };

  getCastes = async ({ page = 1, limit = 10, search = "" } = {}) => {
    return this.instance({
      method: this.getCasteConfig.Method,
      url: this.getCasteConfig.Endpoint,
      params: {
        page,
        limit,
        search,
      },
    });
  };

  getSubCastes = async ({
    casteId,
    page = 1,
    limit = 10,
    search = "",
  } = {}) => {
    return this.instance({
      method: this.getSubCasteConfig.Method,
      url: this.getSubCasteConfig.Endpoint,
      params: {
        casteId,
        page,
        limit,
        search,
      },
    });
  };

  getGotras = async ({
    subCasteId,
    page = 1,
    limit = 10,
    search = "",
  } = {}) => {
    return this.instance({
      method: this.getGotraConfig.Method,
      url: this.getGotraConfig.Endpoint,
      params: {
        subCasteId,
        page,
        limit,
        search,
      },
    });
  };

  getEducation = async ({ page = 1, limit = 10, search = "" } = {}) => {
    return this.instance({
      method: this.getEducationConfig.Method,
      url: this.getEducationConfig.Endpoint,
      params: {
        page,
        limit,
        search,
      },
    });
  };

  getOccupations = async ({ page = 1, limit = 10, search = "" } = {}) => {
    return this.instance({
      method: this.getOccupationConfig.Method,
      url: this.getOccupationConfig.Endpoint,
      data: {
        page,
        limit,
        search,
      },
    });
  };

  getSurveyors = async ({
    stateId,
    cityId,
    casteId,
    subCasteId,
    page = 1,
    limit = 1000,
  } = {}) => {
    return this.instance({
      method: this.getSurveyorsConfig.Method,
      url: this.getSurveyorsConfig.Endpoint,
      params: {
        stateId,
        cityId,
        casteId,
        subCasteId,
        page,
        limit,
      },
    });
  };

}

export default FormApi;
