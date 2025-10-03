import React from 'react'
import Header from '../components/home/Header'
import HeroSection from '../components/home/HeroSection'
import CardContainerCategory from '../components/home/CardcontainerCatecogy'
import LatestProductsCarousel from '../components/home/LatestProductsCarousel'
const Homepage = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <LatestProductsCarousel/>
      <CardContainerCategory/>
      

    </div>
  )
}

export default Homepage
