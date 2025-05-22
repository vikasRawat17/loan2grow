import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/prodcutsSlice";
import { useNavigate } from "react-router-dom";
import { cartThunk } from "../redux/cartSlice";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleClick = (id) => {
    dispatch(cartThunk(id));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = data?.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <div className="px-6 py-10 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-10 text-center text-red-500">Error: {error}</div>
    );
  }

  if (!visibleProducts || visibleProducts.length === 0) {
    return (
      <div className="px-6 py-10 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="bg-amber-300 w-full min-h-screen p-4">
      <div className="w-full py-10">
        <motion.h2
          className="text-3xl mt-4 font-bold mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Products
        </motion.h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 max-w-sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain p-3"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                <p className="text-lg text-green-600 font-bold">
                  Rs {product.price}
                </p>
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => handleClick(product.id)}
                  className="w-full px-3 py-2 text-sm cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
