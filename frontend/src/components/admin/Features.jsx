import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Features = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <h2>Features</h2>
        <PrimaryButton
          onClick={() => navigate("/admin/features/create-features")}
        >
          Create
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Features;
