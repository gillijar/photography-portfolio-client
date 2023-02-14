import { useState } from "react";
import { addItem } from "../../helpers/addItem";
import { subtractItem } from "../../helpers/subtractItem";

// Everytime the cart state is changed to true this component will be rendered to the user
const CartItem = ({ item, addCartTotalFunc, subtractCartTotalFunc }) => {
  // State for the item quantity and item total. This is retreived from the item prop which is grabbed in the
  // cart component "UI/Cart/Cart.js" from the local storage variable "userCart"
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [itemTotal, setItemTotal] = useState(item.price * item.quantity);

  // This function is for adding 1 to the original item. First it runs the addItem function
  // with a parameter of the item prop. It then sets the state for all necessary variables and then sums the total
  // of the cart in the parent component. "UI/Cart/Cart.js"
  const addItemHandler = () => {
    addItem(item);
    setItemQuantity((prevState) => prevState + 1);
    setItemTotal((prevState) => prevState + item.price);
    addCartTotalFunc(item.price);
  };

  // This is the same as addItemHandler, except we are subtracting 1 from everything
  const subtractItemHandler = () => {
    subtractItem(item);
    setItemQuantity((prevState) => prevState - 1);
    setItemTotal((prevState) => prevState - item.price);
    subtractCartTotalFunc(item.price);
  };

  return (
    <div className="h-20 w-full border-b-1 border-gray-200 flex justify-between">
      <div className="flex space-x-4 items-center">
        <div className="h-full w-20">
          <img
            className="h-full w-full object-cover"
            src={item.image}
            alt="cart item"
          />
        </div>
        <div>
          <p className="text-sm">{item.description}</p>
          <p className="text-sm font-bold">${itemTotal}.00</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2">
        <p className="text-sm">
          Qty: <span className="font-bold">{itemQuantity}</span>
        </p>
        <div className="flex space-x-1">
          <button
            className="text-lg font-bold border-1 border-gray-200 rounded-3 w-6 h-6 flex justify-center items-center hover:bg-gray-200 duration-200"
            onClick={addItemHandler}
          >
            +
          </button>
          <button
            className="text-lg font-bold border-1 border-gray-200 rounded-3 w-6 h-6 flex justify-center items-center hover:bg-gray-200 duration-200"
            onClick={subtractItemHandler}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
