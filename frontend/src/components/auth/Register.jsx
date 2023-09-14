import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import COVER_IMAGE from "./roket-refelct.jpg"

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
      <div className="bg-zinc-200 h-screen flex justify-center items-center">
        <img src={COVER_IMAGE} className="w-96 h-4/6" />
        <div className="bg-slate-300 h-4/6 pl-10 space-y-3 w-[350px] flex flex-col justify-center">

          <h2 className="font-semibold text-2xl tracking-wide">Register</h2>
          <form id='form' className="flex flex-col mr-5 space-y-2" onSubmit={handleSubmit}>
            <p className="text-zinc-950 font-semibold">Name</p>
            <input
              className="outline-none h-10 px-3 border border-sm w-full"
              type="text"
              placeholder="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <p className="text-zinc-950 font-semibold">Email</p>
            <input
              className="outline-none h-10 px-3 border-2 border-solid w-full"
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
              <input type="checkbox" required />
              <label htmlFor="check"> By checking this, you agree to our <Link to={"/"}>terms & conditions</Link></label>
            </div>
            <button className='btn bg-red-600 w-full mr-5 mt-3 h-10 rounded-full hover:bg-red-500 duration-300 text-white font-semibold'>
              {auth.rigisterStatus === "pending" ? "Submitting..." : "Register"}
            </button>
            {auth.registerStatus === "rejected" ? (
              <p>{auth.registerError}</p>
            ) : null}
          </form>

        </div>

      </div>
    </>
  );
};

export default Register;
