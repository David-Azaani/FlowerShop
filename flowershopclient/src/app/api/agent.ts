import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

// Making intetional Delay to test serverDelay
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";

// Array Function
const resposeBody = (response: AxiosResponse) => response.data;

//#region Normal Func

// function responseBodyFn(response: AxiosResponse) {

//     return response.data;
// }
//#endregion

axios.interceptors.response.use(
  async (response) => {
    await sleep();

    return response;
  },
  (error: AxiosError) => {
    // console.log("caught by interceptor");

    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        // toast.error(data.title);
        break;
      case 404:
        // toast.error(data.title);
        router.navigate("/not-found"); // Or on productDetails use this instead of not-found typography
        break;
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      default:
        break;
    }

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
