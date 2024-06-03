// axios.ts
import axios, { AxiosError } from "axios";

console.log("ip address: " + `${process.env.IP_ADRESS}`);

const instance = axios.create({
  baseURL: `http://${process.env.IP_ADRESS}:3000`, // Make sure this is correct
  headers: {
    "Content-Type": "application/json",
  },
});

export function setTokenInAxiosHeaders(token: string) {
  instance.defaults.headers.common.Authorization = token;
}

export default instance;
export { AxiosError };
