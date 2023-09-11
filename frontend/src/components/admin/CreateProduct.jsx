import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { productsCreate } from "../../slices/productsSlice";
import { setHeaders, url } from "../../slices/api";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.features);
  const { catItems } = useSelector((state) => state.category);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [productImg, setProductImg] = useState("");
  const [category, setCategory] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);

      // reader.onloadstart = () => {
      //   console.log("FileReader started reading.");
      // };

      reader.onloadend = () => {
        if (reader.result) {
          setProductImg(reader.result);
        } else {
          console.error("Failed to read the file.");
        }
        // setProductImg(reader.result);
        // console.log(productImg);
      };
    } else {
      setProductImg("");
    }
  };

  const handleFeatureSelection = (e) => {
    const selectedFeatureId = e.target.value;
    if (e.target.checked) {
      setSelectedFeatures([...selectedFeatures, selectedFeatureId]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== selectedFeatureId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsCreate({
        name,
        category,
        price,
        desc,
        image: productImg,
        features: selectedFeatures,
        video,
      })
    );
    setName("");
    setCategory("");
    setDesc("");
    setPrice("");
  };

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Create a Product</h3>
        <h5>Upload Image :</h5>
        <input
          id="imgUpload"
          accept="image/*"
          type="file"
          onChange={handleProductImageUpload}
          required
        />
        <h5>Select Category :</h5>
        <select onChange={(e) => setCategory(e.target.value)} required>
        {catItems.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
        </select>
        <h5>Product Name :</h5>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <h5>Product Price :</h5>
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <h5>Description :</h5>
        <input
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <h5>Select Features :</h5>
        <table>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    value={item._id}
                    checked={selectedFeatures.includes(item._id)}
                    onChange={handleFeatureSelection}
                  />
                </td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h5>Insert Video Link :</h5>
        <input
          type="text"
          placeholder="Video Link"
          onChange={(e) => setVideo(e.target.value)}
          required
        />

        <PrimaryButton type="submit">
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <>
            <img src={productImg} alt="error!" />
          </>
        ) : (
          <p>Gambar Produk</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: left;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;

const FormCreate = styled.div`
  margin-top: 10px;
`;