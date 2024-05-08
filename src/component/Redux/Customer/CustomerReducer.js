import {
  set_InquiryToAddUser,
  error_InquiryToAddUser,
  set_UsersRolesWithoutAdmin,
  set_SaveUser,
  set_EditUser,
  set_ActiveUser,
  set_DeleteUser,
  set_ViewUserInformation,
  set_ViewClaimAccount,
  set_GetAllUsers,
  request_GetAllUsers,
  set_ViewClaimAccountPDF,
  set_ViewBills,
  set_ViewBillsPDF,
  set_ViewCollectiveClaimsAndBillsData,
  set_SearchAtDataRow,
  set_ViewGovermentsSubscriptions,
  SET_VIEW_GOVERMENTS_SUBSCRIPTIONS_WITHOUT_PAGINATION,
  set_CustomerInfo,
  CLEAR_PERSISTED_STATE,
  CLEAR_DATA_PDF,
  CLEAR_DATA_PDF_CLAIM,
  error_ViewUserInformation,
  request_ViewClaimAccountPDF,
  request_ViewBillsPDF,
  request_CustomerInfo,
  error_CustomerInfo,
  set_GetUserByID,
  set_GetOtherServiceForRole,
  request_GetUserByID,
  request_EditUser,
  request_SaveUser,
} from "./CustomerAction";

const initialState = {
  InquiryToAddUser: [],
  UsersRolesWithoutAdmin: [],
  errorInquiryToAddUser: "",
  errorInquiryToStatusCode: null,
  SaveUserResponse: [],
  EditUserResponse: [],
  ActiveUserResponse: [],
  DeleteUser: [],
  ViewUserInformationResponse: {},
  ViewClaimAccountDetails: [],
  AllUsers: [],
  requestGetAllUsers: false,
  ViewClaimAccountPDF: {},
  BillsInfo: [],
  BillsInfoPDF: {},
  ViewCollectiveClaimsAndBillsDataInfo: {},
  SearchResults: [],
  GovermentsSubscriptionsList: [],
  ExportedGovSubscriptionWithoutPagination: [],
  loading: false,
  loadingCustomerInfo: false,
  errorViewUserInformation: "",
  downloadPDF: false,
  loadingUserData: false,
  editDataSuccess: false,
  addUserSuccess: false,
  errorGetData: 0,
  customerInfo: [],
  userData: [],
  OtherServices: [],
};

const CustomerReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case set_InquiryToAddUser:
      return {
        ...state,
        InquiryToAddUser: action.payload,
      };
    case set_GetOtherServiceForRole:
      return {
        ...state,
        OtherServices: action.payload,
      };
    case set_GetUserByID:
      return {
        ...state,
        userData: action.payload,
      };
    case request_GetUserByID:
      return {
        ...state,
        loadingUserData: action.payload,
      };

    case error_InquiryToAddUser:
      return {
        ...state,
        errorInquiryToAddUser: action.payload,
        errorInquiryToStatusCode: action.statuscode,
      };
    case request_GetAllUsers:
      return {
        ...state,
        requestGetAllUsers: true,
      };

    case set_UsersRolesWithoutAdmin:
      return {
        ...state,
        UsersRolesWithoutAdmin: action.payload,
      };

    case set_SaveUser:
      return {
        ...state,
        SaveUserResponse: action.payload,
      };
    case request_SaveUser:
      return {
        ...state,
        addUserSuccess: action.payload,
      };
    case error_CustomerInfo:
      return {
        ...state,
        errorGetData: action.payload,
      };

    case set_EditUser:
      return {
        ...state,
        EditUserResponse: action.payload,
      };
    case request_EditUser:
      return {
        ...state,
        editDataSuccess: action.payload,
      };

    case set_ActiveUser:
      return {
        ...state,
        ActiveUserResponse: action.payload,
      };

    case set_DeleteUser:
      return {
        ...state,
        DeleteUser: action.payload,
      };

    case set_ViewUserInformation:
      return {
        ...state,
        ViewUserInformationResponse: action.payload,
      };
    case error_ViewUserInformation:
      return {
        ...state,
        errorViewUserInformation: action.payload,
      };

    case set_ViewClaimAccount:
      return {
        ...state,
        ViewClaimAccountDetails: action.payload,
      };

    case set_GetAllUsers:
      return {
        ...state,
        AllUsers: action.payload,
      };

    case set_ViewClaimAccountPDF:
      return {
        ...state,
        ViewClaimAccountPDFinfo: action.payload,
        loading: false,
      };
    case request_ViewClaimAccountPDF:
      return {
        ...state,
        loading: action.payload,
      };

    case set_ViewBills:
      return {
        ...state,
        BillsInfo: action.payload,
      };

    case set_ViewBillsPDF:
      return {
        ...state,
        BillsInfoPDF: action.payload,
        loading: false,
      };
    case request_ViewBillsPDF:
      return {
        ...state,
        loading: action.payload,
      };
    case request_CustomerInfo:
      return {
        ...state,
        loadingCustomerInfo: action.payload,
      };

    case set_ViewCollectiveClaimsAndBillsData:
      return {
        ...state,
        ViewCollectiveClaimsAndBillsDataInfo: action.payload,
      };

    case set_SearchAtDataRow:
      return {
        ...state,
        SearchResults: action.payload,
      };

    case set_ViewGovermentsSubscriptions:
      return {
        ...state,
        GovermentsSubscriptionsList: action.payload,
      };
    case SET_VIEW_GOVERMENTS_SUBSCRIPTIONS_WITHOUT_PAGINATION:
      return {
        ...state,
        ExportedGovSubscriptionWithoutPagination: action.payload,
      };

    case set_CustomerInfo:
      return {
        ...state,
        customerInfo: action.payload,
      };

    case CLEAR_PERSISTED_STATE:
      return initialState;
    case CLEAR_DATA_PDF:
      return { BillsInfoPDF: {} };
    case CLEAR_DATA_PDF_CLAIM:
      return { ViewClaimAccountPDF: initialState.ViewClaimAccountPDF };
    default:
      return state;
  }
};

export default CustomerReducer;
