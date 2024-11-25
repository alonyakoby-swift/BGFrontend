import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../network/authContext";

import { Divider, Avatar, Row, Col, Button } from "antd";
import { RiSettings3Line } from "react-icons/ri";

// Removed unnecessary imports
// import IntlMessages from "../../lang/IntlMessages";
// import avatar from "../../../../assets/images/memoji/user-avatar-8.png";

export default function MenuFooter(props) {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    // Redirect to the login page after logout
    history.push("/login");
    if (props.onClose) props.onClose();
  };

  // Function to get initials from the user's name
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    let initials = names[0].charAt(0).toUpperCase(); // First letter of the first name
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase(); // First letter of the last name
    }
    return initials;
  };

  const userAvatar =
      user && user.image ? (
          <Avatar size={48} src={user.image} className="hp-bg-info-4 hp-mr-8" />
      ) : (
          <Avatar
              size={48}
              className="hp-text-color-danger-1 hp-bg-color-danger-4 hp-mr-8"
          >
            {getInitials(user ? user.name : "User")}
          </Avatar>
      );

  return props.collapsed === false ? (
      <Row
          className="hp-sidebar-footer hp-bg-color-dark-90"
          align="middle"
          justify="space-between"
      >
        <Divider className="hp-border-color-black-40 hp-border-color-dark-70 hp-mt-0" />

        <Col>
          <Row align="middle">
            {userAvatar}

            <div className="hp-mt-6">
            <span
                className="hp-d-block hp-text-color-black-100 hp-text-color-dark-0 hp-p1-body"
                style={{ lineHeight: 1 }}
            >
              {user ? user.name : "Guest"}
            </span>

              <Button
                  type="link"
                  className="hp-badge-text hp-text-color-dark-30 hp-font-weight-400"
                  onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Row>
        </Col>

        <Col>
          <Link to="/pages/profile/security" onClick={props.onClose}>
            <RiSettings3Line
                className="remix-icon hp-text-color-black-100 hp-text-color-dark-0"
                size={24}
            />
          </Link>
        </Col>
      </Row>
  ) : (
      <Row
          className="hp-sidebar-footer hp-bg-color-dark-90"
          align="middle"
          justify="center"
      >
        <Col>
          <Link
              to="/pages/profile/personel-information"
              onClick={props.onClose}
          >
            {userAvatar}
          </Link>
        </Col>
      </Row>
  );
}
