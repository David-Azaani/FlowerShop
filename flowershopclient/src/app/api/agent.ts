import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

// Array Function
const resposeBody = (response: AxiosResponse) => response.data;

//#region Normal Func

// function responseBodyFn(response: AxiosResponse) {

//     return response.data;
// }
//#endregion

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log("caught by interceptor");
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(resposeBody),
  post: (url: string, body: {}) => axios.post(url, body).then(resposeBody),
  put: (url: string, body: {}) => axios.put(url, body).then(resposeBody),
  delete: (url: string) => axios.delete(url).then(resposeBody),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/un-authorized"),
  getValidationError: () => requests.get("buggy/validation-error"),
  get500Error: () => requests.get("buggy/server-error"),
  get404Error: () => requests.get("buggy/not-found"),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
