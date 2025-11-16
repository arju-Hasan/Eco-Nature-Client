import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen border-2 border-red-500'>
            <Navbar />
            <div className='flex-1'>
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Root;