 
import {
 
  Card,
 
  message,
 
  Button,
 
  Typography,
 
  Badge,
  Space,
  Image,
} from "antd";

import { ShoppingCartOutlined, ToTopOutlined } from "@ant-design/icons";
import { useState } from "react";
import Carousel from "react-multi-carousel";
 
 

const { Title } = Typography;

const foodItems = [
  {
    id: 1,
    name: "Delicious Burger",
    price: "$9.99",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
  },
  {
    id: 2,
    name: "Pasta Primavera",
    price: "$12.50",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
  {
    id: 3,
    name: "Grilled Steak",
    price: "$19.99",
    availability: "Limited",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDKvXDyFEi8pPiPqeqrnI9-SWMiUpVymQKzg&s",
  },
  {
    id: 4,
    name: "Caesar Salad",
    price: "$7.99",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754",
  },
  {
    id: 5,
    name: "Sushi Platter",
    price: "$24.99",
    availability: "Available",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYWQNvmFhYJ2zbp7MV0UoRrYP0sFn1O_B_iw&s",
  },
  {
    id: 6,
    name: "Margherita Pizza",
    price: "$11.50",
    availability: "Available",
    imageUrl: "https://media.gettyimages.com/id/1414575281/fr/photo/une-d%C3%A9licieuse-et-savoureuse-pizza-italienne-margherita-aux-tomates-et-mozzarella-de-buffle.jpg?s=612x612&w=gi&k=20&c=O2ozrdlb73YlLC7jceL06YU3u5IagEzJcjlm8uLuPUI=",
  },
  {
    id: 7,
    name: "Fried Chicken",
    price: "$8.75",
    availability: "Sold Out",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwHU2ul6KaqssDLDL_SAsp3RpDIf2uvAWYA&s",
  },
  {
    id: 8,
    name: "Tacos",
    price: "$6.50",
    availability: "Available",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWUlfT-BefBMZ8uA9gOe6ls1MAJPHKkwWYw&s",
  },
  {
    id: 9,
    name: "Lobster Roll",
    price: "$29.99",
    availability: "Limited",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },
  {
    id: 10,
    name: "Pancakes Stack",
    price: "$5.99",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    id: 11,
    name: "Chicken Alfredo",
    price: "$13.99",
    availability: "Available",
    imageUrl: "https://www.shutterstock.com/image-photo/creamy-alfredo-pasta-chicken-mushrooms-600nw-2217614495.jpg",
  },
  {
    id: 12,
    name: "Avocado Toast",
    price: "$4.99",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  }
];


const categories = [
  { id: 1, name: 'Food', imageUrl: 'https://media.istockphoto.com/id/1625128632/photo/most-common-allergy-food-shot-from-above.webp?b=1&s=612x612&w=0&k=20&c=jy8uEBErKnHmnunQ3xe-vetl65EGf__ZKOOs_bjCAaY=' },
  { id: 2, name: 'Drink', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVG-4-3ldc1a9-iIi-zTqaLWkdK-klI5LhEQ&s' },
  { id: 3, name: 'Snack', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA9dhXyfzP7yi-tfDg2hE8gITAc63TtjI3qA&s' },
  { id: 4, name: 'Ice cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5R3rptefqe_XbmdV2E5bd5y6abSKDZTksA&s' },
  { id: 5, name: 'Sweets', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c-e13bYoJBUUuEFHoJzlLmT3KA8jN3Gmfw&s' },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const CategoryCarousel = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id === selectedCategory ? null : id); // Toggle selection
  };

  return (
    <Carousel responsive={responsive} infinite={true} className="category-carousel">
      {categories.map((category) => (
        <Card 
          key={category.id} 
          hoverable 
          onClick={() => handleCategorySelect(category.id)} // Handle click
          style={{ 
            width: 120, 
            margin: '0 10px', 
            border: 'none', 
            backgroundColor: 'transparent', 
            borderRadius: '20px', 
            boxShadow: 'none'
          }}
        >
          <div style={{ 
            position: 'relative', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: selectedCategory === category.id ? '3px solid blue' : 'none' // Blue border when selected
          }}>
            <img 
              alt={category.name} 
              src={category.imageUrl} 
              style={{ 
                width: '100%', 
                height: '70px', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          </div>
          <h4 style={{ textAlign: 'center', margin: '10px 0 0 0' }}>{category.name}</h4>
        </Card>
      ))}
    </Carousel>
  );
};
const Menu = () => {
  // State to manage cart items
  const [cart, setCart] = useState([]); // Array of item IDs
  console.log("🚀 ~ Menu ~ cart:", cart)

  const handleAddToCart = (itemId) => {
    // Check if the item is already in the cart
    if (cart.includes(itemId)) {
      setCart(cart.filter(id => id !== itemId));
      message.info('Item removed from your cart!');
      return;
    }
    // Add item to cart
    setCart([...cart, itemId]);
    message.success('Item added to your cart!');
  };

  return (
    <div style={{ width: '100%' }}>
    {/* Category Section */}
    <div style={{ marginBottom: '20px' }}>
    <CategoryCarousel />

    </div>
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px' }}>
        {foodItems.map((item) => (
          <Badge.Ribbon
            key={`price-${item.id}`}
            text={`Price: ${item.price}`}
            color="blue"
            placement="start"
          >
            <Badge.Ribbon
              key={`availability-${item.id}`}
              text={item.availability}
              color={item.availability === "Available" ? 'green' : 'orange'}
              placement="end"
            >
              <Card
                key={item.id}
                onClick={() => handleAddToCart(item.id)} // Handle click

                hoverable
                style={{
                  width: 200,
                  border: cart.includes(item.id) ? '2px solid #1890ff' : undefined // Highlight selected card
                }}
                cover={
                  <img
                    alt={item.name}
                    src={item.imageUrl}
                    style={{ height: 120, objectFit: 'cover' }} // Ensures the image covers the area
                  />
                }
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <h3 style={{ fontSize: '16px', margin: '5px 0' }}>{item.name}</h3> {/* Smaller font size */}
                </div>
              </Card>
            </Badge.Ribbon>
          </Badge.Ribbon>
        ))}
      </div>
    </Space>
      </div>
  );
};

export default Menu;

