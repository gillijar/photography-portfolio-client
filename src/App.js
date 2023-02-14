import { Routes, Route } from "react-router-dom";
import PageLayout from "./components/UI/PageLayout";
import ImageContainer from "./components/Pages/Images/ImageContainer";
import AboutMe from "./components/Pages/AboutMe";
import Store from "./components/Pages/Store/Store";
import Auth from "./components/Pages/Auth/Auth";
import Dashboard from "./components/Pages/Auth/Dashboard";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<ImageContainer />} />
        <Route path=":category" element={<ImageContainer />} />
        <Route path="about-me" element={<AboutMe />} />
        <Route path="store" element={<Store />} />
        <Route path="auth" element={<Auth />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
