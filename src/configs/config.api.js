export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Delete: "DELETE",
};

const ApiRoutes = {

  FamilyForm: {
    SubmitFamilyForm: {
      Endpoint: "/family/submit",
      Method: HttpMethod.Post,
    },
    GetState: {
      Endpoint: "/user/get-states",
      Method: HttpMethod.Get,
    },
    GetCity: {
      Endpoint: "/user/get-cities",
      Method: HttpMethod.Get,
    },
    GetCaste: {
      Endpoint: "/user/get-castes",
      Method: HttpMethod.Get,
    },
    GetSubCaste: {
      Endpoint: "/user/get-subcastes",
      Method: HttpMethod.Get,
    },
    GetGotras: {
      Endpoint: "/user/get-gotras",
      Method: HttpMethod.Get,
    },
    CreateGotra: {
      Endpoint: "/user/create-gotra",
      Method: HttpMethod.Post,
    },
    GetEducation: {
      Endpoint: "/user/get-educations",
      Method: HttpMethod.Get,
    },
    GetOccupations: {
      Endpoint: "/user/get-occupations",
      Method: HttpMethod.Get,
    },
    GetSurveyors: {
      Endpoint: "/staff/surveyors",
      Method: HttpMethod.Get,
    }
  },

  Contact: {
    RaiseRequest: {
      Endpoint: "/user/raise-ticket",
      Method: HttpMethod.Post,
    }
  }
};

export default ApiRoutes;
