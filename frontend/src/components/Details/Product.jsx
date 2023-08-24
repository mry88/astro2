import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../slices/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
<<<<<<< HEAD
import "./details.css";
=======
>>>>>>> main

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

<<<<<<< HEAD
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
=======
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    desc: '',
    price: 0,
    image: null,
    features: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedFeaturePrice, setSelectedFeaturePrice] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
>>>>>>> main

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/products/find/${params.id}`);

<<<<<<< HEAD
=======
        console.log("Fetched Product:", res.data);

>>>>>>> main
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [params.id]);

<<<<<<< HEAD
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <StyledProduct>
      <ProductContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageContainer>
              <img src={product.image?.url} alt="product" />
            </ImageContainer>
            <ProductDetails>
              <h3 className="produk">{product.name}</h3>
              <p className="pp">
                <span>Brand:</span> {product.brand}
              </p>
              <p className="pp">
                <span>Description:</span> {product.desc}
                <Price>Rp {product.price?.toLocaleString()}</Price>
              </p>
              
              <button
                className="product-add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
            </ProductDetails>
          </>
        )}
=======
  const handleAddToCart = (product, selectedFeatures) => {
    const productWithFeatures = {
      ...product,
      selectedFeatures: selectedFeatures
    };
    let selectedFeaturePrice = 0;
    selectedFeatures.forEach(featureName => {
      selectedFeaturePrice += product.features.price;
      // const feature = product.features.find(f => f.name === featureName);
      // if (feature) {
      //   selectedFeaturePrice += feature.price;
      // }
    });
    dispatch(addToCart(productWithFeatures));
    navigate("/cart");
  };

  const handleFeatureChange = (e, featureName) => {
    const featurePrice = parseFloat(e.target.value);
    if (e.target.checked) {
      setSelectedFeaturePrice(prevPrice => prevPrice + featurePrice);
      setSelectedFeatures(prevFeatures => [...prevFeatures, featureName]);
    } else {
      setSelectedFeaturePrice(prevPrice => prevPrice - featurePrice);
      setSelectedFeatures(prevFeatures => prevFeatures.filter(fn => fn !== featureName));
    }
  };

  return (
    <StyledProduct>
      <ProductContainer>
        <TopContainer>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <ImageContainer>
                <img src={product.image} alt="product" />
              </ImageContainer>
              <ProductDetails>
                <h3>{product.name}</h3>
                <p>
                  <span>Brand:</span> {product.brand}
                </p>
                <p>
                  <span>Description:</span> {product.desc}
                </p>
                <Price>Rp.{product.price + selectedFeaturePrice}</Price>
              </ProductDetails>
            </>
          )}
        </TopContainer>
        <BotContainer>
          <div><h3>Add Feature :</h3></div>
          {product.features.map((feature) => (
            <label>
              <input type="checkbox" name={feature.name} value={feature.price} onChange={(e) => handleFeatureChange(e, feature.name, feature.Price)} />
              {feature.name} (Rp.{feature.price})
            </label>
          ))}
        </BotContainer>
        <button
          className="product-add-to-cart"
          onClick={() => handleAddToCart(product, selectedFeatures)}
        >
          Add To Cart
        </button>
>>>>>>> main
      </ProductContainer>
    </StyledProduct>
  );
};

export default Product;

const StyledProduct = styled.div`
<<<<<<< HEAD
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
  }
`;

const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;

  h3 {
    font-size: 35px;
  }

  p span {
    font-weight: bold;
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`;
=======
        margin: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        `;

const ProductContainer = styled.div`
        max-width: 500px;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border-radius: 5px;
        padding: 2rem;
        `;

const TopContainer = styled.div`
        display: flex;
        `;

const BotContainer = styled.div`
        display: flex;
        flex-direction: column;
        margin-bottom:20px;
        `;

const ImageContainer = styled.div`
        flex: 1;

        img {
          width: 100%;
  }
        `;

const ProductDetails = styled.div`
        flex: 2;
        margin-left: 2rem;

        h3 {
          font - size: 35px;
  }

        p span {
          font - weight: bold;
  }
        `;

const Price = styled.div`
        margin: 1rem 0;
        font-weight: bold;
        font-size: 25px;
        `;
>>>>>>> main
