import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { setErrMsg, userLogin } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const ErrorMessage = styled.div`
  color: red;
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.name);
  const errorMessage = useSelector((store) => store.user.errMsg);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin({ username, password }));
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(setErrMsg(null));
    };
  }, [setErrMsg]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username: <input value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <input type="submit" value="登入" />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
