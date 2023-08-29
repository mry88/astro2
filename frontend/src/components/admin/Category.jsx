import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Category = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <h2>Category</h2>
        <PrimaryButton
          onClick={() => navigate("/admin/category/create-category")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Category;
