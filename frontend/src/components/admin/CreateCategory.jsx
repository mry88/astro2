import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { url, setHeaders } from "../../slices/api";
import { categoryCreate } from "../../slices/categorySlice";

const CreateCategory = () => {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const handleCreateCategory = async (e) => {
        e.preventDefault();

        dispatch(categoryCreate({
            name,
            desc,
        }));
        setName("");
        setDesc("");
    };

    return (
        <StyledCreateCategory>
            <StyledForm onSubmit={handleCreateCategory}>
                <h3>Create a Category</h3>
                <CreateForm>
                    <h5>Nama category :</h5>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <h5>Deskripsi Category :</h5>
                    <input
                        type="text"
                        placeholder="Short Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </CreateForm>
                <PrimaryButton type="submit">
                    {createStatus === "pending" ? "Submitting" : "Submit"}
                </PrimaryButton>
            </StyledForm>
        </StyledCreateCategory>
    );
};

export default CreateCategory;

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

const StyledCreateCategory = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateForm = styled.div`
  margin-top: 10px;
`;
