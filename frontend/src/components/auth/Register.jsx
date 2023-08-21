import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import "./style.css";
import bgImg from "./img1.jpg";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(registerUser(user));
  };

  return (
    <>
      <div className="register">
        <div className="col-1">

          <h2>Register</h2>
          <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div>
              <input type="checkbox" required/>
              <label htmlFor="check"> By checking this, you agree to our <Link to={"/"}>terms & conditions</Link></label>
            </div>
            <button className='btn'>
              {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"}
            </button>
            {auth.registerStatus === "rejected" ? (
              <p>{auth.registerError}</p>
            ) : null}
          </form>

        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Register;
