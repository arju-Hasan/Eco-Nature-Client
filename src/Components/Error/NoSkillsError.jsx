import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router";
import Noimg from "../../assets/img/active.png";
import { useEffect } from 'react';




const NoSkillsPage = ({setSearch}) => {


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center bg-primary">
        <div className="text-center">
          <img 
           data-aos="zoom-in"
            // className="animate__animated animate__fadeIn"
            className="h-40 md:h-60 lg:h-80 lx-h-100 w-60 md:w-80 lg:w-100 lx-w-120 mb-10 rounded-full animate__animated animate__pulse animate__infinite"
          src={Noimg} alt="" />
          <p className="text-white text-3xl font-bold mb-4"> No Skills Found</p>
          <p className="text-white text-lg mb-6">
            Sorry, we couldn't find any skills matching your search.
          </p>
          <Link
            onClick={() => setSearch("")}
            className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            Browse All Skills
          </Link>
        </div>
      </main>     
    </div>
  );
};

export default NoSkillsPage;
