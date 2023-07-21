import React, { useRef,useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideNavContent from './SideNavContent';
import { motion } from 'framer-motion';

const HeaderBottom = () => {
  const ref=useRef();
  const [sidebar, setSideBar] = useState(false);
  // console.log(sidebar);
  useEffect(()=>{
    document.body.addEventListener("click",(e)=>{
      if(e.target.contains(ref.current)){
        setSideBar(false);
      }
      // console.log(e.target.contains(ref.current));
    })
  },[ref,sidebar])
  return (
    <div className='w-full px-2 h-[36px] bg-amazon_light text-white flex items-center'>
      {/* Items start  */}
      <ul className='flex items-center gap-2 text-sm tracking-wide'>
        <li onClick={() => setSideBar(true)} className='headerHover h-8 mt-1 flex items-center gap-1'><MenuIcon />All</li>
        <li className='headerHover h-8 mt-1'>Amazon miniTV</li>
        <li className='headerHover h-8 mt-1'>Sell</li>
        <li className='headerHover h-8 mt-1'>Best Seller</li>
        <li className='headerHover h-8 mt-1'>Today's Deals</li>
        <li className='headerHover h-8 mt-1'>Mobiles</li>
        <li className='headerHover h-8 mt-1'>New Releases</li>
      </ul>
      {/* items end  */}
      {/* SideNavContent Start  */}
      {sidebar && (
        <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50'>
          <div className='w-full h-full relative'>
            <motion.div ref={ref} initial={{x:-500,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:.5}} className='w-[350px] h-full bg-white border border-black'>
              <div className='w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4'>
                <AccountCircleIcon />
                <h3>Hello, Sign In</h3>
              </div>
              <SideNavContent
                title="Trending"
                one="Best Sellers"
                two="New Releases"
                three="Movers and Shakers"
              />
              <SideNavContent
                title="Digital Content And Devices"
                one="Echo & Alexa"
                two="Fire TV"
                three="Kindle E-Readers & eBooks"
              />
              <SideNavContent
                title="Shop By Category"
                one="Mobiles, Computers"
                two="TV, Appliances, Electronics"
                three="Men's Fashion"
              />
              <span onClick={() => setSideBar(false)} className='cursor pointer absolute top-0 left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300'><CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}

      {/* SideNavContent End */}
    </div>
  )
}

export default HeaderBottom