import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import LoadingSpinner from "../../UI/LoadingSpinner";

const ImageOverlay = ({ closeOverlay }) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(null);

  // Getting search from the url to use for fethcing the image from the DB in useEffect
  const { search } = useLocation();

  // Animation for the container around the image that will fire when the image is loaded and loading is false
  const anim = useSpring({
    from: { opacity: 0, display: "none" },
    to: { opacity: 1, display: "block" },
  });

  // Fetching the individual image from the DB and storing it in the image state. Once the image has been
  // received it will be rendered to the user
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Getting just the id from the search query
        const currentImg = search.split("=")[1];
        const response = await axios.get(
          `${process.env.REACT_APP_WEB_HOST}/api/v1/images/${currentImg}`
        );
        const image = response.data.data.image.image;
        setImage(image);
      } catch (err) {
        console.err(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);

  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-10 flex justify-center items-center">
      {/* Overlay */}
      <animated.div
        className="absolute h-full w-full bg-white md:bg-overlayLight duration-100"
        style={anim}
        onClick={closeOverlay}
      ></animated.div>
      <animated.i
        className="fa-solid fa-x absolute top-5 right-5 text-xl font-bold text-gray-400 cursor-pointer z-20 duration-100"
        style={anim}
        onClick={closeOverlay}
      />
      {loading && <LoadingSpinner style={{ color: "#303030" }} />}
      {/* Image that is fetched from the DB that will be rendered */}
      {!loading && (
        <animated.div
          style={anim}
          className="md:h-9/10 p-4 px-4 md:p-12 bg-white z-20 duration-100"
        >
          <img className="h-auto md:h-full w-full" src={image} alt={""} />
        </animated.div>
      )}
    </div>
  );
};

export default ImageOverlay;
