import Header from "../Header/Header";

const PageLayout = (props) => {
  return (
    <div>
      <Header />
      <div className="pt-20 px-6 md:pr-12 h-screen right-0 absolute w-full md:w-9/12 xl:w-5/6">
        {props.children}
      </div>
    </div>
  );
};

export default PageLayout;
