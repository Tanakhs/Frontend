import React, { useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import { useGoogleLogin } from "@react-oauth/google";
import UserAvatar from "./userAvatar";
import { getUserInfo } from "../../apiRequests/apiRequests";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../redux/userSlice";

export default function Auth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      var loginDetails = await getUserInfo(codeResponse);
      setLoggedIn(true);
      dispatch(login(loginDetails.user));
    },
  });

  const handleLogout = () => {
    dispatch(logout());
    setLoggedIn(false);
  };

  return (
    <>
      {!loggedIn ? (
        <IconButton
          color="primary"
          aria-label="login"
          onClick={() => googleLogin()}
        >
          <GoogleIcon fontSize="large" />
        </IconButton>
      ) : (
        <UserAvatar userName={user.name} onClick={handleLogout}></UserAvatar>
      )}
    </>
  );
}
