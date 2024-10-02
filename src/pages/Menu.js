import React, { useState } from "react";
import { Card, message, Badge, Button, Space, Row, Col, Select } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import Carousel from "react-multi-carousel";
import { GET_PRODUCTS } from "../graphql/productQueries";
import { GET_CATEGORIES } from "../graphql/categoryQueries";
import { GET_TABLES } from "../graphql/tableQueries";
import { CREATE_ORDER } from "../graphql/orderQueries";

const CategoryCarousel = ({ categories, selectedCategory, handleCategorySelect }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 10 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
  };

  return (
    <Carousel responsive={responsive} infinite={true} className="category-carousel">
      {/* All category card */}
      <Card
        hoverable
        onClick={() => handleCategorySelect(null)}
        style={{
          width: 100,
          margin: "0 10px",
          border: "none",
          backgroundColor: "transparent",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
            border: selectedCategory === null ? "3px solid blue" : "none",
          }}
        >
          <img
            alt="All"
            src="all-category-image-url"
            style={{ width: "100%", height: "70px", objectFit: "cover", borderRadius: "50%" }}
          />
        </div>
        <h4>All</h4>
      </Card>
      {categories.map((category) => (
        <Card
          key={category.id}
          hoverable
          onClick={() => handleCategorySelect(category.id)}
          style={{
            width: 100,
            margin: "0 10px",
            border: "none",
            backgroundColor: "transparent",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              border: selectedCategory === category.id ? "3px solid blue" : "none",
            }}
          >
            <img
              alt={category.name}
              src={category.imageUrl}
              style={{ width: "100%", height: "70px", objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
          <h4>{category.name}</h4>
        </Card>
      ))}
    </Carousel>
  );
};

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null); // New state for selected table

  // Fetch products, categories, and tables
  const { loading: loadingProducts, error: errorProducts, data: productData } = useQuery(GET_PRODUCTS);
  const { loading: loadingCategories, error: errorCategories, data: categoriesData } = useQuery(GET_CATEGORIES);
  const { loading: loadingTables, error: errorTables, data: tablesData } = useQuery(GET_TABLES);  
  const [createOrder] = useMutation(CREATE_ORDER); // Initialize the mutation

  if (loadingProducts || loadingCategories || loadingTables) return <p>Loading...</p>;
  if (errorProducts || errorCategories || errorTables) return <p>Error fetching data!</p>;

  const categories = categoriesData?.categories || [];
  const tables = tablesData?.tables || []; // Get the available tables

  const handleCategorySelect = (id) => {
    setSelectedCategory(id === selectedCategory ? null : id);
  };

  const filteredProducts = selectedCategory
    ? productData?.products.filter((product) => product.category.id === selectedCategory)
    : productData?.products;

  const productItems = filteredProducts?.map((product) => ({
    key: product.id,
    ...product,
  }));

  const handleAddToCart = (item) => {
    const existingItem = cart.find((product) => product.id === item.id);
    
    if (existingItem) {
      // If the item already exists, increment the quantity
      setCart(cart.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      ));
      message.success("Item quantity increased!");
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
      message.success("Item added to your cart!");
    }
  };

  const handleIncrement = (itemId) => {
    setCart(cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };
  
  const handleDecrement = (itemId) => {
    setCart(cart.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } // Prevent going below 1
        : item
    ));
  };

  const handleAssignTable = async () => {
    if (!selectedTable) {
      message.warning("Please select a table.");
      return;
    }
    
    // Iterate over the cart items and create orders
    try {
      for (const item of cart) {
        await createOrder({
          variables: {
            productId: item.id,
            quantity: item.quantity,
            tableId: selectedTable,
          },
        });
      }
      message.success("Orders created successfully!");
      setCart([]); // Clear the cart after creating orders
      setSelectedTable(null); // Reset selected table
    } catch (error) {
      message.error("Error creating orders. Please try again.");
    }
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <Row gutter={[16, 16]} justify="space-between">
        <Col xs={24} md={16} lg={18}>
          <div style={{ marginBottom: "20px" }}>
            <CategoryCarousel
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategorySelect={handleCategorySelect}
            />
          </div>
          {/* Scrollable product list */}
          <div style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}>
            <Row gutter={[16, 16]}>
              {productItems.map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                  <Badge.Ribbon text={`Price: $${item.price}`} color="blue">
                    <Card
                      hoverable
                      onClick={() => handleAddToCart(item)}
                      style={{
                        border: cart.find((product) => product.id === item.id) ? "2px solid #1890ff" : undefined,
                        borderRadius: "10px",
                      }}
                      cover={<img alt={item.name} src={item.imageUrl} style={{ height: 150, objectFit: "cover" }} />}
                    >
                      <h3 style={{ fontSize: "16px", margin: "5px 0" }}>{item.name}</h3>
                    </Card>
                  </Badge.Ribbon>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col xs={24} md={8} lg={6}>
          {/* Scrollable cart section */}
          <div style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}>
            {cart.map((item) => (
              <Card
                key={item.id}
                hoverable
                style={{
                  marginBottom: "5px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <img alt={item.name} src={item.imageUrl} style={{ height: 50, width: 50, objectFit: "cover", borderRadius: "10px" }} />
                  <h3 style={{ fontSize: "14px", margin: "0 10px" }}>{item.name}</h3>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Button 
                      type="default" 
                      style={{ marginRight: 8, padding: 1 }}
                      icon={<MinusOutlined />} 
                      onClick={() => handleDecrement(item.id)} // Decrement quantity
                    />
                    <span>{item.quantity}</span> {/* Display the quantity */}
                    <Button 
                      type="default" 
                      style={{ marginRight: 8, padding: 1 }}
                      icon={<PlusOutlined />} 
                      onClick={() => handleIncrement(item.id)} // Increment quantity
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="py-3" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <Select
              style={{ width: "65%" }}
              options={tables
                .filter((table) => table.status === "AVAILABLE") // Filter available tables
                .map((table) => ({
                  value: table.id,
                  label: `Table ${table.number} - ${table.status}`,
                }))}
              placeholder="Select a table"
              onChange={setSelectedTable} // Update selected table on change
            />
            <Button type="primary" style={{ width: "35%" }} onClick={handleAssignTable}>
              Assign Table
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Menu;