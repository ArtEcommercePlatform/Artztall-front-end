import ArtsCollection from "../../components/ArtsCollection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Newsletter from "../../components/Newsletter";
import ArtCard from "../../components/ArtCard";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ArtsCollection />
      <Newsletter />
      <Footer />
      <div className="w-[20vw] h-[55vh] m-5"> 
      <ArtCard image={"https://img.freepik.com/free-photo/enchanting-watercolor-fairy-illustration_23-2151557291.jpg?semt=ais_hybrid"} artName={"Nero Anime Drawing"} artistName={"SenjU"} price={"$12500"} medium={"Digital"} framed={"Framed"} orientation={"Landscape"} artStyle={"Abstract"}/>
      </div>
    </div>
  );
};

export default Homepage;
