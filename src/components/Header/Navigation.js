import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import axios from "axios";
import Footer from "./Footer";

const Navigation = ({ navOpenStatus, closeNav }) => {
  // Sub list var for the work link that will display all the categories if set to true
  const [subListPresent, setSubListPresent] = useState(false);
  const [categories, setCategories] = useState([]);

  // Active class name for active NavLinks
  let activeClassName = {
    textDecoration: "underline",
  };

  const toggleSubList = () => {
    setSubListPresent((prevState) => !prevState);
  };

  // Mobile animation for showing the nav based on the prop "navOpenStatus"
  const anim = useSpring({
    translateX: navOpenStatus ? "100%" : "0%",
  });

  // Fetching all of the categories for the work nav link from the api and storing them in a variable to be mapped over
  // and then displayed to the user on the screen
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/categories"
        );
        const categoriesArr = response.data.data.categories;

        // Finding the spotlight category and removing it from our array so that it won't appear in the nav links. The reason
        // for this is that spotlight will be the default images on page load or when the url has no parameters.
        const spotlight = categoriesArr.find(
          (element) => element.category === "Spotlight"
        );
        const spotlightIndex = categoriesArr.indexOf(spotlight);
        // Making sure the object is actually present and splicing the array only if the condition is met
        if (spotlightIndex > -1) categoriesArr.splice(spotlightIndex, 1);

        // Storing the state of our final mutated array in the categories variable
        setCategories(categoriesArr);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  // If window width returns true it sets var to true to open sub list and remove chevrons. Also has a constant listener
  // for resizing so that the nav will be correctly displayed on different viewports
  useEffect(() => {
    if (window.innerWidth < 770) setSubListPresent(true);

    window.addEventListener("resize", () => {
      if (window.innerWidth < 770) setSubListPresent(true);
      if (window.innerWidth > 770) {
        // When screen width is greater than 770 the sub list will collapse and the nav will close. This is an edge case
        // for if the user has certain UI elements in a certain state. Resets some UI back to normal
        setSubListPresent(false);
        closeNav();
      }
    });
  }, [closeNav]);

  // Determining the direction of the chevron in the "Work" link based on the state of subListPresent
  const chevronDirection = () => {
    if (!subListPresent) {
      return (
        <i
          className="fa-solid fa-chevron-down text-xxs ml-1.5 cursor-pointer"
          onClick={toggleSubList}
        ></i>
      );
    } else {
      return (
        <i
          className="fa-solid fa-chevron-up text-xxs ml-1.5 cursor-pointer"
          onClick={toggleSubList}
        ></i>
      );
    }
  };

  return (
    <animated.nav className="flex-1 w-full md:ml-0" style={anim}>
      <div className="absolute top-0 right-0 h-full w-15 bg-overlayLight md:hidden text-center">
        <i
          className="fa-solid fa-x mt-4 font-bold text-2xl"
          onClick={closeNav}
        />
      </div>
      <div className="px-10 py-12 md:py-0 md:px-0 space-y-12 bg-white w-8/10 h-full">
        <ul className="text-2xl md:text-sm space-y-4 md:space-y-2">
          <div className="flex items-center">
            <li
              className="w-max cursor-pointer hover:underline"
              onClick={closeNav}
            >
              <NavLink
                to="/"
                // style={({ isActive }) =>
                //   isActive ? activeClassName : undefined
                // }
              >
                Work
              </NavLink>
            </li>
            {window.innerWidth > 770 && chevronDirection()}
          </div>
          {subListPresent && (
            <ul className="ml-4 my-1.5 text-2xl md:text-sm space-y-4 md:space-y-1 font-light">
              {categories &&
                categories.map((category) => (
                  <li
                    key={category._id}
                    className="w-max cursor-pointer hover:underline"
                    onClick={closeNav}
                  >
                    {/* create a slug for the NavLink */}
                    <NavLink
                      to={category.endpoint}
                      style={({ isActive }) =>
                        isActive ? activeClassName : undefined
                      }
                    >
                      {category.category}
                    </NavLink>
                  </li>
                ))}
            </ul>
          )}
          <li
            className="w-max cursor-pointer hover:underline"
            onClick={closeNav}
          >
            <NavLink
              to="/about-me"
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
            >
              About Me/Contact
            </NavLink>
          </li>
          <li
            className="w-max cursor-pointer hover:underline"
            onClick={closeNav}
          >
            <NavLink
              to="/store"
              style={({ isActive }) => (isActive ? activeClassName : undefined)}
            >
              Store
            </NavLink>
          </li>
        </ul>
        <Footer />
      </div>
    </animated.nav>
  );
};

export default Navigation;
