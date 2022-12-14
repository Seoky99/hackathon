import React from "react";
import "../styles/pagestyles/About.css";
import "../styles/pagestyles/Panels.css";
import showerhead from "../images/shower-head.jpeg";
import {
  BsFillArrowUpRightCircleFill,
  BsFillArrowDownRightCircleFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";

const About = () => {
  return (
    <>
      <h1 className="about-title">Showering and Sustainability</h1>

      <div className="intro-container">
        <div>
          <h3 className="intro-header">
            Nearly
            <span style={{ fontWeight: "bold", color: "red" }}>
              &nbsp; 1.2 trillion &nbsp;
            </span>
            gallons of water [are] used in the United States annually just for
            showering [1].
          </h3>
          <h4 className="intro-paragraph">
            According to a 2016 national study, the average shower lasts for
            around 8 minutes. Since a standard showerhead uses 2.5 gallons of
            water per minute, this is an average of 17 gallons of water used for
            showering per person per day [2].
            <br></br>
            <br></br>
            According to WebMD, you should aim to shower for 3 to 5 minutes.
            This means that an average person showers 3 to 5 minutes longer than
            is recommended. That is 7.5 to 12.5 gallons of water wasted! In
            fact, WebMD does not recommend showering for a long time because it
            can cause cracks in the skin and allow germs to enter. [3]
          </h4>
        </div>
        <div>
          <img src={showerhead} alt="shower head" className="showerimg" />
        </div>
      </div>
      <p className="about-header">Why should I care?</p>

      <div className="care-container">
        <h2 className="care-paragraph">
          In 2016, during one of the most severe drought experienced in Tompkins
          County, Cornell implemented restrictions on the use of potable water
          to converse their current water supply. In fact, they also made an
          announcement asking people to limit their shower time to 3 to 5
          minutes [4].
          <br></br>
          <br></br>
          Later, in 2020, Tompkins County was hit with another drought and
          Cornell had to issue a Level 1: Limited Water Use Advisory to conserve
          water [5].
        </h2>
      </div>
      <p className="about-header">What is this?</p>
      <div className="conserve-container">
        <h2 className="care-paragraph">
          We designed this website to provide a fun and competitive way to
          conserve water during showers with 4 easy steps.
          <br></br>
          <br></br>
          Before you take a shower:
        </h2>
      </div>

      <div className="steps-container">
        <div className="step">
          <div>
            <h1>
              1 <BsFillArrowDownRightCircleFill />
            </h1>
          </div>
          <div>
            <h3>Navigate to the search page </h3>
          </div>
        </div>
        <div className="step2">
          <div>
            <div>
              <h1>
                2 <BsFillArrowUpRightCircleFill />
              </h1>
            </div>
            <div>
              <h3>Authenticate into your spotify account</h3>
            </div>
          </div>
        </div>
        <div className="step">
          <div>
            <div>
              <h1>
                3 <BsFillArrowDownRightCircleFill />
              </h1>
            </div>
            <div>
              <h3>Set a target shower time</h3>
            </div>
          </div>
        </div>
        <div className="step2">
          <div>
            <div>
              <h1>
                4 <BsFillBookmarkCheckFill />
              </h1>
            </div>
            <div>
              <h3> Select your playlists you want us to draw from and go!</h3>
            </div>
          </div>
        </div>
      </div>

      <p className="about-header">Does this work?</p>
      <div className="care-container">
        <h2 className="care-paragraph">
          Studies have shown that people shorten their shower time when they
          have a shower monitor. This means that people are conscientious about
          the negative consequences of a long shower and actively want to reduce
          their shower time. [6]
          <br></br>
          <br></br>
          In addition, according to an article, nearly 3/4 of Americans think
          that more actions need to be taken to conserve water, so this is a
          valid problem that people are concerned about [7].
        </h2>
      </div>
      <div className="global-header">
        <h2 className="about-paragraph">
          <div className="global-style">
            <div className="global-style2">
              <span style={{ fontWeight: "bold", color: "orange" }}>
                Global Warming is no longer the exception.
                <br></br>
                <br></br>
                It is the inevitability if the global situation continues as is.
                <br></br>
                <br></br>
                Conserve water.
                <br></br>
                Challenge your friends.
                <br></br>
                Finish showering before your playlist ends.
              </span>
            </div>
          </div>
        </h2>
      </div>
      <div className="cite-container">
        <p className="cite-header">Websites Used</p>

        <h2 className="cited">
          [1] https://www.epa.gov/watersense/showerheads
          <br></br>
          <br></br>
          [2]
          https://www.portland.gov/water/water-efficiency-programs/save-water-home
          <br></br>
          <br></br>
          [3] https://www.webmd.com/beauty/shower-how-often
          <br></br>
          <br></br>
          [4]
          https://news.cornell.edu/stories/2016/08/campus-water-use-restrictions-remain-effect
          <br></br>
          <br></br>
          [5]
          https://cornellsun.com/2020/10/26/second-ithaca-drought-in-five-years-threatens-water-supply-and-local-ecosystem/
          <br></br>
          <br></br>
          [6]
          https://www.mic.com/impact/conserving-water-when-you-shower-is-as-easy-as-looking-at-a-clock-scientists-say-21813259
          <br></br>
          <br></br>
          [7]
          https://www.waterworld.com/drinking-water/article/14174948/majority-of-americans-concerned-about-water-scarcity-survey-finds
          <br></br>
          <br></br>
          background image:
          https://www.pexels.com/photo/water-droplet-in-shallow-photo-45229/
          <br></br>
          <br></br>
          logo picture:
          https://pixabay.com/vectors/water-drop-crystal-ball-sphere-38389/
          about
          <br></br>
          <br></br>
          picture:
          https://www.pexels.com/photo/black-shower-head-switched-on-161502/
        </h2>
      </div>
    </>
  );
};

export default About;
