import React from "react";
import { Link } from "react-router-dom";
import { t } from "../Translate/Translate";


function Footer(){
    return (
        <div>
        <section className="info_section layout_padding2">
            <div className="container">
            <div className="row">
                <div className="col-md-6 col-lg-3 info_col">
                    <div className="info_contact">
                        <h4>Info</h4>
                        <div className="contact_link_box">
                            <a href="tel://212639109957">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                <span>+212-639109957</span>
                            </a>
                            <a href="https://t.me/Elh98ayoub">
                                <i className="fas fa-paper-plane" aria-hidden="true"></i>
                                <span>+380-955072544</span>
                            </a>
                            <a href="mailto:support@laramailer.com">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                <span>support@laramailer.com</span>
                            </a>
                        </div>
                    </div>
                    <div className="info_social">
                        <a href="https://www.facebook.com/elhaddadi.a" target="_blank">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/" target="_blank">
                            <i className="fa fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="https://www.instagram.com/elh_ayoub_/" target="_blank">
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                        <a href="https://github.com/Elh-Ayoub/" target="_blank">
                            <i className="fa fa-github" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3 info_col">
                    <div className="info_detail">
                        <h4>{t('about')}</h4>
                        <p>
                            {t('small_about')}
                        </p>
                        <Link to="/about" className="">
                        {t('read')} &raquo;
                        </Link>
                    </div>
                </div>
                <div className="col-md-6 col-lg-2 mx-auto info_col">
                    <div className="info_link_box">
                        <h4>{t('links')}</h4>
                        <div className="info_links">
                        <Link to="/" className="">
                            Home
                        </Link>
                        <Link to="/about" className="">
                            {t('about')}
                        </Link>
                        <Link to="/contact-us" className="">
                            {t('contact')}
                        </Link>
                        <Link to="/documentation" className="">
                            Documentation
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
        <section className="footer_section">
            <div className="container">
                <p>
                    &copy; <span id="displayYear">{new Date().getFullYear()}</span> All Rights Reserved By 
                    <a className="text-info" href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/"> Ayoub El-Haddadi</a>
                </p>
            </div>
        </section>
        </div>
    )
}

export default Footer
