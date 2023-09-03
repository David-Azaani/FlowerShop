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

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const agent = {
  Catalog,
};

export default agent;
