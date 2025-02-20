import React, { useState } from 'react'
import "./Home.css" 
import Header from '../../component/Header/Header'
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </>
  )
}

export default Home