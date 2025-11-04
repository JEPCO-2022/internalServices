import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import expired from ".././../Images/expired.png";

const SessionTimeout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const { t } = useTranslation();

  const userFlagCookie = useSelector((state) => state.Customer.userFlagCookie);

  useEffect(() => {
    // console.log(userFlagCookie);
    
    if (userFlagCookie===false) {
      setOpen(true);
    }
else{
  setOpen(false);
}
  }, [userFlagCookie]);
  const logout = () => {
    // navigate("/login");
    // localStorage.removeItem("isValidUser");
    // localStorage.removeItem("ID");
    // localStorage.removeItem("tabValue");
    // dispatch(Actions.clearPersistedState());
    window.location.reload();
  };
  return (
    <Dialog open={open}>
      <DialogContent>
        <img
          src={expired}
          alt=""
          width="270px"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </DialogContent>
      <DialogTitle
        fontWeight="bolder"
        variant="h5"
        textAlign="center"
        id="alert-dialog-title"
      >
        انتهت جلستك
      </DialogTitle>
      <DialogActions>
        <Button size="small" onClick={logout}>
          ابدأ جلسة جديدة
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionTimeout;
