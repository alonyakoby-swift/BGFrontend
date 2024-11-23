import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tag, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";
import ProductController from "../../../network/gateway/ProductController";
import PageContent from "../../../layout/components/content/page-content";

const { Search } = Input;
const { Option } = Select;

export default function ProductIndex() {
    const [productsData, setProductsData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");

    const productController = new ProductController();

    const fetchProducts = async (page, pageSize) => {
        setLoading(true);
        try {
            const response = await productController.getAllProducts(page, pageSize);
            setProductsData(response.items);
            setPagination({
                current: page,
                pageSize,
                total: response.metadata.total,
            });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
        setLoading(false);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const queryParams = {};
            if (searchQuery) queryParams.query = searchQuery;
            if (brand) queryParams.brand = brand;
            if (category) queryParams.category = category;
            if (subcategory) queryParams.subcategory = subcategory;

            const response = await productController.searchProducts(queryParams);
            setProductsData(response);
            setPagination({
                current: 1,
                pageSize: pagination.pageSize,
                total: response.length,
            });
        } catch (error) {
            console.error("Search failed:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts(pagination.current, pagination.pageSize);
    }, []);

    const handleTableChange = (pagination) => {
        fetchProducts(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: "Article Code",
            dataIndex: "cod_article",
            key: "cod_article",
            render: (text, record) => (
                <Link to={`/products/detail/${record.id}`}>{text}</Link>
            ),
        },
        {
            title: "Description",
            dataIndex: "product_description_en",
            key: "product_description_en",
        },
        {
            title: "Status",
            dataIndex: "product_status",
            key: "product_status",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
            render: (category) => (
                <Tag color="blue" key={category}>
                    {category}
                </Tag>
            ),
        },
        {
            title: "Subcategory",
            key: "sub_category_en",
            dataIndex: "sub_category_en",
            render: (subCategory) => (
                <Tag color="green" key={subCategory}>
                    {subCategory}
                </Tag>
            ),
        },
    ];

    const brandsList = [
        "None",
        "MASTERPRO",
        "HEARTS & HOMIES",
        "MASTERPRO BY ALESSI",
        "GERIMPORT",
        "SAN IGNACIO",
        "BERGNER",
        "THE CRAZY HOME",
        "BENETTON",
        "BERHOME DECO",
        "[CUSTOMER OWN BRAND]",
        "RACING",
        "KASSATEX",
        "3 CLAVELES",
        "INFINITY CHEFS",
        "RENBERG",
        "PIERRE CARDIN",
        "SWISS HOME",
        "MASK (NO BRAND)",
        "SCALPERS HOME",
        "BRUNCHFIELD",
        "LEKUE",
        "LA MAISON",
        "HERMANN MILLER",
        "CROTON",
        "CASA SAMANTHA",
        "19V69",
        "PYREX",
        "PIXEL",
        "(NO BRAND)",
        "CHEF SAUCE",
        "POLO CLUB",
        "DESTINATION HOLIDAY",
        "EL GANSO",
        "ICON",
        "RONCATO",
        "ZARA",
        "0",
        "UNIKA",
        "OXFORD",
        "OMADA",
        "OTHERS",
        "FILOMATIC",
        "GUZZINI",
        "PROTENROP",
        "SERAFINO ZANI",
        "3CLAVELES",
        "THERMOMIX",
        "HEB EXPERT",
        "KAISERHOFF",
        "FABITA",
        "HEB EXPERTS",
        "RCR",
        "SPICE AND SOUL",
        "KERRVILLE",
        "KAISER HOFF",
        "CALLATE LA BOCA",
        "KUKUXUMUSU",
        "CASA ROYAL",
        "BIMBY",
        "MILLERHAUS",
        "VALIGERIA RONCATO",
        "TOP CHEF",
        "JUST FOR CHEFS",
        "STAR CHEF",
        "LIVINGTON",
        "CIAK RONCATO",
        "GUY LAROCHE",
        "WELLBERG",
        "LUXOPAL",
        "EMOTICONWORLD"
    ];

    return (
        <Row gutter={[32, 32]}>
            <Col span={24}>
                <PageContent
                    title="Products Page"
                    breadcrumb={[
                        {
                            title: "Pages",
                        },
                        {
                            title: "Products Page",
                        },
                    ]}
                />
            </Col>
            <Col span={24}>
                <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                    <Col span={16}>
                        <Row gutter={[16, 16]}>
                            <Col>
                                <Search
                                    placeholder="Search by ID, Article Code, or Description"
                                    enterButton="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onSearch={handleSearch}
                                />
                            </Col>
                            <Col>
                                <Select
                                    placeholder="Select Brand"
                                    style={{ width: 200 }}
                                    value={brand}
                                    onChange={(value) => setBrand(value === "None" ? "" : value)}
                                    allowClear
                                >
                                    {brandsList.map((brand) => (
                                        <Option key={brand} value={brand}>
                                            {brand}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col>
                                <Select
                                    placeholder="Select Category"
                                    style={{ width: 150 }}
                                    value={category}
                                    onChange={(value) => setCategory(value)}
                                    allowClear
                                >
                                    <Option value="CategoryX">CategoryX</Option>
                                    <Option value="CategoryY">CategoryY</Option>
                                    {/* Add more categories as needed */}
                                </Select>
                            </Col>
                            <Col>
                                <Select
                                    placeholder="Select Subcategory"
                                    style={{ width: 150 }}
                                    value={subcategory}
                                    onChange={(value) => setSubcategory(value)}
                                    allowClear
                                >
                                    <Option value="SubCategoryY">SubCategoryY</Option>
                                    <Option value="SubCategoryZ">SubCategoryZ</Option>
                                    {/* Add more subcategories as needed */}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Button onClick={() => {
                            setSearchQuery("");
                            setBrand("");
                            setCategory("");
                            setSubcategory("");
                            fetchProducts(pagination.current, pagination.pageSize);
                        }}>
                            Reset
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    dataSource={productsData}
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
        </Row>
    );
}
