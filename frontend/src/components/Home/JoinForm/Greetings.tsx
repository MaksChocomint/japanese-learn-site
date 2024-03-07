import React from "react";
import styles from "./Greetings.module.css";

const Greetings = () => {
  return (
    <div className="flex flex-col gap-1 text-[52px] text-center">
      <h2 className={styles.gradient_dark_red}>Смотри и читай</h2>
      <h2 className={styles.gradient_red}>без субтитров!</h2>
    </div>
  );
};

export default Greetings;
