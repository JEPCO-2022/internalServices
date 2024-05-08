import {
  error_CustomerInfo,
  request_CustomerInfo,
  set_CustomerInfo,
} from "./CustomerAction";

const initialState = {
  errorGetData: 0,
  loadingCustomerInfo: false,
  customerInfo: [],
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
    default:
      return state;
  }
};

export default CustomerReducer;
