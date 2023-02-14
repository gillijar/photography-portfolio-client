import { addItem } from "../../helpers/addItem";

const AddToCart = ({ item }) => {
  // This function runs the addItem function which will add 1 to the current quantity of the desired item
  const addItemHandler = () => {
    addItem(item);
  };

  return (
    <button
      className="border-2 border-green-500 text-white md:text-black md:border-gray-300 rounded-3 mt-7 py-3 px-5 text-lg bg-green-500 md:bg-transparent hover:bg-green-500 hover:text-white hover:border-green-500 duration-200"
      onClick={addItemHandler}
    >
      Add To Cart
    </button>
  );
};

export default AddToCart;
