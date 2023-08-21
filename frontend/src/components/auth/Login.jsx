import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./login.css";
import bgImg from "./img1.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
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
    dispatch(loginUser(user));
  };

  return (
    <>
      <div className="login">
        <div className="col-1">
          <h2>Login</h2>
          <form id='form' className='flex flex-col' onSubmit={handleSubmit}>
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
              <input type="checkbox"/>
              <label htmlFor="check"> Remember Me </label>
            </div>
            <button className='btn'>
              {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
            </button>
            {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
          </form>

        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
