import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { getUserInfo } from "../apiRequests/apiRequests";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/userSlice";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
export default function Auth() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userDetails"));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      var loginDetails = await getUserInfo(codeResponse);
      loginDetails.user = JSON.parse(loginDetails.user);
      dispatch(login(loginDetails));
      setLoggedIn(true);
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
          aria-label="add to shopping cart"
          onClick={() => googleLogin()}
        >
          <GoogleIcon />
        </IconButton>
      ) : (
        <Avatar
          {...stringAvatar(user.user.name)}
          onClick={() => handleLogout()}
        />
      )}
    </>
  );
}
