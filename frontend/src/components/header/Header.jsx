import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate()
    const darkmode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark")
    }
    const lightmode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
    }
    const theme = (e) => {
        if (e.target.checked) {
            darkmode()
        }
        else {
            lightmode()
        }
    }
    const logout = () => {
        localStorage.clear()
        navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <a className="navbar-brand mt-2 mt-lg-0" >
                            <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height={15} alt="MDB Logo" loading="lazy" />
                        </a>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => theme(e)} />

                        </div>
                        <a className="link-secondary me-3" onClick={logout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header