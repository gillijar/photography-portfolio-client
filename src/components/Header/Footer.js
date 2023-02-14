const Footer = () => {
  return (
    <footer className="md:p-0 text-center md:text-left space-y-3 px-6">
      <div className="space-x-8 md:space-x-3 text-2xl md:text-xs">
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-twitter"></i>
        <i className="fa-solid fa-share"></i>
      </div>
      <p className="text-sm md:text-xxs text-gray-300 md:w-full xl:w-3/4 tracking-widest leading-1 md:leading-3">
        Design by Lauren Naylor. This was created as a web development portfolio
        piece. Does not generate profit. I don't own any rights to the
        photographs.
      </p>
    </footer>
  );
};

export default Footer;
