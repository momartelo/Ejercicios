import MainLayout from "../../Layout/MainLayout";
import styles from "./FAQPage.module.css";
import { faqs } from "../../Data/FAQs";
import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.item}>
      <button onClick={() => setOpen(!open)} className={styles.button}>
        <span>{question}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <p className={styles.answer}>- {answer}</p>}
    </div>
  );
};

const FaqPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainLayout>
        <div className={styles.containerPage}>
          <h1 className={styles.title}>Preguntas Frecuentes (FAQ)</h1>
          {faqs.map((section, index) => (
            <div key={index} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.section}</h2>
              {section.questions.map((item, index1) => (
                <FAQItem key={index1} question={item.q} answer={item.a} />
              ))}
            </div>
          ))}
          <div className={styles.containerButtons}>
            <Button
              text="Atras"
              onClick={() => navigate(-1)}
              className={styles.buttonBack}
            />
            <Button
              text="Inicio"
              onClick={() => navigate("/")}
              className={styles.buttonHome}
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default FaqPage;
