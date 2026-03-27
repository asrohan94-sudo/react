import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import BestSeller from '../components/Bestseller'
import LatestCollection from '../components/LatestCollectons'



const Home = () => {
  return (
    <div>
      
      
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      
    </div>
  )
}

export default Home
