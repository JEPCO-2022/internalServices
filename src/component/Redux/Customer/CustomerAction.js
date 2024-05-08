import axios from "axios";
import API_URL from "../../Config";
// defined to redux
export const request_InquiryToAddUser = "requestInquiryToAddUser";
export const set_InquiryToAddUser = "setInquiryToAddUser";
export const error_InquiryToAddUser = "errorInquiryToAddUser";

export const request_SaveUser = "requestSaveUser";
export const set_SaveUser = "setSaveUser";
export const error_SaveUser = "errorSaveUser";

export const request_EditUser = "requestEditUser";
export const set_EditUser = "setEditUser";
export const error_EditUser = "errorEditUser";

export const request_ActiveUser = "requestActiveUser";
export const set_ActiveUser = "setActiveUser";
export const error_ActiveUser = "errorActiveUser";

export const request_DeleteUser = "requestDeleteUser";
export const set_DeleteUser = "setDeleteUser";
export const error_DeleteUser = "errorDeleteUser";

export const request_ViewUserInformation = "requestViewUserInformation";
export const set_ViewUserInformation = "setViewUserInformation";
export const error_ViewUserInformation = "errorViewUserInformation";

export const request_ViewClaimAccount = "requestViewClaimAccount";
export const set_ViewClaimAccount = "setViewClaimAccount";
export const error_ViewClaimAccount = "errorViewClaimAccount";

export const request_GetAllUsers = "requestGetAllUsers";
export const set_GetAllUsers = "setGetAllUsers";
export const error_GetAllUsers = "errorGetAllUsers";

export const request_ViewClaimAccountPDF = "requestViewClaimAccountPDF";
export const set_ViewClaimAccountPDF = "setViewClaimAccountPDF";
export const error_ViewClaimAccountPDF = "errorViewClaimAccountPDF";

export const request_ViewBills = "requestViewBills";
export const set_ViewBills = "setViewBills";
export const error_ViewBills = "errorViewBills";

export const request_ViewBillsPDF = "requestViewBillsPDF";
export const set_ViewBillsPDF = "setViewBillsPDF";
export const error_ViewBillsPDF = "errorViewBillsPDF";

export const request_ViewCollectiveClaimsAndBillsData =
  "requestViewCollectiveClaimsAndBillsData";
export const set_ViewCollectiveClaimsAndBillsData =
  "setViewCollectiveClaimsAndBillsData";
export const error_ViewCollectiveClaimsAndBillsData =
  "errorViewCollectiveClaimsAndBillsData";

export const request_SearchAtDataRow = "requestSearchAtDataRow";
export const set_SearchAtDataRow = "setSearchAtDataRow";
export const error_SearchAtDataRow = "errorSearchAtDataRow";

export const request_UsersRolesWithoutAdmin = "requestUsersRolesWithoutAdmin";
export const set_UsersRolesWithoutAdmin = "setUsersRolesWithoutAdmin";
export const error_UsersRolesWithoutAdmin = "errorUsersRolesWithoutAdmin";

export const request_ViewGovermentsSubscriptions =
  "requestViewGovermentsSubscriptions";
export const set_ViewGovermentsSubscriptions = "setViewGovermentsSubscriptions";
export const error_ViewGovermentsSubscriptions =
  "errorViewGovermentsSubscriptions";
export const SET_VIEW_GOVERMENTS_SUBSCRIPTIONS_WITHOUT_PAGINATION =
  "SET_VIEW_GOVERMENTS_SUBSCRIPTIONS_WITHOUT_PAGINATION";

export const CLEAR_PERSISTED_STATE = "CLEAR_PERSISTED_STATE";
export const CLEAR_DATA_PDF = "CLEAR_DATA_PDF";
export const CLEAR_DATA_PDF_CLAIM = "CLEAR_DATA_PDF_CLAIM";

export const request_CustomerInfo = "request_CustomerInfo";
export const set_CustomerInfo = "set_CustomerInfo";
export const error_CustomerInfo = "error_CustomerInfo";

export const request_GetUserByID = "request_GetUserByID";
export const set_GetUserByID = "set_GetUserByID";
export const error_GetUserByID = "error_GetUserByID";

export const request_GetOtherServiceForRole = "request_GetOtherServiceForRole";
export const set_GetOtherServiceForRole = "set_GetOtherServiceForRole";
export const error_GetOtherServiceForRole = "error_GetOtherServiceForRole";

export const RequestInquiryToAddUser = () => {
  const setter = {
    type: request_InquiryToAddUser,
  };
  return setter;
};

export const SetInquiryToAddUser = (data) => {
  const setter = { type: set_InquiryToAddUser, payload: data };
  return setter;
};
export const ErrorInquiryToAddUser = (error, statusCode) => {
  const setter = {
    type: error_InquiryToAddUser,
    payload: error,
    statuscode: statusCode,
  };
  return setter;
};

export const RequestSaveUser = (data) => {
  const setter = {
    type: request_SaveUser,
    payload: data,
  };
  return setter;
};
export const SetSaveUser = (data) => {
  const setter = {
    type: set_SaveUser,
    payload: data,
  };
  return setter;
};
export const ErrorSaveUser = () => {
  const setter = {
    type: error_SaveUser,
  };
  return setter;
};

export const RequestEditUser = (data) => {
  const setter = {
    type: request_EditUser,
    payload: data,
  };
  return setter;
};
export const SetEditUser = (data) => {
  const setter = {
    type: set_EditUser,
    payload: data,
  };
  return setter;
};
export const ErrorEditUser = () => {
  const setter = {
    type: error_EditUser,
  };
  return setter;
};

export const RequestActiveUser = () => {
  const setter = {
    type: request_ActiveUser,
  };
  return setter;
};
export const SetActiveUser = (data) => {
  const setter = {
    type: set_ActiveUser,
    payload: data,
  };
  return setter;
};
export const ErrorActiveUser = () => {
  const setter = {
    type: error_ActiveUser,
  };
  return setter;
};

export const RequestDeleteUser = () => {
  const setter = {
    type: request_DeleteUser,
  };
  return setter;
};
export const SetDeleteUser = (data) => {
  const setter = {
    type: set_DeleteUser,
    payload: data,
  };
  return setter;
};
export const ErrorDeleteUser = () => {
  const setter = {
    type: error_DeleteUser,
  };
  return setter;
};

export const RequestViewUserInformation = () => {
  const setter = {
    type: request_ViewUserInformation,
  };
  return setter;
};
export const SetViewUserInformation = (data) => {
  const setter = {
    type: set_ViewUserInformation,
    payload: data,
  };
  return setter;
};
export const ErrorViewUserInformation = (data) => {
  const setter = {
    type: error_ViewUserInformation,
    payload: data,
  };
  return setter;
};

export const RequestViewClaimAccount = () => {
  const setter = {
    type: request_ViewClaimAccount,
  };
  return setter;
};
export const SetViewClaimAccount = (data) => {
  const setter = {
    type: set_ViewClaimAccount,
    payload: data,
  };
  return setter;
};
export const ErrorViewClaimAccount = (data) => {
  const setter = {
    type: error_ViewClaimAccount,
    payload: data,
  };
  return setter;
};

export const RequestGetAllUsers = () => {
  const setter = {
    type: request_GetAllUsers,
  };
  return setter;
};
export const SetGetAllUsers = (data) => {
  const setter = {
    type: set_GetAllUsers,
    payload: data,
  };
  return setter;
};
export const ErrorGetAllUsers = () => {
  const setter = {
    type: error_GetAllUsers,
  };
  return setter;
};

export const RequestViewClaimAccountPDF = (data) => {
  const setter = {
    type: request_ViewClaimAccountPDF,
    payload: data,
  };
  return setter;
};
export const SetViewClaimAccountPDF = (data) => {
  const setter = {
    type: set_ViewClaimAccountPDF,
    payload: data,
  };
  return setter;
};
export const ErrorViewClaimAccountPDF = () => {
  const setter = {
    type: error_ViewClaimAccountPDF,
  };
  return setter;
};

export const RequestViewBills = (data) => {
  const setter = {
    type: request_ViewBills,
    payload: data,
  };
  return setter;
};
export const SetViewBills = (data) => {
  const setter = {
    type: set_ViewBills,
    payload: data,
  };
  return setter;
};
export const ErrorViewBills = () => {
  const setter = {
    type: error_ViewBills,
  };
  return setter;
};

export const RequestViewBillsPDF = (data) => {
  const setter = {
    type: request_ViewBillsPDF,
    payload: data,
  };
  return setter;
};
export const SetViewBillsPDF = (data) => {
  const setter = {
    type: set_ViewBillsPDF,
    payload: data,
  };
  return setter;
};
export const ErrorViewBillsPDF = () => {
  const setter = {
    type: error_ViewBillsPDF,
  };
  return setter;
};

export const RequestViewCollectiveClaimsAndBillsData = () => {
  const setter = {
    type: request_ViewCollectiveClaimsAndBillsData,
  };
  return setter;
};
export const SetViewCollectiveClaimsAndBillsData = (data) => {
  const setter = {
    type: set_ViewCollectiveClaimsAndBillsData,
    payload: data,
  };
  return setter;
};
export const ErrorViewCollectiveClaimsAndBillsData = () => {
  const setter = {
    type: error_ViewCollectiveClaimsAndBillsData,
  };
  return setter;
};

export const RequestSearchAtDataRow = () => {
  const setter = {
    type: request_SearchAtDataRow,
  };
  return setter;
};
export const SetSearchAtDataRow = (data) => {
  const setter = {
    type: set_SearchAtDataRow,
    payload: data,
  };
  return setter;
};
export const ErrorSearchAtDataRow = () => {
  const setter = {
    type: error_SearchAtDataRow,
  };
  return setter;
};

export const RequestUsersRolesWithoutAdmin = () => {
  const setter = {
    type: request_UsersRolesWithoutAdmin,
  };
  return setter;
};
export const SetUsersRolesWithoutAdmin = (data) => {
  const setter = {
    type: set_UsersRolesWithoutAdmin,
    payload: data,
  };
  return setter;
};
export const ErrorUsersRolesWithoutAdmin = () => {
  const setter = {
    type: error_UsersRolesWithoutAdmin,
  };
  return setter;
};

export const RequestViewGovermentsSubscriptions = () => {
  const setter = {
    type: request_ViewGovermentsSubscriptions,
  };
  return setter;
};
export const SetViewGovermentsSubscriptions = (data) => {
  const setter = {
    type: set_ViewGovermentsSubscriptions,
    payload: data,
  };
  return setter;
};
export const SetViewGovermentsSubscriptionsWithoutPagination = (data) => {
  const setter = {
    type: SET_VIEW_GOVERMENTS_SUBSCRIPTIONS_WITHOUT_PAGINATION,
    payload: data,
  };
  return setter;
};
export const ErrorViewGovermentsSubscriptions = () => {
  const setter = {
    type: error_ViewGovermentsSubscriptions,
  };
  return setter;
};

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
export const RequestGetUserByID = (data) => {
  const setter = {
    type: request_GetUserByID,
    payload: data,
  };
  return setter;
};
export const SetGetUserByID = (data) => {
  const setter = {
    type: set_GetUserByID,
    payload: data,
  };
  return setter;
};
export const ErrorGetUserByID = (data) => {
  const setter = {
    type: error_GetUserByID,
    payload: data,
  };
  return setter;
};
export const RequestGetOtherServiceForRole = (data) => {
  const setter = {
    type: request_GetOtherServiceForRole,
    payload: data,
  };
  return setter;
};
export const SetGetOtherServiceForRole = (data) => {
  const setter = {
    type: set_GetOtherServiceForRole,
    payload: data,
  };
  return setter;
};
export const ErrorGetOtherServiceForRole = (data) => {
  const setter = {
    type: error_GetOtherServiceForRole,
    payload: data,
  };
  return setter;
};

// Fetching API calls
export const GetUsersRolesWithoutAdmin = () => async (dispatch) => {
  const baseURL = `${API_URL}/ApisLoginController/Login`;
  const response = await axios.post(`${baseURL}`, {
    username: "VIPCustomersPortalAppIntegrationUser",
    password: "VIPCustomersPortalApp@jepco@123",
  });
  const userToken = response.data.body.token;

  const data = JSON.stringify({
    languageId: "AR",
  });
  if (userToken) {
    const config = {
      method: "post",
      url: `${API_URL}/UserRegistration/GetUsersRolesWithoutAdmin`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(SetUsersRolesWithoutAdmin(fileData));
    } catch (error) {
      dispatch(ErrorUsersRolesWithoutAdmin());
    }
  } else {
  }
};
export const InquiryToAddUserSearch = (BusinessPartner) => async (dispatch) => {
  dispatch(RequestInquiryToAddUser());
  const baseURL = `${API_URL}/ApisLoginController/Login`;
  const response = await axios.post(`${baseURL}`, {
    username: "VIPCustomersPortalAppIntegrationUser",
    password: "VIPCustomersPortalApp@jepco@123",
  });
  const userToken = response.data.body.token;
  // const userToken = await cookie.load('user');
  if (userToken) {
    const data = {
      LanguageId: "AR",
      BusinessPartner: BusinessPartner,
    };
    const config = {
      method: "post",
      url: `${API_URL}/UserRegistration/EnquiryToAddUser`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(SetInquiryToAddUser(fileData));
    } catch (error) {
      dispatch(
        ErrorInquiryToAddUser(error.response.data.errors, error.response.status)
      );
    }
  } else {
  }
};
export const SaveUser =
  (Username, Password, Email, Mobile_NO, rows, roleCode, serviceList) =>
  async (dispatch) => {
    dispatch(RequestSaveUser(true));
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    // const userToken = await cookie.load('user');
    if (userToken) {
      const data = {
        LanguageId: "AR",
        Username: Username,
        Password: Password,
        Email: Email,
        Mobile_NO: Mobile_NO,
        SubGroupsList: rows,
        roleCode: roleCode,
        otherServiceList: serviceList,
      };

      const config = {
        method: "post",
        url: `${API_URL}/UserRegistration/SaveUser`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetSaveUser(fileData));
        dispatch(RequestSaveUser(false));
      } catch (error) {
        dispatch(ErrorSaveUser());
      }
    } else {
    }
  };
export const EditUser =
  (
    BusinessPartner,
    UserID,
    Username,
    Password,
    Email,
    Mobile_NO,
    serviceList
  ) =>
  async (dispatch) => {
    dispatch(RequestEditUser(true));
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "AR",
        BusinessPartner: BusinessPartner,
        UserID: UserID,
        Username: Username,
        Password: Password,
        Email: Email,
        Mobile_NO: Mobile_NO,
        otherServiceList: serviceList,
      };

      const config = {
        method: "post",
        url: `${API_URL}/UserRegistration/EditUser`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetEditUser(fileData));
        dispatch(RequestEditUser(false));
      } catch (error) {
        dispatch(ErrorEditUser());
      }
    } else {
    }
  };
export const ActiveUser =
  (BusinessPartner, UserID, Active) => async (dispatch) => {
    dispatch(RequestActiveUser());
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    // const userToken = await cookie.load('user');
    if (userToken) {
      const data = {
        LanguageId: "AR",
        BusinessPartner: BusinessPartner,
        UserID: UserID,
        Active: Active,
      };

      const config = {
        method: "post",
        url: `${API_URL}/UserRegistration/ActiveUser`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetActiveUser(fileData));
      } catch (error) {
        dispatch(ErrorActiveUser());
      }
    } else {
    }
  };
export const DeleteUser = (BusinessPartner, UserID) => async (dispatch) => {
  dispatch(RequestDeleteUser());
  const baseURL = `${API_URL}/ApisLoginController/Login`;
  const response = await axios.post(`${baseURL}`, {
    username: "VIPCustomersPortalAppIntegrationUser",
    password: "VIPCustomersPortalApp@jepco@123",
  });
  const userToken = response.data.body.token;
  // const userToken = await cookie.load('user');
  if (userToken) {
    const data = {
      LanguageId: "AR",
      BusinessPartner: BusinessPartner,
      UserID: UserID,
    };

    const config = {
      method: "post",
      url: `${API_URL}/UserRegistration/DleteUser`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(SetDeleteUser(fileData));
    } catch (error) {
      dispatch(ErrorDeleteUser());
    }
  } else {
  }
};
export const ViewUserInformation =
  (BusinessPartner, MainGroupID) => async (dispatch) => {
    dispatch(SetViewUserInformation());
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "AR",
        BusinessPartner: BusinessPartner,
        MainGroupID: MainGroupID,
      };

      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewUserInformation`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewUserInformation(fileData));
      } catch (error) {
        localStorage.getItem("errorViewUserInformation", error.message);

        dispatch(ErrorViewUserInformation(error));
      }
    } else {
    }
  };
export const ViewClaimAccount =
  (BusinessPartner, collectiveContractNumber) => async (dispatch) => {
    dispatch(RequestViewClaimAccount());
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "EN",
        BusinessPartner: BusinessPartner,
        CollectiveContractNumber: collectiveContractNumber,
      };
      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewClaimAccount`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewClaimAccount(fileData));
      } catch (error) {
        dispatch(ErrorViewClaimAccount(error));
      }
    } else {
    }
  };
export const GetAllUsers = () => async (dispatch) => {
  dispatch(RequestGetAllUsers());
  const baseURL = `${API_URL}/ApisLoginController/Login`;
  const response = await axios.post(`${baseURL}`, {
    username: "VIPCustomersPortalAppIntegrationUser",
    password: "VIPCustomersPortalApp@jepco@123",
  });
  const userToken = response.data.body.token;
  if (userToken) {
    const data = {
      LanguageId: "AR",
    };

    const config = {
      method: "post",
      url: `${API_URL}/UserRegistration/GetAllUser`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(SetGetAllUsers(fileData));
    } catch (error) {
      dispatch(ErrorGetAllUsers());
    }
  } else {
  }
};
export const ViewClaimAccountPDF =
  (BusinessPartner, MainGroupID, CollectiveContractNumber, PostDate) =>
  async (dispatch) => {
    dispatch(RequestViewClaimAccountPDF(true));
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "EN",
        BusinessPartner: BusinessPartner,
        MainGroupID: MainGroupID,
        CollectiveContractNumber: CollectiveContractNumber,
        PostDate: PostDate,
      };

      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewClaimAccountPDF`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewClaimAccountPDF(fileData));
      } catch (error) {
        dispatch(ErrorViewClaimAccountPDF());
      }
    } else {
    }
  };
export const ViewBillsTable =
  (BusinessPartner, MainGroupID, CollectiveContractNumber, PostDate) =>
  async (dispatch) => {
    dispatch(RequestViewBills(true));
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "EN",
        BusinessPartner: BusinessPartner,
        MainGroupID: MainGroupID,
        CollectiveContractNumber: CollectiveContractNumber,
        PostDate: PostDate,
      };

      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewBills`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };
      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewBills(fileData));
      } catch (error) {
        dispatch(ErrorViewBills());
      }
    } else {
    }
  };
export const ViewBillsPDF =
  (BusinessPartner, MainGroupID, CollectiveContractNumber, PostDate, Serial) =>
  async (dispatch) => {
    dispatch(RequestViewBillsPDF(true));
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "EN",
        BusinessPartner: BusinessPartner,
        MainGroupID: MainGroupID,
        CollectiveContractNumber: CollectiveContractNumber,
        PostDate: PostDate,
        Serial: Serial,
      };

      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewBillsPDF`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };
      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewBillsPDF(fileData));
      } catch (error) {
        dispatch(ErrorViewBillsPDF());
      }
    } else {
    }
  };
export const ViewCollectiveClaimsAndBillsData =
  (BusinessPartner, CollectiveContractNumber, PostDate) => async (dispatch) => {
    dispatch(RequestViewCollectiveClaimsAndBillsData());

    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "EN",
        BusinessPartner: BusinessPartner,
        CollectiveContractNumber: CollectiveContractNumber,
        PostDate: PostDate,
      };

      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewCollectiveClaimsAndBillsData`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };
      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewCollectiveClaimsAndBillsData(fileData));
      } catch (error) {
        dispatch(ErrorViewCollectiveClaimsAndBillsData());
      }
    } else {
    }
  };
export const SearchAtDataRow =
  (BusinessPartner, CollectiveContractNumber, SearchType, SearchWord) =>
  async (dispatch) => {
    dispatch(RequestViewCollectiveClaimsAndBillsData());
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        LanguageId: "EN",
        BusssinessPartner: BusinessPartner,
        CollectiveContractNumber: CollectiveContractNumber,
        SearchType: SearchType,
        SearchWord: SearchWord,
      };
      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/SearchAtDatRow`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };

      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewCollectiveClaimsAndBillsData(fileData));
      } catch (error) {
        dispatch(ErrorViewCollectiveClaimsAndBillsData());
      }
    } else {
    }
  };
export const ViewGovermentsSubscriptions =
  (withPagination, pageNumber, pageSize) => async (dispatch) => {
    dispatch(RequestViewGovermentsSubscriptions());

    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        languageId: "AR",
        withPagination: withPagination,
        pageNumber: pageNumber,
        pageSize: pageSize,
      };

      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewGovermentsSubscriptions`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };
      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewGovermentsSubscriptions(fileData));
      } catch (error) {
        dispatch(ErrorViewGovermentsSubscriptions());
      }
    } else {
    }
  };
export const ViewGovermentsSubscriptionsWithoutPagination =
  (withPagination) => async (dispatch) => {
    const baseURL = `${API_URL}/ApisLoginController/Login`;
    const response = await axios.post(`${baseURL}`, {
      username: "VIPCustomersPortalAppIntegrationUser",
      password: "VIPCustomersPortalApp@jepco@123",
    });
    const userToken = response.data.body.token;
    if (userToken) {
      const data = {
        languageId: "AR",
        withPagination: false, // Set withPagination to false
        // pageNumber: pageNumber,
        // pageSize: pageSize,
      };

      const config = {
        method: "post",
        url: `${API_URL}/MainDashbord/ViewGovermentsSubscriptions`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        data: data,
      };
      try {
        const fileDataAPIResponce = await axios(config);
        const fileData = fileDataAPIResponce.data.body;
        dispatch(SetViewGovermentsSubscriptionsWithoutPagination(fileData));
      } catch (error) {
        console.log("error");
      }
    } else {
      // Handle the case where userToken is falsy (optional)
    }
  };

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
export const getUserByID = (id) => async (dispatch) => {
  dispatch(RequestGetUserByID(true));
  const baseURL = `${API_URL}/ApisLoginController/Login`;
  const response = await axios.post(`${baseURL}`, {
    username: "VIPCustomersPortalAppIntegrationUser",
    password: "VIPCustomersPortalApp@jepco@123",
  });
  const userToken = response.data.body.token;
  if (userToken) {
    const data = {
      languageId: "AR",
      userID: id,
    };
    const config = {
      method: "post",
      url: `${API_URL}/UserRegistration/GetUserByUserID`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(SetGetUserByID(fileData));
      dispatch(RequestGetUserByID(false));
    } catch (error) {
      dispatch(ErrorGetUserByID());
    }
  } else {
  }
};
export const GetOtherServiceForRole = (id) => async (dispatch) => {
  dispatch(RequestGetOtherServiceForRole());
  const baseURL = `${API_URL}/ApisLoginController/Login`;
  const response = await axios.post(`${baseURL}`, {
    username: "VIPCustomersPortalAppIntegrationUser",
    password: "VIPCustomersPortalApp@jepco@123",
  });
  const userToken = response.data.body.token;
  if (userToken) {
    const data = {
      languageId: "AR",
      roleID: id,
    };
    const config = {
      method: "post",
      url: `${API_URL}/UserRegistration/GetOtherServiceForRole`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    try {
      const fileDataAPIResponce = await axios(config);
      const fileData = fileDataAPIResponce.data.body;
      dispatch(SetGetOtherServiceForRole(fileData));
    } catch (error) {
      dispatch(ErrorGetOtherServiceForRole());
    }
  } else {
  }
};

export const clearPersistedState = () => ({ type: CLEAR_PERSISTED_STATE });
export const clearDataPDF = () => ({ type: CLEAR_DATA_PDF });
export const clearDataClaimPDF = () => ({ type: CLEAR_DATA_PDF_CLAIM });
