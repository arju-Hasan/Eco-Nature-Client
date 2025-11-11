import { useEffect, useState } from "react";
import MyContainer from "../provider/MyContainer";
import Loading from "../Components/Loader/Loading";
import { Link } from "react-router";
import NoSkillsError from "../Components/Error/NoSkillsError";
import { Search } from 'lucide-react';
import { FaStar } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ActiveChallenges = () => {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/Skill-Data.json")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching challenges", err));
  }, []);
  useEffect(() => {
  AOS.init({ duration: 800, once: true });
}, []);
  
 const filteredSkills = skills.filter((skill) =>
  skill.skillName.toLowerCase().includes(search.toLowerCase()) ||
  skill.description.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="bg-base-100 pt-0">
      <div className="bg-base-100">
     <div className="flex flex-col sm:flex-row justify-between items-center container mx-auto">
      <h3 className="text-2xl font-bold ml-4 p-4 text-center hidden md:block">
    Active Challenge
        </h3>

     {/* search */}
        <div className="relative m-2 text-center w-full sm:w-auto md:px-20 flex justify-center sm:justify-end">
      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-[80%] mx-auto sm:w-62 md:w-86 px-6 py-2 pr-10 rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <Search className="absolute right-17 md:right-23 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
       </div>
      </div>
      </div>
      <MyContainer>
        <section className="">
          <div className="container mx-auto px-4">
  
            {skills.length === 0 ? (
              <Loading />
            ) : filteredSkills.length === 0 ? (
             <NoSkillsError setSearch={setSearch}></NoSkillsError>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <div key={skill.skillId} 
                  data-aos={index % 2 === 0 ? "fade-up" : "fade-right"}
                  className="card bg-white shadow-xl">
                    <div className="card-body">
                      <img
                        src={skill.image}
                        alt={skill.skillName}
                        className="w-full h-60 object-cover mb-4 rounded-xl transform transition-transform duration-700 ease-in-out hover:scale-110"
                      />
                      <h4 className="card-title text-primary">
                        {skill.skillName}
                      </h4>
                      <p>{skill.description}</p>
                      <p className="text-sm text-accent">
                        Provider: {skill.providerName}
                      </p>
                      <p className="text-sm text-accent">
                        Price: ${skill.price}
                      </p>
                      <p className="text-sm text-accent flex justify-start items-center gap-2">
                        Rating: {skill.rating} <FaStar className='text-primary' />
                      </p>
                      <p className="text-sm text-accent">
                        Slots Available: {skill.slotsAvailable}
                      </p>
                      <div className="card-actions justify-end">
                        <Link
                          to={`/skills/${skill.skillId}`}
                          className="text-primary font-semibold btn cursor-pointer hover:underline"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </MyContainer>
    </div>
  );
};



export default ActiveChallenges;