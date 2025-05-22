import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAuthSlice } from "../redux/authSlice";

export default function SigninForm() {
  // const user = useSelector((state) => state.auth.user);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSingup = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Please enter your email address.";
    if (!formData.password) newErrors.password = "Please enter your password.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    dispatch(loginAuthSlice(formData))
      .unwrap()
      .then(() => {
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      })
      .catch((err) => {
        setErrors({ password: err });
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (loginSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 rounded-lg bg-gradient-to-r from-blue-100 to-teal-50 shadow-lg max-w-md mx-auto mt-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          Login Successful!
        </h2>
        <p className="text-gray-600 text-center">
          You have been logged in successfully.
        </p>
     
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-blue-600"
          >
            Brand<span className="text-teal-500">Name</span>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex space-x-4"
          >
            <button className="px-6 py-2 bg-gradient-to-r from-teal-400 to-blue-500  text-white rounded-full hover:from-teal-500 hover:to-blue-600 transition-all duration-300">
              LOGIN
            </button>
            <button
              onClick={handleSingup}
              className="px-6 py-2 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
            >
              SIGN UP
            </button>
          </motion.div>
        </div>

        <motion.form
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          onSubmit={handleSubmit}
          className="p-6 md:p-10"
        >
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your account</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="pl-10 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-500 hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500 hover:text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center mb-6"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <a
              href="/forgot"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Forgot password?
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-6"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "SIGN IN"
              )}
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Sign up now
              </a>
            </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
