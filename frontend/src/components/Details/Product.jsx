import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../slices/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    desc: "",
    price: 0,
    image: null,
    features: [],
    video: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedFeaturePrice, setSelectedFeaturePrice] = useState(0);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${url}/products/find/${params.id}`);
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
    selectedFeatures.forEach((featureName) => {
      const feature = product.features.find((f) => f.name === featureName);
      if (feature) {
        selectedFeaturePrice += parseFloat(feature.price);
      }
    });

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
      setSelectedFeaturePrice((prevPrice) => prevPrice + featurePrice);
      setSelectedFeatures((prevFeatures) => [...prevFeatures, featureName]);
    } else {
      setSelectedFeaturePrice((prevPrice) => prevPrice - featurePrice);
      setSelectedFeatures((prevFeatures) =>
        prevFeatures.filter((fn) => fn !== featureName)
      );
    }
  };

  return (
    <StyledProduct>
      <ProductContainer>
        <TopContainer>
          {loading ? (
            <LoadingText>Loading...</LoadingText>
          ) : (
            <>
              <ImageContainer>
                <ProductImage src={product.image?.url} alt="product" />
              </ImageContainer>
              <ProductDetails>
                <ProductName>{product.name}</ProductName>
                <ProductCategory>Category: {product.category.name}</ProductCategory>
                <ProductDescription>Description: {product.desc}</ProductDescription>
                <ProductPrice>Price Basic: Rp.{product.price}</ProductPrice>
              </ProductDetails>
            </>
          )}
        </TopContainer>
        <h3 className="text-xl font-semibold mb-2">Product Video</h3>
        <VideoContainer>
          
          <ProductVideo
            src={product.video}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
        </VideoContainer>
        <FeatureContainer>
          <h3 className="text-2xl font-semibold mb-4">Add Features:</h3>
          {product.features.map((feature) => (
            <FeatureLabel key={feature.name}>
              <FeatureCheckbox
                type="checkbox"
                name={feature.name}
                value={feature.price}
                onChange={(e) => handleFeatureChange(e, feature.name)}
              />
              {feature.name} (Rp.{feature.price})
            </FeatureLabel>
          ))}
        </FeatureContainer>
        <TotalPrice>
          Total: Rp.{product.price + selectedFeaturePrice}
        </TotalPrice>
        <AddToCartButton
          onClick={() => handleAddToCart(product, selectedFeatures)}
          className="mt-4"
        >
          Add To Cart
        </AddToCartButton>
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
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  background-color: #fff;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProductDetails = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`;

const ProductName = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProductCategory = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 1rem;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const TotalPrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: #0070f3;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const ProductVideo = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeatureLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 0.5rem;
`;

const FeatureCheckbox = styled.input`
  margin-right: 0.5rem;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 1rem;
`;
