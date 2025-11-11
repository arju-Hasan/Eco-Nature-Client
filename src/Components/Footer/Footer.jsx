import React from 'react';
import MyContainer from '../../provider/MyContainer';
import { Link } from 'react-router';

const Footer = () => {
    return (<>
        <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4 flex justify-center items-center ">
   
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ECO-Nature Ltd</p>
    <span>
        <p>Devloper by <Link to="https://github.com/arju-Hasan"><span className='text-[#001aff]'>Arju-Hasan</span></Link></p>
    </span>

  
</footer>
</>
       
    );
};

export default Footer;