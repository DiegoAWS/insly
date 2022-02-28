import axios from "axios";
import { url_api } from "config";

export const sendInsuranceData = (data) => {
  return axios.post(`${url_api}/api`, data);
};
