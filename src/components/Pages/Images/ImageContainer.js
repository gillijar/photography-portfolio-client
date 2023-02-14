import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../UI/LoadingSpinner";
import ImageOverlay from "./ImageOverlay";

const ImageContainer = () => {
  const [imageOverlayOpen, setImageOverlayOpen] = useState(false);
  // Images reveiced from fetchData will be stored here and then mapped over to display the images to the user
  const [imgArr, setImgArr] = useState([]);
  const [loading, setLoading] = useState(null);

  // Declaring the body variable for use in the open and close functions for the image overlay
  const { body } = document;

  // Getting the category from the url to use for fetching the photos associated with the current parameter.
  // Pathname is for navigating back to the previous url so that the img query isn't still visible when
  // no individual image is currently present on the screen
  let { category } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // If no parameter of category is present it will be set to spotlight by default. This is for when the page loads
  // or the url has no parameter, it will display images right away before navigating to any sub categories
  if (!category) category = "spotlight";

  // When the category is changed the function will run and return the correct category. This is mainly for
  // when the user changes the category with the nav links. Navigation.js
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/categories/${category}`
        );
        const { images } = response.data.data.category;
        // Reversing the order of the array so that the most recently added images appear at the top of the page
        images.reverse();
        setImgArr(images);
      } catch (err) {
        console.error(err.message);
      } finally {
        // 750ms timeout implemented so that all of the images will have time to load before rendering to the screen.
        // This is strictly for creating a prettier UI
        setTimeout(() => {
          setLoading(false);
        }, 750);
      }
    })();
  }, [category]);

  // Everytime the pathname changes the function will run and reset the page at the top so that the user can
  // always view a new category from the beginning
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // When the user selects an image they want to view individually this function will run and set the image
  // state to the image's target id, then it will set the image overlay to it's respective state
  const openImageOverlay = () => {
    setImageOverlayOpen(true);

    // Setting the body's overflow property to hidden so that the screen can't scroll when the user has an
    // image open in the image overlay
    body.style.overflowY = "hidden";
  };

  // Function used to close the overlay and navigate back to the previous url. It is used as a prop for
  // the ImageOverlay component
  const closeImageOverlay = () => {
    setImageOverlayOpen(false);
    navigate(pathname);

    // Setting the body's overflow property to nothing so that when the user closes the image overlay the
    // screen will now be able to scroll freely again
    body.style.overflowY = "";
  };

  // Image HTML to be returned when mapping over all of the images in the JSX code
  const imageElement = (img, i) => {
    return (
      <div className="mb-3 md:mb-4 cursor-pointer relative" key={i}>
        <img className="w-full rounded-3" src={img.image} alt="pics" />
        {/* Overlay */}
        <Link to={`${pathname}?img=${img._id}`}>
          <div
            className="rounded-3 flex justify-center items-center absolute h-full w-full top-0 left-0 bg-overlayDark opacity-0 md:hover:opacity-100 transition-all duration-400"
            onClick={openImageOverlay}
          >
            <i className="fa-solid fa-magnifying-glass text-white text-lg"></i>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      {loading && <LoadingSpinner style={{ color: "#afafaf" }} />}
      {!loading && (
        <div className="sm:columns-2 lg:columns-3 md:gap-4 pb-20">
          {imgArr.map((img, i) => imageElement(img, i))}
          {imageOverlayOpen && (
            <ImageOverlay closeOverlay={closeImageOverlay} />
          )}
        </div>
      )}
    </>
  );
};

export default ImageContainer;
