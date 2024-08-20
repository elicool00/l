import React from "react";
import { Link } from "react-router-dom";
import heroBg from "../../images/hero-bg.png"
import sliderImg from "../../images/slider-img.png"
import { t } from "../../Translate/Translate";

function Slider(props){
    return (
        <div className="hero_area">
            {/* <div className="hero_bg_box">
                <div className="bg_img_box">
                    <img src={heroBg} alt=""/>
                </div>
            </div> */}
            <section className="slider_section">
                <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="detail-box">
                                            <h1>
                                            {t('send')} <br/>
                                            {t('b_emails')}
                                            </h1>
                                            <p>
                                            {t('right_place')}
                                            </p>
                                            <div className="btn-box">
                                            {(props.user.data) ? (
                                                <Link to="/dashboard" className="btn1">{t('get_started')}</Link>
                                            ) : (
                                                <Link to="/auth/register" className="btn1">{t('get_started')}</Link>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box">
                                            <img src={sliderImg} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Slider
