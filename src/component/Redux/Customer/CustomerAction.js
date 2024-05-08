import axios from "axios";
import API_URL from "../../Config";
// defined to redux
export const request_CustomerInfo = "request_CustomerInfo";
export const set_CustomerInfo = "set_CustomerInfo";
export const error_CustomerInfo = "error_CustomerInfo";

export const RequestCustomerInfo = (data) => {
  const setter = {
    type: request_CustomerInfo,
    payload: data,
  };
  return setter;
};
export const SetCustomerInfo = (data) => {
  const setter = {
    type: set_CustomerInfo,
    payload: data,
  };
  return setter;
};
export const ErrorCustomerInfo = (data) => {
  const setter = {
    type: error_CustomerInfo,
    payload: data,
  };
  return setter;
};

// Fetching API calls
var errorFlagGetSapCustomerInfo = 0;
export const GetSapCustomerInfo = (props) => async (dispatch) => {
  dispatch(RequestCustomerInfo(true));
  const baseURL = `${API_URL}/ApisLoginController/Login`;
  const response = await axios.post(`${baseURL}`, {
    username: "VIPCustomersPortalAppIntegrationUser",
    password: "VIPCustomersPortalApp@jepco@123",
  });
  const userToken = response.data.body.token;
  if (userToken) {
    const data = props;
    const config = {
      method: "post",
      url: `${API_URL}/MainDashbord/GetSapCustomerInfo`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };
    errorFlagGetSapCustomerInfo++;
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(SetCustomerInfo(fileData));
      dispatch(RequestCustomerInfo(false));
      dispatch(ErrorCustomerInfo(0));
    } catch (error) {
      dispatch(RequestCustomerInfo(false));
      dispatch(SetCustomerInfo([]));
      dispatch(ErrorCustomerInfo(errorFlagGetSapCustomerInfo));
    }
  } else {
  }
};
