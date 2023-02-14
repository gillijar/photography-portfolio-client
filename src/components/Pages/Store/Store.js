import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../UI/LoadingSpinner";
import StoreItem from "./StoreItem";
import Cart from "../../UI/Cart/Cart";

const Shop = () => {
  const [loading, setLoading] = useState(null);
  const [items, setItems] = useState([]);
  const [viewingItem, setViewingItem] = useState(false);
  const { pathname } = useLocation();

  // Fetching all of the available store items from the DB. These will then be stored in items then mapped
  // over and rendered to the user
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_WEB_HOST}/api/v1/store`
        );
        const items = response.data.data.items;
        setItems(items);
      } catch (err) {
        console.error(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    })();
  }, []);

  // Function for toggling the state of the item page. If true an overlay will appear with the item details and
  // the option to add the item to the cart
  const toggleItemPage = () => {
    setViewingItem((prevState) => !prevState);
  };

  // HTML for the item element that will be mapped over and rendered to the user
  const itemElement = (item) => {
    return (
      <Link
        to={`${pathname}?item=${item._id}`}
        className="h-min"
        key={item._id}
        onClick={toggleItemPage}
      >
        <div className="flex flex-col items-center h-min w-full space-y-1">
          <figure className="h-60 w-full rounded-3 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={item.image}
              alt=""
            />
          </figure>
          <figcaption className="text-sm">{item.description}</figcaption>
          <p className="text-md font-light">
            {`$${item.price}.`}
            <sup className="text-xxs">00</sup>
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {loading && <LoadingSpinner style={{ color: "#afafaf" }} />}
      {!loading && items && items.map((item) => itemElement(item))}
      {viewingItem && <StoreItem closeOverlay={toggleItemPage} />}
      <Cart />
    </div>
  );
};

export default Shop;
