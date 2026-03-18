import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Background from "./components/Background";

import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Works from "./sections/Works";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

import ContentWriting from "./pages/ContentWriting";
import Paintings from "./pages/Paintings";
import Photography from "./pages/Photography";
import AdminLogin from "./pages/AdminLogin";
import Certifications from "./pages/Certifications";
import SplashNotice from "./components/SplashNotice";

function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <About />
      <Experience />
      <Skills />
      <Works />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <SplashNotice />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/writing" element={<ContentWriting />} />
        <Route path="/paintings" element={<Paintings />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/certifications" element={<Certifications />} />
      </Routes>
    </Router>
  );
}

export default App;