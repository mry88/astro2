import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import "../App.css";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori
  const [filteredData, setFilteredData] = useState([]);
  const { items } = useSelector((state) => state.category);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const filteredProducts = data.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const priceMatch =
        (!minPrice || parseFloat(product.price) >= parseFloat(minPrice)) &&
        (!maxPrice || parseFloat(product.price) <= parseFloat(maxPrice));
      const categoryMatch = !selectedCategory || product.category.name === selectedCategory;
      return nameMatch && priceMatch && categoryMatch;
    });

    setFilteredData(filteredProducts);
  }, [data, searchTerm, minPrice, maxPrice, selectedCategory]);

  return (
    <div className="home-container">

      <div className="main-content">
        <h2>Product List</h2>
        <div className="pro-fe">
          <h3>Filter Products</h3>
          <div className="dropdown">
            <label htmlFor="searchInput">Search Products:</label>
            <input
              id="searchInput"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="dropdown">
            <label htmlFor="minPriceInput">Min Price:</label>
            <input
              id="minPriceInput"
              type="text"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
          <div className="dropdown">
            <label htmlFor="maxPriceInput">Max Price:</label>
            <input
              id="maxPriceInput"
              type="text"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          <div className="dropdown">
            <label htmlFor="categorySelect">Select Category:</label>
            <select
              id="categorySelect"
              // value={selectedCategory}
              onChange={handleCategoryChange}
              required>
              {items.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="products">
          {status === "success" ? (
            <>
              {filteredData.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={"/product/" + product._id}>
                    <img src={product.image.url} alt={product.name} />
                  </Link>
                  <div className="details">
                    <span>{product.category.name}</span>
                  </div>
                  <div className="details">
                    <span>{product.desc}</span>
                  </div>
                  <div className="details">
                    <span className="price">${product.price}</span>
                  </div>
                  <Link to={"/product/" + product._id}>
                    <button>View Detail</button>
                  </Link>
                </div>
              ))}
            </>
          ) : status === "pending" ? (
            <p>Loading...</p>
          ) : (
            <p>Unexpected error occurred...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
