import axios from "axios";

export const sendInsuranceData = (data) => {
  return axios.post("http://localhost:8000/api/insurance", data);
};
