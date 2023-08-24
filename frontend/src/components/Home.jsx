import { useSelector } from "react-redux";
//import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import { addToCart } from "../slices/cartSlice";
// import { useGetAllProductsQuery } from "../slices/productsApi";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  //const dispatch = useDispatch();
  //const navigate = useNavigate();

  //const { data, error, isLoading } = useGetAllProductsQuery();

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  //   navigate("/cart");
  // };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>Product List</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={"/product/" + product._id}>
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
