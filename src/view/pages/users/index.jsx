import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tag, Input, Button, Avatar } from "antd";
import { Link } from "react-router-dom";
import UserController from "../../../network/gateway/UserController";
import PageContent from "../../../layout/components/content/page-content";
import UserCreateDrawer from "../users/createUserModel";
import { User } from "react-iconly";

const { Search } = Input;

export default function UserIndex() {
    const [usersData, setUsersData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [drawerVisible, setDrawerVisible] = useState(false);

    const userController = new UserController();

    const fetchUsers = async (page, pageSize) => {
        setLoading(true);
        try {
            const response = await userController.getAllUsers(page, pageSize);
            setUsersData(response.items);
            setPagination({
                current: page,
                pageSize,
                total: response.metadata.total,
            });
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
        setLoading(false);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const queryParams = {};
            if (searchQuery) queryParams.query = searchQuery;
            const response = await userController.searchUsers(queryParams);
            setUsersData(response);
            setPagination({
                current: 1,
                pageSize: pagination.pageSize,
                total: response.length, // Assuming a simple array length here.
            });
        } catch (error) {
            console.error("Search failed:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination) => {
        fetchUsers(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "profile_img",
            key: "profile_img",
            render: (profile_img, record) => (
                profile_img ? (
                    <Avatar src={profile_img} />
                ) : (
                    <Avatar className="hp-text-color-danger-1 hp-bg-color-danger-4">
                        {record.first_name.charAt(0).toUpperCase()}
                        {record.last_name.charAt(0).toUpperCase()}
                    </Avatar>
                )
            ),
        },
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
            render: (text, record) => (
                <Link to={`/users/detail/${record.id}`}>{text}</Link>
            ),
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        // Uncomment this if permissions are needed
        // {
        //     title: "Permissions",
        //     key: "permissions",
        //     dataIndex: "permissions",
        //     render: (permissions) => (
        //         <>
        //             {Object.keys(permissions).map((key) => (
        //                 <Tag color={permissions[key] ? "green" : "red"} key={key}>
        //                     {key}: {permissions[key] ? "Yes" : "No"}
        //                 </Tag>
        //             ))}
        //         </>
        //     ),
        // },
    ];

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <PageContent
                    title="Users Page"
                />
            </Col>
            <Col span={24}>
                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                    <Col span={16}>
                        <Search
                            placeholder="Search by User ID, Name, or Email"
                            enterButton="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onSearch={handleSearch}
                        />
                    </Col>
                    <Col>
                        <Button
                            onClick={() => {
                                setSearchQuery("");
                                fetchUsers(pagination.current, pagination.pageSize);
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="primary"
                            style={{ marginLeft: 8 }}
                            onClick={() => setDrawerVisible(true)}
                        >
                            Create New User
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={usersData}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: pagination.total,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50", "100"],
                    }}
                    onChange={handleTableChange}
                />
            </Col>
            <UserCreateDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                onUserCreated={() => fetchUsers(pagination.current, pagination.pageSize)}
            />
        </Row>
    );
}
