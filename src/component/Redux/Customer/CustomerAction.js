import axios from "axios";
import API_URL, { API_SAP } from "../../Config";

// defined to redux
export const request_CustomerInfo = "request_CustomerInfo";
export const set_CustomerInfo = "set_CustomerInfo";
export const error_CustomerInfo = "error_CustomerInfo";
export const error_CustomerInfo_Message = "error_CustomerInfo_Message";
export const CLEAR_CUSTOMER_INFO = "CLEAR_CUSTOMER_INFO";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REQUEST_SEND_MESSAGE = "REQUEST_SEND_MESSAGE";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";

export const REQUEST_PRINTING_ACCOUNT_STATEMENT =
  "REQUEST_PRINTING_ACCOUNT_STATEMENT";
export const GET_PRINTING_ACCOUNT_STATEMENT = "GET_PRINTING_ACCOUNT_STATEMENT";
export const ERROR_PRINTING_ACCOUNT_STATEMENT =
  "ERROR_PRINTING_ACCOUNT_STATEMENT";

export const GET_USER_COOKIE = "GET_USER_COOKIE";
// export const CLEAR_PERSISTED_STATE = "CLEAR_PERSISTED_STATE";
// export const clearPersistedState = () => ({ type: CLEAR_PERSISTED_STATE });

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
export const ErrorCustomerInfoMessage = (data) => {
  const setter = {
    type: error_CustomerInfo_Message,
    payload: data,
  };
  return setter;
};
export const ClearCustomerInfo = () => {
  const setter = {
    type: CLEAR_CUSTOMER_INFO,
  };
  return setter;
};

export const RequestSendMessage = (data) => {
  const setter = {
    type: REQUEST_SEND_MESSAGE,
    payload: data,
  };
  return setter;
};
export const SendMessageSuccess = (data) => {
  const setter = {
    type: SEND_MESSAGE_SUCCESS,
    payload: data,
  };
  return setter;
};
export const SendMessageFailure = (data) => {
  const setter = {
    type: SEND_MESSAGE_FAILURE,
    payload: data,
  };
  return setter;
};
export const getUserCookie = (data) => {
  return (dispatch) => {
    dispatch({
      type: "GET_USER_COOKIE",
      payload: data,
    });
  };
};
export const RequestPrintingAccountStatement = (data) => {
  const setter = {
    type: REQUEST_PRINTING_ACCOUNT_STATEMENT,
    payload: data,
  };
  return setter;
};
export const GetPrintingAccountStatement = (data) => {
  const setter = {
    type: GET_PRINTING_ACCOUNT_STATEMENT,
    payload: data,
  };
  return setter;
};
export const ErrorPrintingAccountStatement = (data) => {
  const setter = {
    type: ERROR_PRINTING_ACCOUNT_STATEMENT,
    payload: data,
  };
  return setter;
};
// Fetching API calls
var errorFlagGetSapCustomerInfo = 0;
var errorFlagSendMessage = 0;
var token = "";
export const IntegrationAuth = (username, password) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });

  try {
    // 👇 body as JSON
    const body = {
      client_id: "InternalServices-WebUser",
      client_secret: "rJ2tPFzhqI7AUsazSueLCuAiyv8Km2D9",
      grant_type: "client_credentials", //
      username: "",
      password: "",
    };

    const response = await axios.post(`${API_URL}/v1/Auth/token`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    dispatch(getUserCookie(true));
    dispatch({ type: "AUTH_SUCCESS", payload: response.data });

    const data =
      typeof response.data === "string"
        ? JSON.parse(response.data)
        : response.data;

    const accessToken = data.access_token;
    token = accessToken;
  } catch (error) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    dispatch(getUserCookie(false));
    dispatch({ type: "AUTH_FAILURE", payload: error.message });
  }
};
export const GetSapCustomerInfo = (props) => async (dispatch) => {
  dispatch(RequestCustomerInfo(true));

  try {
    dispatch(getUserCookie(true));

    const queryString = new URLSearchParams(props).toString();

    const config = {
      method: "get",
      url: `${API_URL}/v1/Inquiry?${queryString}`, // 👈 props صارت URL params
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    errorFlagGetSapCustomerInfo++;
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.data;
      // console.log(fileDataAPIResponce.data.data);

      dispatch(SetCustomerInfo(fileData));
      dispatch(RequestCustomerInfo(false));
      dispatch(ErrorCustomerInfo(0));
      dispatch(getUserCookie(true));
    } catch (error) {
      // console.log(error);
      dispatch(RequestCustomerInfo(false));
      dispatch(ErrorCustomerInfoMessage(error.response?.data?.title));
      dispatch(SetCustomerInfo([]));
      dispatch(ErrorCustomerInfo(errorFlagGetSapCustomerInfo));
      if (error?.response?.status == 401) {
        dispatch(getUserCookie(false));
        dispatch(ErrorCustomerInfoMessage("انتهت الجلسة"));
      }
    }
  } catch (error) {
    error = error.response?.data?.Errors;

    // dispatch(ErrorCustomerInfoMessage(error));
  }
};

export const PrintingAccountStatement = (props) => async (dispatch) => {
  dispatch(RequestPrintingAccountStatement(true));
  try {
    const { installation, ...queryParams } = props;
    const queryString = new URLSearchParams(queryParams).toString();

    const config = {
      method: "get",
      url: `${API_URL}/v1/Inquiry/PrintBy/${installation}?${queryString}`,
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios(config);
    const fileData = res.data;

    dispatch(GetPrintingAccountStatement(fileData));
    dispatch(ErrorPrintingAccountStatement(null));
    dispatch(getUserCookie(true));
    
    dispatch(RequestPrintingAccountStatement(false));
    return fileData; // 👈 خليها ترجع
  } catch (error) {
    dispatch(RequestPrintingAccountStatement(false));
    dispatch(
      ErrorPrintingAccountStatement(
        error.response?.data?.title
      )
    );
    dispatch(GetPrintingAccountStatement(""));
    return null; // 👈 عشان تقدر تميّز إذا في خطأ
  }
};

//////////////////////////////////////////////////////////////////////////
var edocsToken;
export const Login = () => {
  return async (dispatch) => {
    const credentials = {
      username: "Electronic_Document_Type",
      password: "Electronic_Document_Type@jepco@123",
    };

    const config = {
      method: "post",
      url: `${API_SAP}/JepcoEDocuments/ApisLoginController/Login`,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDEyNjE0ODMsImlzcyI6IkplcGNvLmNvbSIsImF1ZCI6IkplcGNvLmNvbSJ9.r8XCieHSX--MrCDtBqigFuEzzmO90CWQYGd47utiAVg",
      },
      data: credentials,
    };

    try {
      const response = await axios(config);
      // console.log(response.data.Body.token);
      edocsToken = response.data.Body.token;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.Body.token,
      });
      dispatch(getUserCookie(true));
    } catch (error) {
      console.error("Login failed:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.message,
      });
      if (error?.response?.status == 401) {
        dispatch(getUserCookie(false));
      }
    }
  };
};

export const GetCustomerInfoMobile = (props) => async (dispatch) => {
  dispatch(RequestSendMessage(true));
  try {
    const config = {
      method: "post",
      url: `${API_SAP}/JepcoEDocuments/AccessDocumentType/GetCustomerData`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${edocsToken}`,
      },
      // withCredentials: true,
      data: props,
    };
    errorFlagSendMessage++;
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.Body;
      dispatch(SendMessageSuccess(fileData));
      dispatch(RequestSendMessage(false));
      dispatch(SendMessageFailure(0));
      dispatch(getUserCookie(true));
    } catch (error) {
      if (error?.response?.status == 401) {
        dispatch(getUserCookie(false));
        dispatch(ErrorCustomerInfoMessage("انتهت الجلسة"));
      }

      dispatch(RequestSendMessage(false));
      dispatch(SendMessageSuccess([]));
      dispatch(SendMessageFailure(errorFlagSendMessage));
    }
  } catch (error) {}
};
