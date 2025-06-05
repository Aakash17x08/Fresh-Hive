import React from 'react'
import Navbar from '../components/Navbar'
import BannerHome from '../components/BannerHome'
import ItemsHome from '../components/ItemsHome'

const Home = () => {
    return (
        <>
            <Navbar />
            <BannerHome/>
            <ItemsHome/>
        </>
    )
}

export default Home