import React from 'react';
import HeroSlider from '../Components/Home/HeroSlider';
import EcoStatusCards from "../components/Home/EcoStatusCards";
import useChallenges from '../Hooks/useChallenges';
import Loading from '../Pages/Loading';
import Error404 from '../Pages/Error404';
import ActiveChallenges from '../Components/Challenges/ActiveChallenges';
import RecentTips from '../Components/Home/RecentTips';
import UpcomingEvents from '../Components/Home/UpcomingEvents';
import WhyGoGreen from '../Components/Home/WhyGoGreen';
import HowItWorks from '../Components/Home/HowItWorks';
import Newsletter from '../Components/Newsletter';

const Home = () => {

        const { challenges, loading, error }  =useChallenges();
        if(loading){
        return <Loading/>;
       }
        if(error){
        return <Error404/>
       }
       const featuredchallenges = challenges.slice(0, 8);
       console.log(featuredchallenges)
    return (
        <div>
            <HeroSlider/>
            <EcoStatusCards/>
            <ActiveChallenges/>
            <RecentTips/>
            <UpcomingEvents/>
            <WhyGoGreen/>
            <HowItWorks/>
            <Newsletter/>
        </div>
    );
};

export default Home;


