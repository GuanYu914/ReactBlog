import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
`;

const Brand = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 32px;
  }
`;

const Nav = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 128px;
  font-weight: bold;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.2);
  `}
`;

export default function Header() {
  const location = useLocation();
  const { user, setUser } = useContext(AuthContext);

  function handleLogout() {
    setAuthToken(null);
    setUser(null);
    // history.push("/");
  }

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>我的第一個部落格</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === "/"}>
            首頁
          </Nav>
          {user && (
            <Nav to="new-post" $active={location.pathname === "/new-post"}>
              發佈文章
            </Nav>
          )}
        </NavbarList>
      </LeftContainer>
      <div>
        {!user && (
          <Nav to="login" $active={location.pathname === "/login"}>
            登入
          </Nav>
        )}
        {user && (
          <Nav to="/" onClick={handleLogout}>
            登出
          </Nav>
        )}
      </div>
    </HeaderContainer>
  );
}
