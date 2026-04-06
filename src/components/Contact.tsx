import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:kausik1027@gmail.com" data-cursor="disable">
                kausik1027@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>7327070843</p>
          </div>

          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Sk Kausik Azad Hussain</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
