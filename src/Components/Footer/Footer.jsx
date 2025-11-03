import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.containerFooter}>
      <div className={styles.content}>
        <div className={styles.containerImages}>
          <img
            src="../../../public/img/metro.png"
            alt="Eme"
            className={styles.logo}
          />
          <img
            src="../../../public/img/o.png"
            alt="O"
            className={styles.logo}
          />
          <img
            src="../../../public/img/metro.png"
            alt="Eme"
            className={styles.logo}
          />
        </div>
        <div className={styles.containerCopyright}>
          <p>&copy; 2025 Todos los derechos reservados.</p>
        </div>
        <div className={styles.containerSocialIcons}>
          <a
            href="https://wa.me/542235556699"
            target="_blanck"
            rel="noopener noreferrer"
          >
            <img
              src="/img/whatsapp.png"
              alt="WhatsApp"
              className={styles.socialIcons}
            />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blanck"
            rel="noopener noreferrer"
          >
            <img
              src="/img/facebookContorno.png"
              alt="Facebook"
              className={styles.socialIcons}
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blanck"
            rel="noopener noreferrer"
          >
            <img
              src="/img/instagram.png"
              alt="Instagram"
              className={styles.socialIcons}
            />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/img/linkedin.png"
              alt="LinkedIn"
              className={styles.socialIcons}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
