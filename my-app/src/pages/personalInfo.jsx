import React, { Fragment } from "react";
import styles from "./../assets/styles/personalInfo.module.css";
import redberryIcon from "./../assets/images/redberry-logo-icon.svg";
import backIcon from "./../assets/images/back-button-icon.svg";
import PersonalInfoForm from "../components/personalInfoForm";

const PersonalInfo = () => {
  return (
    <Fragment>
      <div className={styles["main-block"]}>
        <header className={styles.header}>
          <div className={styles["header-p-wrapper"]}>
            <p className={styles["header-p1"]}>თანამშრომლების ინფო</p>
            <div className={styles.stroke}></div>
          </div>
          <p className={styles["header-p2"]}>ლეპტოპის მახასიათებლები</p>
        </header>
        <div className={styles["form-wrapper"]}>
          {/* form */}
          <PersonalInfoForm />
        </div>
        <img className={styles.logo} src={redberryIcon} />
      </div>
      <img className={styles["back-button"]} src={backIcon} />
    </Fragment>
  );
};

export default PersonalInfo;
