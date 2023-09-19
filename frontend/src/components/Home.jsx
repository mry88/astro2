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
    <div className="bg-slate-100 flex h-full w-full ">

      <div className="bg-indigo-950 flex flex-col w-96">
        <h3 className="text-sky-100 font-sans text-2xl pl-5 mb-3 mt-3">Filter Products</h3>
        <div className="text-sky-100 font-sans text-base pl-5 mb-1 mt-1">
          <label htmlFor="searchInput">Search Products:</label>
          <input
            className="outline-none h-10 px-2 border border-sm w-80 rounded-lg"
            id="searchInput"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="text-sky-100 font-sans text-base pl-5 mb-1 mt-1">
          <label htmlFor="minPriceInput">Min Price:</label>
          <input
            className="outline-none h-10 px-2 border border-sm w-80 rounded-lg"
            id="minPriceInput"
            type="text"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </div>
        <div className="text-sky-100 font-sans text-base pl-5 mb-1 mt-1">
          <label htmlFor="maxPriceInput">Max Price:</label>
          <input
            className="outline-none h-10 px-2 border border-sm w-80 rounded-lg"
            id="maxPriceInput"
            type="text"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
        <div className="text-sky-100 font-sans text-base pl-5 mb-1 mt-1">
          <label htmlFor="categorySelect">Select Category:</label>
          <select
            className="outline-none h-10 px-2 border border-sm w-80 rounded-lg text-slate-700"
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

      <div className="">
        <h2 className="font-sans text-4xl pl-5 mb-3 mt-3 text-center">Product List</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 ml-4">
          {status === "success" ? (
            <>
              {filteredData.map((product) => (
                <div key={product._id} className="border border-black p-4 rounded-lg bg-slate-400">
                 
                  <Link to={"/product/" + product._id}>
                    <img className="bg-gray-300 p-3 rounded-2xl flex justify-center w-48 h-48" src={product.image.url} alt={product.name} />
                  </Link>
                  <div className="text-sm font-sans md:font-medium mt-2">
                    <span>{product.category.name}</span>
                  </div>
                  <h3 className="font-sans md:font-bold text-2xl pb-2">{product.name}</h3>
                  {/* <div className="details">
                    <span>{product.desc}</span>
                  </div> */}
                  <div className="text-xl font-sans md:font-bold mt-1">
                    <span>${product.price}</span>
                  </div>
                  <Link to={"/product/" + product._id}>
                    <button className="mt-5 mb-2 text-slate-100 bg-red-600 broder border-gray-300 focus:outline-none hover:bg-red-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-medium px-5 py-2.5 mr-2 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-48">View Detail</button>
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
