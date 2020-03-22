import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { UserContext } from "../context/UserContext";

export default function MenuExampleTabular() {
  const { user, logout } = useContext(UserContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const dynamicHeader = user ? (
    <Menu pointing secondary size="huge" color="orange">
      <Menu.Item
        name={user.username}
        active
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} as={Link} to="/" />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="huge" color="orange">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      </Menu.Menu>
    </Menu>
  );

  return dynamicHeader;
}
