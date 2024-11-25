import {ArrowRight } from 'lucide-react';
import Card from '../assets/components/card/Card';

const ArtsCollection = () => {
    const featuredArt = [
      { id: 1, title: "Abstract Dreams", artist: "Jane Doe", price: 299.99, isNew: true, imageUrl:'https://img.freepik.com/free-photo/enchanting-watercolor-fairy-illustration_23-2151557291.jpg?semt=ais_hybrid' },
      { id: 2, title: "Nature's Call", artist: "John Smith", price: 199.99, imageUrl:'https://w0.peakpx.com/wallpaper/237/899/HD-wallpaper-nature-painting-pretty-painting-art-nature.jpg' },
      { id: 3, title: "Urban Life", artist: "Alice Johnson", price: 399.99, isNew: true , imageUrl:'https://img.freepik.com/free-photo/man-practicing-rock-climbing-bouldering-wall-sports_23-2151724810.jpg?semt=ais_hybrid'},
      { id: 4, title: "Sunset Valley", artist: "Bob Wilson", price: 249.99 , imageUrl:'https://img.freepik.com/premium-photo/sunrise-sunset-dusk-orange-sunlight-forest-fields-landscape-wallpaper-background_911849-563140.jpg?semt=ais_siglip'}
    ];
  //test
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#094129]">Featured Artworks</h2>
            <button className="text-[#094129] font-semibold flex items-center hover:underline">
              View All
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArt.map((art) => (
              <Card key={art.id} {...art} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  

  export default ArtsCollection;