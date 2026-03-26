import React, { useContext, useState, useEffect } from 'react';
import ShopContext from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const location = useLocation();
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  // Update visibility based on route
  useEffect(() => {
    const isAdmissionPage = location.pathname.includes("/admission");
    setVisible(isAdmissionPage);

    // Reset showSearch based on route on reload
    if (!isAdmissionPage) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [location.pathname, setShowSearch]);

  if (!showSearch || !visible) return null;

  return (
    <div className='border-t text-center py-4'>
      {/* Search Box */}
      <div className='inline-flex items-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input
          type="text"
          placeholder='search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 outline-none bg-inherit text-sm'
        />
        <button type="button" onClick={() => setShowSearch(false)}>
          <img src={assets.search_icon} alt="search" className="w-4 h-4 cursor-pointer" />
        </button>
      </div>

      {/* Close Button */}
      <button type="button" onClick={() => setShowSearch(false)}>
        <img src={assets.cross_icon} alt="Close" className="w-4 h-4 cursor-pointer inline-block" />
      </button>
    </div>
  );
};

export default Searchbar;
