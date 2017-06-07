import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-6 footerleft ">
              <div className="logofooter">
                {" "}
                <img
                  src="img/science1.png"
                  alt="App Logo"
                  className="img-responsive logo-img"
                />
              </div>
              <p>
                Science-cx provides the best collaborative and scientific research tools available in the world for individuals, universities, research institutions and business to reach the highest productivity levels ever imagined
              </p>
              <div style={{ display: "block" }}>
                <i className="fa fa-map-pin" />
                {" "}
                Office locations
                <ul>
                  <li>Roma </li>
                  <li>New York </li>
                  <li>Paris </li>
                  <li>Valencia - Spain </li>
                  <li>Beijing - China </li>
                </ul>
              </div>
              <p>
                <i className="fa fa-envelope" />
                {" "}
                E-mail : contact@science-cx.net
              </p>

            </div>
            <div className="col-md-2 col-sm-6 paddingtop-bottom">
              <h6 className="heading7">GENERAL LINKS</h6>
              <ul className="footer-ul">
                <li><a href="#"> Careers</a></li>
                <li><a href="#"> Privacy Policy</a></li>
                <li><a href="#"> Terms & Conditions</a></li>
                <li><a href="#"> Case Studies</a></li>
                <li>
                  <a href="#"> Frequently Ask Questions</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 paddingtop-bottom">
              <h6 className="heading7">LATEST POSTS</h6>
              <div className="post">
                <p>
                  How to use science-cx to win an advantage over competitors
                  {" "}
                  <span>May 23,2017</span>
                </p>
                <p>
                  Most cited scientific publications made in science-cx
                  {" "}
                  <span>May 10,2017</span>
                </p>
                <p>
                  Improving the community, a tale of 300 thousand users working together at science-cx
                  {" "}
                  <span>May 3,2017</span>
                </p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 paddingtop-bottom">
              <div
                className="fb-page"
                data-href="https://www.twitter.com/science-cx"
                data-tabs="timeline"
                data-height="300"
                data-small-header="false"
                style={{ marginBottom: "15px" }}
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <div className="fb-xfbml-parse-ignore">
                  <blockquote cite="https://www.twitter.com/science-cx">
                    <a href="https://www.twitter.com/science-cx">
                      Twitter
                    </a>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="col-md-6">
              <p>© 2017 - All Rights reserved / science-cx</p>
            </div>
            <div className="col-md-6">
              <ul className="bottom_ul">
                <li><a href="#">science-cx.net</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Faq's</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Site Map</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
