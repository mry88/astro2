import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import COVER_IMAGE from "./roket.jpg"


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
      <div className="bg-zinc-200 h-screen flex justify-center items-center">
        <div className="bg-slate-300 h-96 pl-10 space-y-3 w-[350px] flex flex-col justify-center">
          
          <h2 className="font-semibold text-2xl tracking-wide">Login</h2>
          <form id='form' className="flex flex-col mr-5 space-y-2" onSubmit={handleSubmit}>
            <p className="text-zinc-950 font-semibold">Email</p>
            <input
              className="outline-none h-10 px-3 border border-sm w-full"
              type="email"
              placeholder="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <p className="text-zinc-950 font-semibold">Password</p>
            <input
              className="outline-none h-10 px-3 border-2 border-solid w-full"
              type="password"
              placeholder="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="flex gap-4 mt-1">
              <input type="checkbox" />
              <label htmlFor="check"> Remember Me </label>
            </div>
            <button className='btn bg-red-600 w-full mr-5 mt-3 h-10 rounded-full hover:bg-red-500 duration-300 text-white font-semibold'>
              {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
            </button>
            {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}
          </form>

        </div>
        <img src={COVER_IMAGE} className="w-96 h-96 "/>
      </div>
    </>
  );
};

export default Login;
