import axios from "axios";
// import { url_api } from "config";

const url_api = "http://localhost";
export const sendInsuranceData = (data) => {
  return axios.post(`${url_api}/api`, data);
};
