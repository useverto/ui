import React from "react";
import styles from "./TestComp.module.sass";

const TestComp = ({ text }: { text: string }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.text}>{text}</button>
    </div>
  );
};

export default TestComp;
