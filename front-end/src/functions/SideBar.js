import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import React from "react";

function SideBar(props) {
  return (
    <Navbar color="faded" light>
      <Nav navbar>
        {props.routes.map((prop, key) => (
          <NavItem key={key}>
            <NavLink tag={Link} to={prop.path}>
              {prop.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Navbar>
  );
}

export default SideBar;
