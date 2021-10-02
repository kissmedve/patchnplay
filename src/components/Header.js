import React from "react";

const Header = ({ children }) => {
  return (
    <>
      <header id="header">
        <div className="wrapper">
          <div className="navbar">
            <section id="logo">
              <a href="/">
                <img src="patchnplay_logo-4.svg" alt="PatchNPlay" />
              </a>
            </section>
            <section id="topnav">
              {children}
            </section>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;