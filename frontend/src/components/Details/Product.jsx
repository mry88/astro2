import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../slices/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: '',
    category: '',
    desc: '',
    price: 0,
    image: null,
    features: [],
    video: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedFeaturePrice, setSelectedFeaturePrice] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/products/find/${params.id}`);

        console.log("Fetched Product:", res.data);

        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = (product, selectedFeatures) => {
    let selectedFeaturePrice = 0;
    selectedFeatures.forEach(featureName => {
      const feature = product.features.find(f => f.name === featureName);
      if (feature) {
        selectedFeaturePrice += parseFloat(feature.price);
      }
    });
    console.log(selectedFeaturePrice);
    const productWithFeatures = {
      ...product,
      selectedFeatures: selectedFeatures,
      selectedFeaturePrice: selectedFeaturePrice,
    };
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

  // const handleFeatureChange = (e, featureName, featurePrice) => {
  //   const isChecked = e.target.checked;

  //   setSelectedFeatures((prevFeatures) => {
  //     if (isChecked) {
  //       return [...prevFeatures, featureName];
  //     } else {
  //       return prevFeatures.filter((fn) => fn !== featureName);
  //     }
  //   });

  //   setSelectedFeaturePrice((prevPrice) => {
  //     if (isChecked) {
  //       return prevPrice + featurePrice;
  //     } else {
  //       return prevPrice - featurePrice;
  //     }
  //   });
  // };

  return (
    <StyledProduct>
      <ProductContainer>
        <TopContainer>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <ImageContainer>
                <img src={product.image?.url} alt="product" />
              </ImageContainer>
              <ProductDetails>
                <h3>{product.name}</h3>
                <p>
                  <span>Category:</span> {product.category.name}
                </p>
                <p>
                  <span>Description:</span> {product.desc}
                </p>
                <Price>Rp.{product.price + selectedFeaturePrice}</Price>
              </ProductDetails>
            </>
          )}
        </TopContainer>
        <VideoContainer>
          <iframe
            src={product.video}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            title="video"
          />
        </VideoContainer>
        <BotContainer>
          <div><h3>Add Feature :</h3></div>
          {product.features.map((feature) => (
            <label>
              <input type="checkbox" name={feature.name} value={feature.price} onChange={(e) => handleFeatureChange(e, feature.name, feature.price)} />
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
      </ProductContainer>
    </StyledProduct>
  );
};

export default Product;

const StyledProduct = styled.div`
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

const VideoContainer = styled.div`
        display: flex;
        width: 100%;
        justify-content: center;
        `;
