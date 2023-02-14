import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../UI/LoadingSpinner";
import AddToCart from "./AddToCart";

const StoreItem = ({ closeOverlay }) => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(null);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  // This will close the overlay which is the individual item page. It will then navigate back to the original path
  // so that the url doesn't still contain the query of the previous item
  const closeItemPage = () => {
    // Prop variable for setting the viewing state in the parent component "Store/Store.js" to false. The overlay will
    // only be available in the DOM if viewing is true
    closeOverlay();
    navigate(pathname);
  };

  // Fetching the individual item from our DB and then setting the state for item as the returned data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Isolating the information we need to pass into the response. Ex. ?img=6135sd6fa161 => 6135sd6fa161
        const itemQuery = search.split("=")[1];
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1${pathname}/${itemQuery}`
        );
        const item = response.data.data.item;
        setItem(item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [pathname, search]);

  return (
    <div className="fixed md:absolute top-0 left-0 h-full w-full bg-white z-50 md:pt-20 md:pl-14">
      {loading && <LoadingSpinner style={{ color: "#afafaf" }} />}
      {item && !loading && (
        <>
          <i
            className="fa-solid fa-x text-xl text-gray-400 cursor-pointer absolute top-5 right-5"
            onClick={closeItemPage}
          />
          <div className="px-4 md:px-0 h-full w-full md:h-3/4 flex flex-col md:flex-row justify-center md:justify-start items-center md:items-end space-x-5">
            <div className="h-1/2 md:h-full w-full md:w-auto">
              <img
                className="h-full md:h-full w-full object-cover"
                src={item.image}
                alt={item.description}
              />
            </div>
            <div className="pt-8 text-center md:text-start">
              <p className="text-xl">{item.description}</p>
              <p className="text-lg font-bold tracking-wide">
                ${item.price}.00 USD
              </p>
              <AddToCart item={item} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreItem;
