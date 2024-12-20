import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Drawer, Button, Dropdown, Menu, Spin, notification } from "antd";
import { RiMore2Line, RiMenuFill, RiCloseFill } from "react-icons/ri";

import Breadcrumbs from "../../../layout/components/content/breadcrumbs";
import InfoProfile from "./personel-information";
import MenuProfile from "./menu";
import ActivityProfile from "./activity";
import SecurityProfile from "./security";
import PasswordProfile from "./password-change";
import SocialProfile from "./connect-with-social";

import UserController from "../../../network/gateway/UserController";
import Permissions from "./permissions";

export default function Profile() {
    const { id } = useParams(); // Get userId from URL params
    const [visible, setVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState("personel-information");
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state to manage user fetching
    const [error, setError] = useState(null); // Error state to handle fetching issues

    const userController = new UserController(); // Instantiate UserController

    // State to track permission changes or other updated user details
    const [updatedUserDetails, setUpdatedUserDetails] = useState(null);

    // Fetch user details on load
    useEffect(() => {
        async function fetchUserDetails() {
            try {
                setLoading(true); // Start loading
                const fetchedUser = await userController.getUserById(id);
                setUserDetails(fetchedUser);
                setUpdatedUserDetails(fetchedUser); // Initialize updated details
            } catch (error) {
                console.error("Failed to fetch user details", error);
                setError("Failed to load user details. Please try again later.");
            } finally {
                setLoading(false); // Stop loading
            }
        }

        if (id) {
            fetchUserDetails();
        }
    }, [id]);

    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);

    const rateMenu = (
        <Menu>
            <Menu.Item key="0">Change Avatar</Menu.Item>
        </Menu>
    );

    function moreBtn() {
        return (
            <Dropdown overlay={rateMenu} placement="bottomLeft">
                <Button
                    type="text"
                    icon={<RiMore2Line className="hp-text-color-black-100 hp-text-color-dark-0" size={24} />}
                />
            </Dropdown>
        );
    }

    // Callback for when permissions are updated
    const handlePermissionsChange = (updatedPermissions) => {
        setUpdatedUserDetails((prevDetails) => ({
            ...prevDetails,
            permissions: updatedPermissions,
        }));
    };

    // Function to update user details
    const handleUpdateUser = async () => {
        try {
            await userController.updateUser(id, updatedUserDetails);
            notification.success({
                message: "User Updated",
                description: "User details have been successfully updated.",
            });
        } catch (error) {
            console.error("Failed to update user details", error);
            notification.error({
                message: "Update Failed",
                description: "Failed to update user details. Please try again later.",
            });
        }
    };

    // Function to render the current section
    const renderSection = () => {
        switch (currentSection) {
            case "personel-information":
                return <InfoProfile userDetails={userDetails} />;
            case "permissions":
                return (
                    <Permissions
                        userDetails={userDetails}
                        onPermissionsChange={handlePermissionsChange}
                    />
                );
            case "activity":
                return <ActivityProfile userDetails={userDetails} />;
            case "security":
                return <SecurityProfile userDetails={userDetails} />;
            case "password-change":
                return <PasswordProfile userDetails={userDetails} />;
            case "connect-with-social":
                return <SocialProfile userDetails={userDetails} />;
            default:
                return <InfoProfile userDetails={userDetails} />;
        }
    };

    if (loading) {
        return (
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
                <Spin size="large" tip="Loading user details..." />
            </Row>
        );
    }

    if (error) {
        return (
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
                <Col>
                    <h2>Error</h2>
                    <p>{error}</p>
                </Col>
            </Row>
        );
    }

    return (
        <Row gutter={[32, 32]} className="hp-mb-32">
            <Drawer
                title={moreBtn()}
                className="hp-profile-mobile-menu"
                placement="left"
                closable={true}
                onClose={onClose}
                visible={visible}
                closeIcon={
                    <RiCloseFill
                        className="remix-icon hp-text-color-black-80"
                        size={24}
                    />
                }
            >
                <MenuProfile
                    setCurrentSection={setCurrentSection}
                    onCloseDrawer={onClose}
                    moreBtnCheck="none"
                    footer="none"
                    currentSection={currentSection}
                    userDetails={userDetails}
                />
            </Drawer>

            <Col span={24}>
                <Row gutter={[32, 32]} justify="space-between">
                    <Breadcrumbs breadCrumbParent="Pages" breadCrumbActive="Profile" />
                    <Button type="primary" onClick={handleUpdateUser}>
                        Update User
                    </Button>
                </Row>
            </Col>

            <Col span={24}>
                <Row className="hp-profile-mobile-menu-btn hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-py-12 hp-px-sm-8 hp-px-24 hp-mb-16">
                    <Button
                        className="hp-p-0"
                        type="text"
                        icon={
                            <RiMenuFill
                                size={24}
                                className="remix-icon hp-text-color-black-80 hp-text-color-dark-30"
                            />
                        }
                        onClick={showDrawer}
                    />
                </Row>

                <Row className="hp-bg-color-black-0 hp-bg-color-dark-100 hp-border-radius hp-pr-sm-16 hp-pr-32">
                    <MenuProfile
                        setCurrentSection={setCurrentSection}
                        moreBtn={moreBtn}
                        currentSection={currentSection}
                        userDetails={userDetails}
                    />

                    <Col
                        flex="1 1"
                        className="hp-pl-sm-16 hp-pl-32 hp-py-sm-24 hp-py-32 hp-pb-24 hp-overflow-hidden"
                    >
                        {renderSection()}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
