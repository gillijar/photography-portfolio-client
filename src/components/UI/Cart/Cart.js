import { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import CartItem from "./CartItem";

const Cart = () => {
  // Fetching all the items from the "userCart" variable in local storage. This will then be rendered to the user
  const cartItems = JSON.parse(localStorage.getItem("userCart"));
  const [cartVisible, setCartVisible] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Animations for the cart and the overlay
  const anim = useSpring({
    translateX: cartVisible ? "0%" : "100%",
  });

  const overlayAnim = useSpring({
    opacity: cartVisible ? 1 : 0,
    display: cartVisible ? "block" : "none",
  });

  // useEffect for getting the sum of the total items and total price of the cart. The cartItems can't change when the
  // cart is open so the useEffect is for preventing an infinite loop since several states are being set
  useEffect(() => {
    // Conditional for checking if cartItems is true because without it an error would be thrown since we would be trying
    // to access a null or undefined variable
    if (cartItems) {
      const quantity = cartItems.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity,
        0
      );

      const total = cartItems.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.price * currentItem.quantity,
        0
      );

      setCartQuantity(quantity);
      setCartTotal(total);
    }
  }, [cartItems]);

  // These two functions are only used for changing the value of the cartTotal state when the user adds or subtracts from
  // the current item in the CartItem component. "UI/Cart/CartItem.js"
  const addToCartTotal = (num) => {
    setCartTotal((prevState) => prevState + num);
  };

  const subtractFromCartTotal = (num) => {
    setCartTotal((prevState) => prevState - num);
  };

  // Function for toggling the cart
  const toggleCart = () => {
    setCartVisible((prevState) => !prevState);
  };

  return (
    <>
      <button
        className="fixed md:absolute bottom-5 md:top-5 right-5 p-5 md:p-3 flex justify-center items-center space-x-2 h-16 w-16 md:h-fit md:w-fit rounded-full md:rounded-3 bg-gray-400 text-white"
        onClick={toggleCart}
      >
        <i className="fa-solid fa-cart-shopping" />
        <p className="text-xs">{cartQuantity ? cartQuantity : 0}</p>
      </button>
      <animated.div
        className="fixed h-screen w-screen top-0 left-0 bg-overlayLight z-30 opacity-0"
        style={overlayAnim}
        onClick={toggleCart}
      ></animated.div>
      <animated.div
        className="bg-white fixed h-screen top-0 right-0 w-full z-40 md:w-1/3 lg:w-2/5 xl:w-1/5 translate-x-full font-sans"
        style={anim}
      >
        <div className="h-1/10 px-6 flex items-center justify-between border-b-1 border-gray-300">
          <p className="text-lg flex items-center">
            <i className="fa-solid fa-cart-shopping pr-3 text-gray-400 text-sm" />
            Shopping Cart
          </p>
          <i
            className="fa-solid fa-x text-xl text-gray-400 cursor-pointer"
            onClick={toggleCart}
          />
        </div>
        <div className="h-7/10 border-b-1 p-4 border-gray-300 overflow-scroll space-y-3 relative">
          {cartItems &&
            cartVisible &&
            cartItems.map((item) => (
              <CartItem
                item={item}
                addCartTotalFunc={addToCartTotal}
                subtractCartTotalFunc={subtractFromCartTotal}
                key={item._id}
              />
            ))}
          {!cartItems ||
            (cartItems.length === 0 && (
              <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <p className="font-medium">Your cart is currently empty</p>
                <p className="text-gray-400">
                  Add an item to your cart to make a purchase.
                </p>
              </div>
            ))}
        </div>
        <div className="h-1/10 px-6 flex items-center justify-between border-b-1 border-gray-300">
          <p>Order Subtotal</p>
          <p className="font-bold">${cartTotal ? cartTotal : 0}.00 USD</p>
        </div>
        <div className="h-1/10 px-6 py-4">
          <button className="border-1 border-green-500 bg-green-500 md:bg-transparent text-white md:text-black md:border-gray-400 p-2 rounded-3 hover:text-white hover:bg-green-500 hover:border-green-500 duration-200">
            Secure Checkout
          </button>
        </div>
      </animated.div>
    </>
  );
};

export default Cart;
