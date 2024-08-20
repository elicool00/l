import React from "react";


function Footer(){
    return(
        <footer className="dashboard-footer">
            <section className="footer_section">
            <div className="container">
                <p>
                    &copy; <span id="displayYear">{new Date().getFullYear()}</span> All Rights Reserved By 
                    <a className="text-info" href="https://www.linkedin.com/in/ayoub-el-haddadi-590b99219/"> Ayoub El-Haddadi</a>
                </p>
            </div>
        </section>
        </footer>
    )
}

export default Footer
