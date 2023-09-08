import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useEffect } from "react";
import { setHeaders, url } from "../../slices/api";
import { featuresEdit } from "../../slices/featuresSlice";

export default function EditFeatures({ featId }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.features);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const [currentFeat, setCurrentFeat] = useState({});

    useEffect(() => {
        // Fetch the selected feature item by ID
        const selectedFeature = items.find((item) => item._id === featId);
        if (selectedFeature) {
            setName(selectedFeature.name);
            setPrice(selectedFeature.price);
            setDesc(selectedFeature.description);
        }
    }, [items, featId]);

    const handleUpdateFeature = async (e) => {
        e.preventDefault();

        try {
            // Send a PUT request to update the feature
            const response = await fetch(`${url}/features/${featId}`, {
                method: "PUT",
                headers: {
                    ...setHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description, price }),
            });

            if (response.ok) {
                // Feature updated successfully
                const updatedFeature = await response.json();
                console.log("Updated feature:", updatedFeature);

                // Optionally, you can dispatch an action to update the Redux store
                dispatch(featuresEdit(updatedFeature));

                // Close the edit form or handle it as per your UI flow
            } else {
                // Handle error cases
                console.error("Error updating feature:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating feature:", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    
        let selectedFeat = items.filter((item) => item._id === featId);
    
        selectedFeat = selectedFeat[0];
    
        setCurrentFeat(selectedFeat);
        setName(selectedFeat.name);
        setPrice(selectedFeat.price);
        setDesc(selectedFeat.description);
      };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Edit onClick={handleClickOpen}>Edit</Edit>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>Edit Feature</DialogTitle>
                <DialogContent>
                    <StyledEditFeatures>
                        <StyledForm onSubmit={handleUpdateFeature}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Short Description"
                                value={description}
                                onChange={(e) => setDesc(e.target.value)}
                                required
                            />
                            <PrimaryButton type="submit">Edit</PrimaryButton>
                        </StyledForm>
                    </StyledEditFeatures>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const Edit = styled.button`
  border: none;
  outline: none;

  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;

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

const StyledEditFeatures = styled.div`
  display: flex;
  justify-content: space-between;
`;
