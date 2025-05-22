import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const handlePurchase = () => {
    alert("Purchase Successful!");
  };
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-amber-300 w-full min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-screen-xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mt-8 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Your Cart
        </motion.h2>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            Your cart is empty.
          </div>
        ) : (
          <>
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full object-contain p-6"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.category}
                    </p>
                    <p className="text-xl text-green-600 font-bold mb-2">
                      Rs {item.price * item.quantity}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-2xl font-bold mb-4">
                Total: Rs {totalAmount.toFixed(2)}
              </p>
              <button
                onClick={handlePurchase}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
