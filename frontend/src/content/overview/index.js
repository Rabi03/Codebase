import React from 'react';
import {useNavigate} from 'react-router-dom'


function Overview() {
    const navigate = useNavigate()

  return (
    <div id="landing" className="landing">
        <header className="l-header">
            <nav className="nav bd-grid">
                <div>
                    <a href="#" className="nav__logo">Codebase</a>
                </div>
                
                <div className="nav__toggle" id="nav-toggle">
                    <i className='bx bx-menu'></i>
                </div>

                <div className="nav__menu" id="nav-menu">
                    <div className="nav__close" id="nav-close">
                        <i className='bx bx-x'></i>
                    </div>

                    <ul className="nav__list">
                        <li className="nav__item"><a href="#home" className="nav__link active">Home</a></li>
                        <li className="nav__item"><a href="#about" className="nav__link">About</a></li>
                        <li className="nav__item"><a href="#skills" className="nav__link">Blog</a></li>
                        <li className="nav__item"><a href="#contact" className="nav__link">Contact</a></li>
                    </ul>
                </div>
            </nav>
        </header>

        <main className="l-main">
            <section className="home" id="home">
                <div className="home__container bd-grid">
                    <div className="home__img">
                        <img src="static/images/overview/group.png" alt="" width="600" height="400"/>
                    </div>

                    <div className="home__data">
                        <h2 className="home__title">Online Coding &<br/> Programming Lessons </h2>
                        <p className="home__description">Let's help each other by learning and teaching.</p>
                        <a href="" className="home__button" onClick={()=>navigate('/home')}>Get Started</a>
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
}

export default Overview;
