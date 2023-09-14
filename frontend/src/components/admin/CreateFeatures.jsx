import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { url, setHeaders } from "../../slices/api";
import { featuresCreate } from "../../slices/featuresSlice";

const CreateFeatures = () => {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.features);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");

    const handleCreateFeature = async (e) => {
        e.preventDefault();

        dispatch(featuresCreate({
            name,
            description,
            price,
        }));
        setName("");
        setDesc("");
        setPrice("");
    };

    return (
        <StyledCreateFeatures>
            <StyledForm onSubmit={handleCreateFeature}>
                <h3>Create a Feature</h3>
                <CreateForm>
                    <h5>Nama Fitur :</h5>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <h5>Harga Fitur :</h5>
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <h5>Deskripsi Fitur :</h5>
                    <input
                        type="text"
                        placeholder="Short Description"
                        value={description}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </CreateForm>
                <PrimaryButton type="submit">
                    {createStatus === "pending" ? "Submitting" : "Submit"}
                </PrimaryButton>
            </StyledForm>
        </StyledCreateFeatures>
    );
};

export default CreateFeatures;

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

const StyledCreateFeatures = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateForm = styled.div`
  margin-top: 10px;
`;
