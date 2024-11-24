import React, { useState } from "react";
import {
    Row,
    Col,
    Drawer,
    Form,
    Button,
    Input,
    Select,
    Upload,
} from "antd";
import { RiCloseFill, RiUpload2Line, RiRefreshLine } from "react-icons/ri";
import UserController from "../../../network/gateway/UserController";

const { Option } = Select;

const UserCreateDrawer = ({ visible, onClose, onUserCreated }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [profileImgData, setProfileImgData] = useState("");
    const userController = new UserController();

    const handleFinish = async (values) => {
        console.log("Form values:", values); // Debugging line to check what values are being submitted
        if (!values.firstName) {
            console.error("First name is missing");
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            await userController.createUser({
                id: `USR_ID${Math.floor(Math.random() * 1000)}`, // Generates a random user ID for simplicity
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                profileImg: profileImgData,
                permissions: {
                    readProducts: false,
                    readUsers: false,
                    updateUsers: false,
                    createUsers: false,
                    writeProducts: false,
                    overrideTranslations: false,
                },
                type: values.type,
            });

            // Call the onUserCreated callback after a successful creation
            if (onUserCreated) {
                onUserCreated();
            }

            onClose(); // Close the drawer after creating the user
        } catch (error) {
            console.error("Failed to create user:", error);
        }
        setLoading(false);
    };

    const generatePassword = () => {
        const randomPassword = Math.random().toString(36).slice(-8); // Generate a random 8-character password
        form.setFieldsValue({ password: randomPassword });
    };

    const handleUploadChange = ({ file }) => {
        if (file.originFileObj) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImgData(reader.result);
            };
            reader.readAsDataURL(file.originFileObj);
        }
    };

    return (
        <Drawer
            title={<h5>Create a New User</h5>}
            width={400}
            onClose={onClose}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            closeIcon={<RiCloseFill size={24} />}
            footer={
                <div style={{ textAlign: "right" }}>
                    <Button onClick={onClose} type="text" style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button form="createUserForm" htmlType="submit" type="primary" loading={loading}>
                        Submit
                    </Button>
                </div>
            }
        >
            <Form id="createUserForm" form={form} layout="vertical" onFinish={handleFinish} hideRequiredMark>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: "Please enter first name" }]}
                >
                    <Input placeholder="Please enter first name" />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: "Please enter last name" }]}
                >
                    <Input placeholder="Please enter last name" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Please enter email" }, { type: "email", message: "Please enter a valid email address" }]}
                >
                    <Input placeholder="Please enter email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: "Please enter password" }]}
                >
                    <Input.Password
                        placeholder="Please enter password"
                        addonAfter={
                            <Button icon={<RiRefreshLine />} onClick={generatePassword} type="link">
                                Generate
                            </Button>
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="profileImg"
                    label="Profile Image"
                >
                    <Upload
                        listType="picture"
                        fileList={[]}
                        maxCount={1}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                    >
                        <Button type="primary" icon={<RiUpload2Line className="remix-icon" />}>
                            Upload
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="type"
                    label="User Type"
                    rules={[{ required: true, message: "Please select a user type" }]}
                >
                    <Select placeholder="Please select user type">
                        <Option value="admin">Admin</Option>
                        <Option value="staff">Staff</Option>
                        <Option value="manager">Manager</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default UserCreateDrawer;
