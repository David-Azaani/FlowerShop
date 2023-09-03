import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

// Array Function
const resposeBody = (response: AxiosResponse) => response.data;

//#region Normal Func

// function responseBodyFn(response: AxiosResponse) {

//     return response.data;
// }
//#endregion

const requests = {
  get: (url: string) => axios.get(url).then(resposeBody),
  post: (url: string, body: {}) => axios.post(url, body).then(resposeBody),
  put: (url: string, body: {}) => axios.put(url, body).then(resposeBody),
  delete: (url: string) => axios.delete(url).then(resposeBody),
};

const TestErrors = {
  get400Erro: () => requests.get("Buggy/bad-request"),
  get401Error: () => requests.get("Buggy/un-authorized"),
  getValidationError: () => requests.get("Buggy/validation-error"),
  get500Error: () => requests.get("Buggy/server-error"),
  get404Error: () => requests.get("Buggy/not-found"),
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
