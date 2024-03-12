import React from 'react'
import Menu from './Menu'
import FotoTexto from './FotoTexto'
import Footer from './Footer'

const Home = () => {
    return (
        <>
            <Menu />
            <div id="home">
                <div className="container">
                    <div className="row">
                        <FotoTexto />
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Home