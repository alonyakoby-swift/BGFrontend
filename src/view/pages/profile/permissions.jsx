import React, { useState } from "react";
import { Row, Col, Divider, Switch } from "antd";

export default function Permissions({ userDetails, onPermissionsChange }) {
    const colTextClass = "hp-caption hp-text-color-black-80 hp-text-color-dark-30";
    const switchClass = "hp-mt-sm-8 hp-ml-sm-0 hp-ml-8";
    const dividerClass = "hp-border-color-black-40 hp-border-color-dark-80";

    // Local state to manage permissions
    const [permissions, setPermissions] = useState(userDetails?.permissions || {});

    // Function to handle permission changes
    const handlePermissionChange = (permissionKey) => {
        const updatedPermissions = {
            ...permissions,
            [permissionKey]: !permissions[permissionKey], // Toggle the permission state
        };
        setPermissions(updatedPermissions);
        onPermissionsChange(updatedPermissions); // Notify parent about the change
    };

    return (
        <Row>
            <Col span={24}>
                <h2>User Permissions for {userDetails?.first_name}</h2>
                <p className="hp-p1-body hp-mb-0">
                    Here you can manage the user permission preferences.
                </p>
            </Col>

            <Divider className={dividerClass} />

            <Col span={24}>
                <div className="hp-profile-notifications hp-mt-24">
                    {Object.keys(permissions)
                        .sort()  // Sort keys alphabetically A-Z
                        .map((permissionKey) => (
                            <Row key={permissionKey} align="middle" justify="space-between" className="hp-mb-18">
                                <Col sm={15} span={24} className={colTextClass}>
                                    {permissionKey.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                </Col>
                                <Switch
                                    className={switchClass}
                                    checked={permissions[permissionKey]}
                                    onChange={() => handlePermissionChange(permissionKey)}
                                />
                            </Row>
                        ))}
                </div>
            </Col>
        </Row>
    );
}
