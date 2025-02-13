import { useState, useEffect } from "react";
import gmail from "../assets/gmail.png";
import github from "../assets/github.png";
import watsapp from "../assets/whatsapp.png";

const LinkBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const githubUrl = import.meta.env.VITE_APP_GITHUB_URL;
  const email = import.meta.env.VITE_APP_EMAIL;
  const whatsappNumber = import.meta.env.VITE_APP_WHATSAPP_NUMBER;

  return (
    <div
      style={{
        position: "fixed",
        left: "20px",
        top: "20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1000,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      <a
        className="text-decoration-none"
        href={githubUrl}
        target="_blank"
        style={{
          margin: "0 10px",
          display: "flex",
          alignItems: "center",
          color: "#000",
        }}
      >
        <img
          src={github}
          alt="GitHub"
          style={{ width: "25px", height: "25px", marginRight: "8px" }}
        />
        <span className="d-none d-md-inline"> Rafifpermana</span>
      </a>
      <a
        className="text-decoration-none"
        href={`mailto:${email}`}
        style={{
          margin: "0 10px",
          display: "flex",
          alignItems: "center",
          color: "#000",
        }}
      >
        <img
          src={gmail}
          alt="Email"
          style={{ width: "25px", height: "25px", marginRight: "8px" }}
        />
        <span className="d-none d-md-inline"> Email</span>
      </a>
      <a
        className="text-decoration-none"
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          margin: "0 10px",
          display: "flex",
          alignItems: "center",
          color: "#25D366",
        }}
      >
        <img
          src={watsapp}
          alt="WhatsApp"
          style={{ width: "25px", height: "25px", marginRight: "8px" }}
        />
        <span className="d-none d-md-inline"> WhatsApp</span>
      </a>
    </div>
  );
};

export default LinkBar;
