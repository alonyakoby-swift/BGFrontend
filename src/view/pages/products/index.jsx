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

    // Fetch all products
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

    // Fetch filtered products
    const fetchFilteredProducts = async (page, pageSize) => {
        setLoading(true);
        try {
            const queryParams = {
                page,
                pageSize,
            };
            if (searchQuery) queryParams.query = searchQuery;
            if (brand) queryParams.brand = brand;
            if (category) queryParams.category = category;
            if (subcategory) queryParams.subcategory = subcategory;

            const response = await productController.searchProducts(queryParams);

            // Set productsData and pagination based on response
            setProductsData(response);
            setPagination({
                current: page,
                pageSize,
                total: response.length,
            });
        } catch (error) {
            console.error("Search failed:", error);
        }
        setLoading(false);
    };

    // Handle search
    const handleSearch = () => {
        fetchFilteredProducts(1, pagination.pageSize);
    };

    // Handle pagination change
    const handleTableChange = (newPagination) => {
        if (searchQuery || brand || category || subcategory) {
            // Paginate the filtered results
            fetchFilteredProducts(newPagination.current, newPagination.pageSize);
        } else {
            // Fetch all products
            fetchProducts(newPagination.current, newPagination.pageSize);
        }
    };

    // Initial fetch on mount
    useEffect(() => {
        fetchProducts(pagination.current, pagination.pageSize);
    }, []);

    // Table columns configuration
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

    // Status List
    const statusList = [
        "B",
        "D",
        "Z",
        "SP",
        "E",
        "A",
        "C",
        "sp",
        "z"
    ];

    const categories = [
        "1. Pots and Pans",
        "18. Pets",
        "9. Deco",
        "11. Others",
        "8. Electronics",
        "2. Other Cooking Families",
        "4. Kitchen Accessories",
        "7. Textile",
        "5. Coffee & Tea & Breakfast",
        "17. Gaming Goods",
        "6. Tableware",
        "3. Bakeware",
        "9.2 Fragrance and Candles",
        "90. Household",
        "12. Pet Home",
        "13. Pet Toys",
        "91. Others",
        "14. Pet Outdoor",
        "10. Household",
        "92. Beauty&Care",
        "15. Pet Care",
        "8.1 E-mobility",
        "DPTO. ADMINISTRACIÓN"
    ];

    const subcategories = [
        "1.4 Cast Aluminium",
        "18.4 Pet Outdoor",
        "1.2 Pressed Aluminium",
        "9.1 Deco",
        "11.1 Others",
        "8.11 Elec Spare Parts & Accessories",
        "2.2 Knives",
        "4.7 Other Accessories",
        "1.3 Forged Aluminium",
        "8.6 Food Preparation",
        "1.1 Stainless Steel",
        "7.1 Textile",
        "5.1 Vacuum",
        "17.2 Gaming Accessories",
        "6.1 Dinnerware - Ceramic",
        "2.3 Cutting Boards",
        "4.5 Food Containers",
        "6.7 Drinkware - Ceramic",
        "2.1 Tools & Cooking Helpers",
        "6.2 Cutlery",
        "3.5 Tempered glass",
        "6.3 Drinkware - Glass",
        "2.4 Gadgets",
        "8.5 Coffee & Tea Appliances",
        "1.10 Multi-ply",
        "6.6 Dinnerware - Others",
        "9.2.4 Fragrance Candles",
        "1.0 Pressure Cooker",
        "4.8 Food Containers - Glass",
        "3.3 Carbon steel",
        "90.4 Trolley and bags",
        "3.6 Stoneware",
        "12.1 Beds",
        "5.3 Water Bottles - Others",
        "5.10 Water Bottles",
        "90.2 Bathroom",
        "5.8 Tea Pot",
        "4.6 Condiment",
        "5.4 Coffee Maker",
        "1.7 Cast Iron",
        "8.1 Beauty & Health Care",
        "8.8 Kitchen Scales",
        "17.1 Gaming Furniture",
        "1.5 Aluminium",
        "5.2 Plunger",
        "6.4 Table Accessories",
        "1.8 Ennamel ",
        "1.11 Lote Impantacion",
        "11.3 Cookware Handles & Knobs",
        "13.2 Plush",
        "5.6 Coffee & Tea accessories",
        "1.6 Anodized Aluminium",
        "91.1 Others",
        "18.5 Pet Care",
        "4.4 Dispensers",
        "4.2 Bowls and colanders",
        "14.5 Clothes",
        "12.4 Cat Trees & Scratching Posts",
        "13.5 Tennis & Rope",
        "2.5 Graters",
        "8.9 Lote implantacion",
        "91.2 POS",
        "90.1 Bins",
        "10.3 Laundry / ironing",
        "3.4 Silicon",
        "90.3 Laundry / ironing",
        "13.4 Vinyl",
        "1.9 Carbon Steel",
        "90.8 Others",
        "3.1 SS",
        "9.2.1 Diffusers",
        "92.2 Personal Care",
        "14.3 Collar",
        "90.5 Storage",
        "10.5 Storage",
        "9.3.8 Bathroom Accessory Set",
        "3.2 Aluminium",
        "5.5 Kettles",
        "8.91 House appliances",
        "10.8 Others",
        "4.3 Bread Boxes",
        "91.6 Customize Client PLV",
        "13.3 Latex",
        "92.1 Shaving",
        "8.4 Clean & Laundry",
        "13.6 Cat Toys",
        "6.8 Drinkware - Others",
        "15.1 Feeding",
        "8.1.2 E-Scooters",
        "13.1 Rubber & TPR",
        "4.9 Lote implantacion",
        "DPTO. ADMINISTRACIÓN",
        "10.1 Bins",
        "3.8 Ceramic",
        "91.8 Set Implantaciones",
        "12.5 Feeding Accessories",
        "4.1 Kitchen scales",
        "12.2 Pillow & Mattress",
        "91.4 Metal PLV",
        "91.5 Carboard PLV",
        "8.7 Heating & Cooling",
        "5.7 Trays",
        "14.1 Leash",
        "7.2 Lote implantacion",
        "8.2 Audio & Video"
    ];
    // Brands list
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
                                    value={brand || undefined}
                                    onChange={(value) => setBrand(value === "None" ? "" : value)}
                                    allowClear
                                >
                                    {brandsList
                                        .sort()
                                        .map((brand) => (
                                        <Option key={brand} value={brand}>
                                            {brand}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col>
                                <Select
                                    placeholder="Select Category"
                                    style={{ width: 200 }}
                                    value={category || undefined}
                                    onChange={(value) => setCategory(value)}
                                    allowClear
                                >
                                    {categories
                                        .sort()
                                        .map((category) => (
                                        <Option key={category} value={category}>
                                            {category}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                            <Col>
                                <Select
                                    placeholder="Select Subcategory"
                                    style={{ width: 200 }}
                                    value={subcategory || undefined}
                                    onChange={(value) => setSubcategory(value)}
                                    allowClear
                                >
                                    {subcategories
                                        .sort()
                                        .map((subcategory) => (
                                        <Option key={subcategory} value={subcategory}>
                                            {subcategory}
                                        </Option>
                                    ))}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Button
                            onClick={() => {
                                setSearchQuery("");
                                setBrand("");
                                setCategory("");
                                setSubcategory("");
                                fetchProducts(1, pagination.pageSize);
                            }}
                        >
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
