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

export const basicAuth = () => async () => {
  const encodedCredentials = btoa("SAPApi:SAPApi@jepco@123");
  const response = axios.post(
    `${API_URL}/api/ApisLoginController/IntegrationUserAuth`,
    {
      source: "subscription-inquery-callcenter-project",
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    }
  );

  try {
    const auth = await axios(response);
    console.log(auth);
  } catch (error) {
    console.log(error);
  }
};
export const GetSapCustomerInfo = (props) => async (dispatch) => {
  dispatch(RequestCustomerInfo(true));
  try {
    const config = {
      method: "post",
      url: `${API_URL}/api/Inquiry/GetSapCustomerInfo`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: props,
    };
    errorFlagGetSapCustomerInfo++;
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.Body;
      dispatch(SetCustomerInfo(fileData));
      dispatch(RequestCustomerInfo(false));
      dispatch(ErrorCustomerInfo(0));
    } catch (error) {
      dispatch(RequestCustomerInfo(false));
      dispatch(SetCustomerInfo([]));
      dispatch(ErrorCustomerInfo(errorFlagGetSapCustomerInfo));
    }
  } catch (error) {}
};
