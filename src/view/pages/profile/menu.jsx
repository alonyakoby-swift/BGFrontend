// MenuProfile.js
import React from "react";
import { Col, Avatar, Badge, Menu } from "antd";
import {
  User,
  Lock,
  Activity,
  Setting,
  Password,
  Heart,
} from "react-iconly";

import menuImg from "../../../assets/images/pages/profile/menu-img.svg";

export default function MenuProfile(props) {
  const { userDetails, setCurrentSection, currentSection } = props;
  const menuIconClass = "remix-icon hp-mr-8";

  const avatar = userDetails && userDetails.profile_img ? (
      <Avatar size={80} src={userDetails.profile_img} />
  ) : (
      <Avatar size={80} className="hp-bg-info-4 hp-mr-8">
        {userDetails?.first_name?.charAt(0)}
      </Avatar>
  );

  const getInitials = (name) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    let initials = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };

  function menuFooterItem() {
    if (props.footer !== "none") {
      return (
          <div className="hp-profile-menu-footer">
            <img src={menuImg} alt="Profile Image" />
          </div>
      );
    }
  }

  function moreBtn() {
    if (props.moreBtnCheck !== "none") {
      return (
          <Col className="hp-menu-header-btn hp-pr-16 hp-mb-12 hp-text-right">
            {props.moreBtn()}
          </Col>
      );
    }
  }

  return (
      <Col flex="240px" className="hp-profile-menu hp-py-24">
        <div className="hp-w-100">
          <div className="hp-profile-menu-header hp-mt-md-16 hp-text-center">
            {moreBtn()}
            <Badge count={0}>
              {avatar}
            </Badge>
            <h3 className="hp-mt-24 hp-mb-4">{userDetails?.first_name} {userDetails?.last_name}</h3>
            <a className="hp-p1-body">
              {userDetails?.position || "No Position Provided"}
            </a>
          </div>

          <Menu
              mode="inline"
              selectedKeys={[currentSection]} // Use the current section from props to highlight the active section
              className="hp-w-100 hp-profile-menu-body"
              theme="light"
          >
            <Menu.Item
                key="personel-information"
                icon={<User set="curved" className={menuIconClass} />}
                onClick={() => setCurrentSection("personel-information")}
            >
              Personal Information
            </Menu.Item>

            <Menu.Item
                key="permissions"
                icon={<Lock set="curved" className={menuIconClass} />}
                onClick={() => setCurrentSection("permissions")}
            >
              Permissions
            </Menu.Item>

            {/*<Menu.Item*/}
            {/*    key="password-change"*/}
            {/*    icon={<Password set="curved" className={menuIconClass} />}*/}
            {/*    onClick={() => setCurrentSection("password-change")}*/}
            {/*>*/}
            {/*  Password Change*/}
            {/*</Menu.Item>*/}
          </Menu>
        </div>
      </Col>
  );
}

