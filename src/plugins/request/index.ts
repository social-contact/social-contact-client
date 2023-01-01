import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";

interface IAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): IAxiosPromise;
  (url: string, config?: AxiosRequestConfig): IAxiosPromise;
}

export type IAxiosPromise<T = any> = Promise<T>;

const instance: IAxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    }
    ElMessage({
      showClose: true,
      message: res.message || "Error",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(new Error(res.message || "Error"));
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default instance;
