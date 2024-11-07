import ArtsCollection from "../../components/ArtsCollection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Newsletter from "../../components/Newsletter";
// import ArtCard from "../../components/ArtCard";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ArtsCollection />
      <Newsletter />
      <Footer />
      {/* <div className="w-[22vw] h-[65vh]"> 
      <ArtCard image={"https://img.freepik.com/free-photo/enchanting-watercolor-fairy-illustration_23-2151557291.jpg?semt=ais_hybrid"} artName={"bla bla"} artistName={"SenjU"} price={"$ 12500"} medium={"Digital"} framed={"Framed"} orientation={"Landscape"} artStyle={"Abstract"}/>
      </div> */}
    </div>
  );
};

export default Homepage;
