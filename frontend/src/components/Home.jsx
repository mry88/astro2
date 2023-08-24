<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
=======
import { useSelector } from "react-redux";
//import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import { addToCart } from "../slices/cartSlice";
>>>>>>> main
// import { useGetAllProductsQuery } from "../slices/productsApi";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
<<<<<<< HEAD
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
=======
  //const dispatch = useDispatch();
  //const navigate = useNavigate();

  //const { data, error, isLoading } = useGetAllProductsQuery();

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  //   navigate("/cart");
  // };
>>>>>>> main

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
<<<<<<< HEAD
          <h2>New Arrivals</h2>
=======
          <h2>Product List</h2>
>>>>>>> main
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={"/product/" + product._id}>
<<<<<<< HEAD
                    <img src={product.image?.url} alt={product.name} />
                  </Link>

                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">Rp {product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
=======
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <div className="details">
                    <span>{product.desc}</span>
                  </div>
                  <div className="details">
                    <span className="price">${product.price}</span>
                  </div>
                  <Link to={"/product/" + product._id}>
                    <button>View Detail</button>
                  </Link>
>>>>>>> main
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
