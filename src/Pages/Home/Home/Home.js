import React from 'react';
import Books from '../../Header/Books/Books';
import AboutUs from '../../Header/AboutUs/AboutUs';
import Banner from '../../Header/Banner/Banner';
import Status from '../../Header/Status/Status';
import OurTeam from '../../Header/OurTeam/OurTeam';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <Books></Books>
            <Status></Status>
            <OurTeam></OurTeam>
        </div>
    );
};

export default Home;