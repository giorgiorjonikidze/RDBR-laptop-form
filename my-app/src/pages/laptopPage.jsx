import React, { Fragment } from "react";
import styles from "./../assets/styles/laptopForm.module.css";
import redberryIcon from "./../assets/images/redberry-logo-icon.svg";
import backIcon from "./../assets/images/back-button-icon.svg";
import LaptopForm from './../components/laptopForm';

const LaptopPage = () => {
  return (
    <Fragment>
      <div className={styles["main-block"]}>
        <header className={styles.header}>
          <p className={styles["header-p1"]}>თანამშრომლების ინფო</p>
          <div className={styles["header-p-wrapper"]}>
            <p className={styles["header-p2"]}>ლეპტოპის მახასიათებლები</p>
            <div className={styles.stroke}></div>
          </div>
        </header>
        <div className={styles["form-wrapper"]}>
          {/* form */}
          <LaptopForm />
        </div>
        <img className={styles.logo} src={redberryIcon} />
      </div>
      <img className={styles["back-button"]} src={backIcon} />
    </Fragment>
  );
};

export default LaptopPage;
