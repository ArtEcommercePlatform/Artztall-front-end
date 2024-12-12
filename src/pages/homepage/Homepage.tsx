import ArtsCollection from "../../components/ArtsCollection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Newsletter from "../../components/Newsletter";
import react from "react";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ArtsCollection />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Homepage;
