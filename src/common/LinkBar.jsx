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

  const email = import.meta.env.VITE_APP_EMAIL;
  const whatsappNumber = import.meta.env.VITE_APP_WHATSAPP_NUMBER;

  // Fungsi untuk membuka WhatsApp
  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}`;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      //  buka aplikasi WhatsApp di mobile
      window.location.href = url;
    } else {
      // Untuk desktop, buka WhatsApp di browser
      window.open(url, "_blank");
    }
  };

  // Fungsi untuk membuka Email
  const openEmail = () => {
    const mailtoLink = `mailto:${email}?subject=Hello&body=Hi, I found your contact from your website.`;
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      //  buka aplikasi email default di mobile
      window.location.href = mailtoLink;

      // Fallback jika email tidak terbuka setelah 1 detik
      setTimeout(() => {
        const confirmed = window.confirm(
          "Aplikasi email tidak ditemukan. Apakah Anda ingin menyalin alamat email?"
        );
        if (confirmed) {
          navigator.clipboard.writeText(email);
          alert("Alamat email telah disalin: " + email);
        }
      }, 1000);
    } else {
      // Untuk desktop, buka aplikasi email default
      window.open(mailtoLink, "_blank");
    }
  };

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
        href="https://github.com/Rafifpermana"
        target="_blank"
        rel="noopener noreferrer"
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

      {/* Link Email */}
      <div
        onClick={openEmail}
        style={{
          margin: "0 10px",
          display: "flex",
          alignItems: "center",
          color: "#000",
          cursor: "pointer",
        }}
      >
        <img
          src={gmail}
          alt="Email"
          style={{ width: "25px", height: "25px", marginRight: "8px" }}
        />
        <span className="d-none d-md-inline"> Email</span>
      </div>

      {/* Link WhatsApp */}
      <div
        onClick={openWhatsApp}
        style={{
          margin: "0 10px",
          display: "flex",
          alignItems: "center",
          color: "#25D366",
          cursor: "pointer",
        }}
      >
        <img
          src={watsapp}
          alt="WhatsApp"
          style={{ width: "25px", height: "25px", marginRight: "8px" }}
        />
        <span className="d-none d-md-inline"> WhatsApp</span>
      </div>
    </div>
  );
};

export default LinkBar;
