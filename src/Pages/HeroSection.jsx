import React from 'react';
import MyContainer from '../provider/MyContainer';
import ActiveImg from "../assets/img/Active-Challenges.webp"
import ParticipantsImg from "../assets/img/active.png"
import finishImg from "../assets/img/finish.png"

const HeroSection = () => {
    return (
        <div>
            <MyContainer >
            <h2 className='text-2xl font-semibold text-primary text-center p-4'>Live Challenghe and activity</h2>
            <div className='flex justify-center items-center gap-4 p-4 '>
            <div className="border-2 hover:bg-base-200 border-primary hover:border-secondary rounded-2xl flex justify-center items-center gap-4 p-4 text-primary hover:text-secondary">
                <img className='h-30 w-30 rounded-full ' src={ActiveImg} alt="active challenges image" />
                <span className='text-5xl  font-bold'>17</span>
                <p className=' font-semibold'>Active Challenges</p>
            </div>
            <div className="border-2 hover:bg-base-200 border-primary hover:border-secondary rounded-2xl flex justify-center items-center gap-4 p-4 text-primary hover:text-secondary">
                <img className='h-30 w-30 rounded-full ' src={ParticipantsImg} alt="active challenges image" />
                <span className='text-5xl  font-bold'>370</span>
                <p className=' font-semibold'>Total Participants</p>
            </div>
            <div className="border-2 hover:bg-base-200 border-primary hover:border-secondary rounded-2xl flex justify-center items-center gap-4 p-4 text-primary hover:text-secondary">
                <img className='h-30 w-30 rounded-full ' src={finishImg} alt="active challenges image" />
                <span className='text-5xl  font-bold'>57</span>
                <p className=' font-semibold'>finish challenge</p>
            </div>
            </div>
            </MyContainer>
        </div>
    );
};

export default HeroSection;