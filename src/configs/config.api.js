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
  },
};

export default ApiRoutes;
