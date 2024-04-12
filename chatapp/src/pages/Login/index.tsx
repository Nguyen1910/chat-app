import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../Context/AuthProvider";
import FacebookIcon from "../../assets/images/facebook.png";
import GoogleIcon from "../../assets/images/google.png";

const Login = () => {
  const { loginAction, handleSignInWithEmail } = useAuthContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "nguyen191000@gmail.com",
      password: "nguyen",
    },
    onSubmit: async (values) => {
      loginAction(values);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-gradient-to-b from-[#1e1c31] to-[#2c2b58] flex flex-col p-8 items-center gap-8 rounded-lg max-w-[450px] h-auto">
        <div className="flex flex-col justify-center items-center">
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-[40px] font-medium">
            Login
          </h1>
          <p className="text-gray-200">
            Hey, enter your details to get sign in to your account
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col gap-8"
        >
          <div className="flex flex-col gap-5 w-full">
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus-visible:outline-none"
              placeholder="nguyenvana@gmail.com"
              required
              autoComplete="off"
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="•••••••••"
              required
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus-visible:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#3a50fc] w-full rounded-3xl h-[40px] hover:opacity-90"
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center justify-center gap-4 after:border after:inline-block after:w-20 before:border before:inline-block before:w-20">
          <p className=" mb-1">Or continue with</p>
        </div>
        <ul className="flex gap-10">
          <li className="h-[35px]">
            <button
              className="h-full hover:opacity-90"
              onClick={handleSignInWithEmail}
            >
              <img className="h-full" src={GoogleIcon} alt="google.com" />
            </button>
          </li>
          <li className="h-[35px]">
            <button className="h-full hover:opacity-90">
              <img className="h-full" src={FacebookIcon} alt="facebook.com" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
