import React from 'react'
import c from './Landing.module.scss'
import landing from 'assets/images/landing.jpg'
import { Link } from 'react-router-dom'
import { UrlPaths } from 'constants/AppConstants'


const Landing: React.FC = () => {
    
    return (
        <div className={c.block}>
            <img className={c.landing} src={landing} alt="landing" />
            <div className={c.content}>
                <h1 className={c.title}>
                    <span className={c.yellow}>самый уютный каток</span> 
                    <br /> в городе Уральск!
                </h1>
                <p className={c.text}>
                    Погрузитесь в волшебную атмосферу нашего катка, где вас ждут <br />
                    незабываемые моменты на льду. Независимо от того, вы профессионал <br /> 
                    или начинающий, у нас найдется что-то особенное для каждого.
                </p>
                <Link to={UrlPaths.TICKET}>
                    <button className={c.button}>КУПИТЬ БИЛЕТ</button>
                </Link>
            </div>
        </div>
    )
}


export default Landing
