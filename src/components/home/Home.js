import React from "react";
import "./Home.css";

export const Home = () => {
  return (
    
    <div className="home-container">

      <div className="text-container">
        <h1>MUSIC KITTY</h1>
        <h2>FROM STRAY TO STAR</h2>

        <p>Welcome to Music Kitty! 🎵🐱</p>
        <p>Discover a unique blend of music and feline affection here at Music Kitty. 
            Our platform bridges the melodious world of music enthusiasts with the adorable realm of cat lovers. 
            Whether you're an aspiring musician seeking inspiration from our furry friends, or a cat aficionado with a penchant for beats and rhythms, 
            you've found your haven. Dive in to explore profiles, share your musical feline journey, and perhaps even adopt a melodious kitty. 
            Join our community where every purr is a note and every note tells a tale!</p>
      </div>

      {/* Bottom Container */}
      <div className="bottom-container">
        {/* Image Container */}
        <div className="image-container">
          <a href="/">
              <img src="https://i.imgur.com/9xAf1KU.jpg" alt="Music Kitty" />
          </a>
        </div>

        {/* Coffee Design */}
        <div className="container">
          <div className="coffee-header">
            <div className="coffee-header__buttons coffee-header__button-one"></div>
            <div className="coffee-header__buttons coffee-header__button-two"></div>
            <div className="coffee-header__display"></div>
            <div className="coffee-header__details"></div>
          </div>
          <div className="coffee-medium">
            <div className="coffe-medium__exit"></div>
            <div className="coffee-medium__arm"></div>
            <div className="coffee-medium__liquid"></div>
            <div className="coffee-medium__smoke coffee-medium__smoke-one"></div>
            <div className="coffee-medium__smoke coffee-medium__smoke-two"></div>
            <div className="coffee-medium__smoke coffee-medium__smoke-three"></div>
            <div className="coffee-medium__smoke coffee-medium__smoke-for"></div>
            <div className="coffee-medium__cup"></div>
          </div>
          <div className="coffee-footer"></div>
        </div>
      </div>

    </div>
  );
};
