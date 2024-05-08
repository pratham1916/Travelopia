import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import video1 from "../images/1.mp4";
import video2 from "../images/2.mp4";
import video3 from "../images/3.mp4";
import video4 from "../images/4.mp4";
import card1 from "../images/card1.jpg";
import card2 from "../images/card2.jpg";
import card3 from "../images/card3.jpg";
import card4 from "../images/card4.jpg";

const HomePage = () => {
  const videoContent = [
    { video: video1, title: "Frozen Peaks", description: "Climb the towering peaks of icy mountains. Feel the thrill of reaching new heights where the air is fresh and views are exhilarating. It's not just a climb; it's an adventure." },
    { video: video2, title: "Wonderful", description: "Pack your bags and head out into the world, eager to explore new places and meet new faces. Each trip is a chance to make unforgettable memories, discover hidden gems, and enjoy life's simple pleasures." },
    { video: video3, title: "Mystic Forest", description: "Venture into the depths of our planet's forests. Discover the flora and fauna that make these landscapes unique. Let the serenity and majesty of the forest rejuvenate your spirit." },
    { video: video4, title: "Sandy Shores", description: "Walk along pristine beaches, feeling the sand between your toes and listening to the relaxing waves. It's a perfect escape to tranquility and peace." }
  ];

  const expertPicks = [
    { id: 1,image:card1},
    { id: 2,image:card2},
    { id: 3,image:card3},
    { id: 4,image:card4}
  ];

  const [activeContent, setActiveContent] = useState(videoContent[0]);
  const [loading, setLoading] = useState(true);

  const handleNavClick = (index:number):void => {
    setLoading(true);
    setActiveContent(videoContent[index]);
  };

  return (
    <>
      <section className="home">
        <video className={`video-slider ${!loading ? "loaded" : ""}`}
          src={activeContent.video} autoPlay muted loop onLoadedData={() => setLoading(false)}>
        </video>
        <div className={`content ${!loading ? "visible" : ""}`}>
          <h1>{activeContent.title}</h1>
          <p>{activeContent.description}</p>
          <Link className="createTrip" to='/createMyTrip'>Create my trip</Link>
        </div>
        <div className="media-icons">
          <Link className="icon" to="#"><i className="fa-brands fa-square-facebook"></i></Link>
          <Link className="icon" to="#"><i className="fa-brands fa-instagram"></i></Link>
          <Link className="icon" to="#"><i className="fa-brands fa-twitter"></i></Link>
        </div>
        <div className="slider-navigation">
          {videoContent.map((_, index) => (
            <div key={index} className="nav-btn" onClick={() => handleNavClick(index)}></div>
          ))}
        </div>
      </section>
      <section className="expert-picks">
        <div className="cards-container">
          {expertPicks.map(pick => (
            <div key={pick.id} className="card">
              <div className="card-content">
                <img src={pick.image} />
              </div>
            </div>  
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
