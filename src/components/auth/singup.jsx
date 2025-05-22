import { useState } from "react";
import { motion } from "framer-motion";
import { signUpAuthSlice } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Country, State, City } from "country-state-city";

export default function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry, selectedState)
    : [];

  const [formData, setFormData] = useState({
    userType: "Individual",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    countryCode: "+1",
    mobileNumber: "",
    fax: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCountryChange = (e) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setFormData((prev) => ({
      ...prev,
      country: value,
      state: "",
      city: "",
    }));
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setFormData((prev) => ({
      ...prev,
      state: value,
      city: "",
    }));
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setSelectedCity(value);
    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.firstName)
      newErrors.firstName = "Please enter valid first name.";
    if (!formData.email) newErrors.email = "Please enter valid email.";
    if (!formData.address) newErrors.address = "Please enter valid address.";
    if (!formData.country) newErrors.country = "Please select your country.";
    if (!formData.state) newErrors.state = "Please select your state.";
    if (!formData.city) newErrors.city = "Please select your city.";
    if (!formData.pincode) newErrors.pincode = "Please enter valid pincode.";
    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Please enter valid mobile number.";
    if (!formData.countryCode)
      newErrors.countryCode = "Please select country code.";

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
      newErrors.password =
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm password should be same as password.";
    }

    return newErrors;
  };

  const handlelogin = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(signUpAuthSlice(formData));
      console.log("Form data submitted:", formData);
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  // const countries = [
  //   "United States",
  //   "Canada",
  //   "United Kingdom",
  //   "Australia",
  //   "India",
  //   "Germany",
  // ];
  // const states = [
  //   "California",
  //   "Texas",
  //   "New York",
  //   "Florida",
  //   "Washington",
  //   "Illinois",
  // ];
  // const cities = [
  //   "New York City",
  //   "Los Angeles",
  //   "Chicago",
  //   "Houston",
  //   "Phoenix",
  //   "Philadelphia",
  // ];
  const countryCodes = ["+1", "+44", "+61", "+91", "+49", "+33"];

  if (formSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 rounded-lg bg-gradient-to-r from-green-100 to-green-50 shadow-lg max-w-md mx-auto mt-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4"
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
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Registration Successful!
        </h2>
        <p className="text-gray-600 text-center">
          Your account has been created successfully.
        </p>
        <button
          onClick={() => {
            handlelogin();
            setFormSubmitted(false);
            setFormData({
              userType: "Individual",
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              country: "",
              state: "",
              city: "",
              pincode: "",
              countryCode: "+1",
              mobileNumber: "",
              fax: "",
              phone: "",
              password: "",
              confirmPassword: "",
            });
          }}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        >
          Login
        </button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
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
            <button
              onClick={handlelogin}
              className="px-6 py-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              LOGIN
            </button>
            <button className="px-6 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors">
              SIGN UP
            </button>
          </motion.div>
        </div>

        <motion.form
          initial="hidden"
          animate="visible"
          variants={formVariants}
          onSubmit={handleSubmit}
          className="p-6 md:p-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600">Fill in the details to get started</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-2">
              Individual/Enterprise/Government{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6">
              {["Individual", "Enterprise", "Government"].map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="radio"
                    id={type.toLowerCase()}
                    name="userType"
                    value={type}
                    checked={formData.userType === type}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={type.toLowerCase()}
                    className="ml-2 text-gray-700"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                disabled={!selectedCountry}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
              )}
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-24 px-4 py-2 border rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {countryCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile number"
                className="flex-1 px-4 py-2 border border-l-0 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
            )}
            {errors.countryCode && (
              <p className="text-red-500 text-sm mt-1">{errors.countryCode}</p>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">Fax</label>
              <input
                type="text"
                name="fax"
                value={formData.fax}
                onChange={handleChange}
                placeholder="Fax number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-6">
            <label className="block text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.password ? (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            ) : (
              <p className="text-gray-500 text-sm mt-1">
                Must contain at least one number and one uppercase and lowercase
                letter, and at least 8 characters
              </p>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <label className="block text-gray-700 mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                  Processing...
                </div>
              ) : (
                "SIGNUP"
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
