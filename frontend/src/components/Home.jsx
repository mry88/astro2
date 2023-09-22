// import { useSelector } from "react-redux";
// //import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
// // import { addToCart } from "../slices/cartSlice";
// // import { useGetAllProductsQuery } from "../slices/productsApi";

// const Home = () => {
//   const { items: data, status } = useSelector((state) => state.products);
//   //const dispatch = useDispatch();
//   //const navigate = useNavigate();

//   //const { data, error, isLoading } = useGetAllProductsQuery();

//   // const handleAddToCart = (product) => {
//   //   dispatch(addToCart(product));
//   //   navigate("/cart");
//   // };

//   return (
//     <div className="home-container">
//       {status === "success" ? (
//         <>
//           <h2>Product List</h2>
//           <div className="products">
//             {data &&
//               data?.map((product) => (
//                 <div key={product._id} className="product">
//                   <h3>{product.name}</h3>
//                   <Link to={"/product/" + product._id}>
//                     <img src={product.image.url} alt={product.name} />
//                   </Link>
//                   <div className="details">
//                     <span>{product.category?.name}</span>
//                   </div>
//                   <div className="details">
//                     <span>{product.desc}</span>
//                   </div>
//                   <div className="details">
//                     <span className="price">${product.price}</span>
//                   </div>
//                   <Link to={"/product/" + product._id}>
//                     <button>View Detail</button>
//                   </Link>
//                 </div>
//               ))}
//           </div>
//         </>
//       ) : status === "pending" ? (
//         <p>Loading...</p>
//       ) : (
//         <p>Unexpected error occured...</p>
//       )}
//     </div>
//   );
// };

// export default Home;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
  
  const scrollButtonRef = useRef();
  
  useEffect(() => {
    const handleScroll = () => {
      if (scrollButtonRef.current) { // Check if scrollButtonRef.current exists
        if (window.scrollY > 200) {
          scrollButtonRef.current.style.display = "block";
        } else {
          scrollButtonRef.current.style.display = "none";
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 font-roboto flex h-full w-full min-h-screen overflow-y-auto">
      <div className="font-roboto bg-gray-800 flex flex-col w-96 p-5">
        <h3 className="text-white font-sans text-2xl mb-3 mt-3">Filter Products</h3>
        <div className="text-white font-sans text-base mb-1 mt-1">
          <label htmlFor="categorySelect">Select Category:</label>
          <select
            className="outline-none h-10 px-2 border border-purple-600 w-80 rounded-lg text-black"
            id="categorySelect"
            onChange={handleCategoryChange}
            required
          >
            {items.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="text-white font-sans text-base mb-1 mt-1">
          <label htmlFor="searchInput">Search Products:</label>
          <input
            className="outline-none h-10 px-2 border border-purple-600 w-80 rounded-lg"
            id="searchInput"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="text-white font-sans text-base mb-1 mt-1">
          <label htmlFor="minPriceInput">Min Price:</label>
          <input
            className="outline-none h-10 px-2 border border-purple-600 w-80 rounded-lg"
            id="minPriceInput"
            type="text"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </div>
        <div className="text-white font-sans text-base mb-1 mt-1">
          <label htmlFor="maxPriceInput">Max Price:</label>
          <input
            className="outline-none h-10 px-2 border border-purple-600 w-80 rounded-lg"
            id="maxPriceInput"
            type="text"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
  
      <div className="flex-grow overflow-y-auto">
        <h2 className="text-white font-roboto text-4xl mb-3 mt-3 text-center">Product List</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 ml-4">
          {status === "success" ? (
            <>
              {filteredData.map((product) => (
                <div key={product._id} className="bg-white border border-black shadow-lg p-4 rounded-lg">
                  <Link to={"/product/" + product._id}>
                    <img className="w-full h-48 object-cover rounded-t-lg" src={product.image.url} alt={product.name} />
                  </Link>
                  <div className="text-gray-800 text-sm font-sans md:font-medium mt-2">
                    <span>{product.category.name}</span>
                  </div>
                  <h3 className="text-gray-800 font-sans md:font-bold text-2xl pb-2">{product.name}</h3>
                  <div className="text-gray-800 text-xl font-sans md:font-bold mt-1">
                    <span>${product.price}</span>
                  </div>
                  <Link to={"/product/" + product._id}>
                    <button className="mt-5 mb-2 text-white bg-red-600 border border-gray-300 focus:outline-none hover:bg-red-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-medium px-5 py-2.5 mr-2 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full">View Detail</button>
                  </Link>
                </div>
              ))}
            </>
          ) : status === "pending" ? (
            <p className="text-white">Loading...</p>
          ) : (
            <p className="text-white">Unexpected error occurred...</p>
          )}
        </div>
      </div>

      <button
        ref={scrollButtonRef}
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-red-600 text-white px-4 py-2 rounded-full border border-gray-300 focus:outline-none hover:bg-red-700 focus:ring-4 focus:ring-gray-200"
      >
        Back to Top
      </button>
    </div>
  );
};

export default Home;


