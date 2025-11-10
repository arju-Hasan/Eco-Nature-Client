import { Outlet, useNavigate } from 'react-router';


import { ToastContainer } from 'react-toastify';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Loader from '../Components/Loader/Loading';

const Root = () => {
    const {state} =useNavigate()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {state == "loding"? <Loader /> : <Outlet />}
        
      </div>
      <Footer />
       
    </div>
  );
};

export default Root;
