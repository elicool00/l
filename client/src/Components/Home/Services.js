import React from "react";
import S1 from "../../images/s1.png"
import S2 from "../../images/s2.png"
import S3 from "../../images/s3.png"
import { t } from "../../Translate/Translate"

function Services(){
    return(
        <section className="service_section layout_padding">
            <div className="service_container">
            <div className="container ">
                <div className="heading_container heading_center">
                <h2>
                    {t('services_title')[0]} <span>{t('services_title')[1]}</span>
                </h2>
                <p>{t('many_services')}</p>
                </div>
                <div className="row flex-grow-1 align-items-stretch">
                    <div className="col-md-4 ">
                        <div className="box ">
                        <div className="img-box">
                            <img src={S1} alt="Email lists"/>
                        </div>
                        <div className="detail-box">
                            <h5>
                                {t('lists_s')}
                            </h5>
                            <p>{t('lists_services')} </p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="box ">
                        <div className="img-box">
                            <img src={S2} alt="Scheduler"/>
                        </div>
                        <div className="detail-box">
                            <h5>
                                {t('schedule_s')}
                            </h5>
                            <p>
                                {t('schedule_services')}
                            </p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="box ">
                        <div className="img-box">
                            <img src={S3} alt="Templates"/>
                        </div>
                        <div className="detail-box">
                            <h5>
                                {t('templates_s')}
                            </h5>
                            <p>
                                {t('templates_services')}
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

export default Services
