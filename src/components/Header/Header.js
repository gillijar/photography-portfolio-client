import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Header = () => {
  // State for mobile nav toggling open and close
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen((prevState) => !prevState);
  };

  const closeNavOnResize = () => {
    setNavOpen(false);
  };

  return (
    <div className="w-full h-full z-10 -translate-x-full md:translate-x-0 bg-white md:w-3/12 xl:w-1/6 md:py-20 md:pl-6 lg:pl-10 xl:pl-12 fixed">
      <header className="md:space-y-12 flex flex-col h-full">
        <div className="translate-x-full md:translate-x-0 bg-white uppercase font-bold flex items-center md:items-start justify-center md:justify-start p-4 md:p-0">
          <Link to="/">
            <h1 className="tracking-extraWide md:tracking-widest text-4xl md:text-2xl cursor-pointer">
              Artistname
            </h1>
          </Link>
          {!navOpen && (
            <i
              className="fa-solid fa-bars ml-4 text-3xl absolute right-6 md:right-8 md:hidden"
              onClick={toggleNav}
            />
          )}
        </div>
        <Navigation navOpenStatus={navOpen} closeNav={closeNavOnResize} />
      </header>
      <Link
        to="/auth"
        className="absolute bottom-5 left-2/4 -translate-x-1/2 underline text-sm"
      >
        Own this website?
      </Link>
    </div>
  );
};

export default Header;
