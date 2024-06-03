// axios.ts
import axios, { AxiosError } from "axios";

console.log(process.env);

const instance = axios.create({
  baseURL: `http://${process.env.IP}:3000`, // Make sure this is correct
  headers: {
    "Content-Type": "application/json",
  },
});

export function setTokenInAxiosHeaders(token: string) {
  instance.defaults.headers.common.Authorization = token;
}

export default instance;
export { AxiosError };
