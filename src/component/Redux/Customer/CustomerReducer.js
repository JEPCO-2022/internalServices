import {
  error_CustomerInfo,
  request_CustomerInfo,
  set_CustomerInfo,
  CLEAR_CUSTOMER_INFO,
  REQUEST_SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  error_CustomerInfo_Message,
  GET_PRINTING_ACCOUNT_STATEMENT,
  GET_USER_COOKIE,
  REQUEST_PRINTING_ACCOUNT_STATEMENT,
  ERROR_PRINTING_ACCOUNT_STATEMENT,
} from "./CustomerAction";

const initialState = {
  errorGetData: 0,
  loadingCustomerInfo: false,
  customerInfo: [],
  MessageInfoSuccess: [],
  MessageError: [],
  LoadingMessage: false,
  MessageErrorResponse: "",
  userFlagCookie: true,
  loadingPrintingAccountStatement: false,
  printingAccountStatement: null,
  errorPrintingAccountStatement: null,
};

const CustomerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case error_CustomerInfo:
      return {
        ...state,
        errorGetData: action.payload,
      };
    case request_CustomerInfo:
      return {
        ...state,
        loadingCustomerInfo: action.payload,
      };
    case set_CustomerInfo:
      return {
        ...state,
        customerInfo: action.payload,
      };
    case CLEAR_CUSTOMER_INFO:
      return {
        ...state,
        customerInfo: null,
      };
    case REQUEST_SEND_MESSAGE:
      return {
        ...state,
        LoadingMessage: action.payload,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        MessageInfoSuccess: action.payload,
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        MessageError: action.payload,
      };
    case error_CustomerInfo_Message:
      return {
        ...state,
        MessageErrorResponse: action.payload,
      };
    case GET_PRINTING_ACCOUNT_STATEMENT:
      return {
        ...state,
        printingAccountStatement: action.payload,
        loadingPrintingAccountStatement: false,
        errorPrintingAccountStatement: null,
      };
    case REQUEST_PRINTING_ACCOUNT_STATEMENT:
      return {
        ...state,
        loadingPrintingAccountStatement: action.payload,
        errorPrintingAccountStatement: null,
      };
    case ERROR_PRINTING_ACCOUNT_STATEMENT:
      return {
        ...state,
        errorPrintingAccountStatement: action.payload,
        loadingPrintingAccountStatement: false, 
        printingAccountStatement: null, 
      };

    case GET_USER_COOKIE:
      return {
        ...state,
        userFlagCookie: action.payload,
      };

    default:
      return state;
  }
};

export default CustomerReducer;
