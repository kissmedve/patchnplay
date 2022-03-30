import React from "react";

const Header = ({ children }) => {
  return (
    <>
      <header id="header">
        <div className="navbar">
          <section id="logo">
            <a href="/">
              <img src="patchnplay_logo-4.svg" alt="PatchNPlay" />
            </a>
          </section>
          {children}
        </div>
      </header>
    </>
  );
};

export default Header;
