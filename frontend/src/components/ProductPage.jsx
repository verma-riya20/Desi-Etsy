import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

const dummyProducts = [
  {
    id: 1,
    name: "Handwoven Basket",
    image: "/products/basket.jpg",
    price: 799,
    material: "Bamboo",
    category: "Home Decor",
  },
  {
    id: 2,
    name: "Clay Pot",
    image: "/products/claypot.jpg",
    price: 499,
    material: "Clay",
    category: "Kitchenware",
  },
  {
    id: 3,
    name: "Earrings",
    image: "/products/earrings.jpg",
    price: 999,
    material: "Thread",
    category: "Jewellery",
  },
  {
    id: 4,
    name: "Bracelet",
    image: "/products/bracelet.jpg",
    price: 599,
    material: "Metal",
    category: "Jewellery",
  },
  {
    id: 5,
    name: "Thread Bag",
    image: "/products/threadbag.jpg",
    price: 1299,
    material: "Cotton",
    category: "Bags",
  },
  {
    id: 6,
    name: "Stone Wall Hanging",
    image: "/products/stonewall.jpg",
    price: 1999,
    material: "Stone",
    category: "Wall Hangings",
  },
  {
    id: 7,
    name: "Thread Earrings",
    image: "/products/thread-earrings.jpg",
    price: 349,
    material: "Thread",
    category: "Jewellery",
  },
  {
    id: 8,
    name: "Beaded Bracelet",
    image: "/products/beaded-bracelet.jpg",
    price: 499,
    material: "Beads",
    category: "Jewellery",
  },
  {
    id: 9,
    name: "Cotton Cloth Bag",
    image: "/products/cotton-cloth-bag.jpg",
    price: 699,
    material: "Cotton",
    category: "Bags",
  },
  {
    id: 10,
    name: "Macrame Wall Hanging",
    image: "/products/macrame-wall.jpg",
    price: 899,
    material: "Thread",
    category: "Wall Hangings",
  },
  {
    id: 11,
    name: "Brass Necklace",
    image: "/products/brass-necklace.jpg",
    price: 1599,
    material: "Brass",
    category: "Jewellery",
  },
  {
    id: 12,
    name: "Jute Sling Bag",
    image: "/products/jute-sling.jpg",
    price: 799,
    material: "Jute",
    category: "Bags",
  },
  {
    id: 13,
    name: "Stone Necklace",
    image: "/products/stone-necklace.jpg",
    price: 1799,
    material: "Stone",
    category: "Jewellery",
  },
  {
    id: 14,
    name: "Thread Bangles",
    image: "/products/thread-bangles.jpg",
    price: 299,
    material: "Thread",
    category: "Jewellery",
  },
];

const ProductPage = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product/approved");
        const approvedProducts = res.data.map((product) => ({
          id: product._id,
          name: product.name,
          image: `http://localhost:5000/uploads/${product.image}`, // 🟢 local server path
          price: product.price,
          material: product.material || "Handmade",
          category: product.category || "Misc",
        }));
        const combined = [...dummyProducts, ...approvedProducts];
        setProducts(combined);
        setFilteredProducts(combined);
      } catch (err) {
        console.error("Failed to fetch approved products:", err);
        setProducts(dummyProducts);
        setFilteredProducts(dummyProducts);
      }
    };

    fetchApprovedProducts();
  }, []);

  const handleFilter = ({ category, priceRange }) => {
    const filtered = products.filter(
      (product) =>
        (category.length === 0 || category.includes(product.category)) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (sortType) => {
    const sorted = [...filteredProducts];
    if (sortType === "priceLow") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceHigh") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortType === "ratingHigh") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setFilteredProducts(sorted);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1B1B1B] min-h-screen">
      <div className="flex">
        <FilterSidebar onFilter={handleFilter} onSort={handleSort} />
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
