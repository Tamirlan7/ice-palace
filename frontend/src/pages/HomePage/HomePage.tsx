import React from "react";
import c from './HomePage.scss'
import Landing from "components/Landing/Landing";
import LandingSessions from "components/LandingSessions/LandingSessions";


const HomePage: React.FC = () => {

    console.log('home page')

    return (
        <div className={c.main}>
            <Landing />
            <LandingSessions />
        </div>
    )
}

export default HomePage;
