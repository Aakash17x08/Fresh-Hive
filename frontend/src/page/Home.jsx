import React from 'react'
import Navbar from '../components/Navbar'
import BannerHome from '../components/BannerHome'
import ItemsHome from '../components/ItemsHome'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            
            <ItemsHome/>
            <Footer/>
        </>
    )
}

export default Home