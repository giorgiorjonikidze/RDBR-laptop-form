import React from "react";
import styles from './../assets/styles/laptopForm.module.css'

const LaptopForm = () => {
  return (
    <form className={styles.form}>
      {/* ასატვირთი სურათის */}
      <div className={styles["input-image-wrapper"]}>
        <input className={styles["input-image"]} type="file" />
      </div>

      <div className={styles["name-brand-wrapper"]}>
        {/* laptop name */}
        <div className={styles["name-wrapper"]}>
          <label className={styles.label}>ლეპტოპის სახელი</label>
          <input
            className={`${styles["name-input"]} ${styles.input}`}
            type="text"
            placeholder="HP"
          />
          <p className={styles.hint}>
            ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
          </p>
        </div>
        {/* laptop brand  */}
        <select className={styles["brand-select"]}>
          <option defaultValue hidden>
            ლეპტოპის ბრენდი
          </option>
        </select>
      </div>
      <div className={styles.divider}></div>

      {/* cpu information  */}

      <div className={styles["cpu-wrapper"]}>
        <select className={styles["cpu-select"]}>
          <option defaultValue hidden>
            პოზიცია
          </option>
        </select>
        <div className={styles["cpu-core-wrapper"]}>
          <label className={styles.label}>CPU-ს ბირთვი</label>
          <input
            className={`${styles["core-input"]} ${styles.input}`}
            type="text"
            placeholder="14"
          />
          <p className={styles.hint}>მხოლოდ ციფრები</p>
        </div>
        <div className={styles["cpu-thread-wrapper"]}>
          <label className={styles.label}>CPU-ს ნაკადი</label>
          <input
            className={`${styles["thread-input"]} ${styles.input}`}
            type="text"
            placeholder="365"
          />
          <p className={styles.hint}>მხოლოდ ციფრები</p>
        </div>
      </div>

      {/* ram & ssd and HDD input */}

      <div className={styles["ram-ssd-wrapper"]}>
        {/* ram  */}
        <div className={styles["ram-wrapper"]}>
          <label className={styles.label}>ლეპტოპის RAM (GB)</label>
          <input
            className={`${styles["ram-input"]} ${styles.input}`}
            type="number"
            placeholder="16"
          />
          <p className={styles.hint}>მხოლოდ ციფრები</p>
        </div>

        {/* ssd hdd  */}

        <div className={styles["ssd-hdd-p-wrapper"]}>
          <p className={styles["ssd-p"]}>მეხსიერების ტიპი</p>
          <div className={styles["ssd-hdd-wrapper"]}>
            <div className={styles["ssd-wrapper"]}>
              <input className={styles["ssd-input"]} type="radio" />
              <label className={styles["ssd-label"]}>SSD</label>
            </div>
            <div className={styles["hdd-wrapper"]}>
              <input className={styles["hdd-input"]} type="radio" />
              <label className={styles["hdd-label"]}>HDD</label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      {/* date & price  */}

      <div className={styles["ram-ssd-wrapper"]}>
        {/* ram  */}
        <div className={styles["ram-wrapper"]}>
          <label className={styles.label}>შეძენის რიცხვი (არჩევითი)</label>
          <input
            className={`${styles["ram-input"]} ${styles.input}`}
            type="number"
            placeholder="დდ / თთ / წწწწ"
          />
          <p className={styles.hint}>მხოლოდ ციფრები</p>
        </div>

        {/* ssd hdd  */}

        <div className={styles["ram-wrapper"]}>
          <label className={styles.label}>ლეპტოპის ფასი</label>
          <input
            className={`${styles["ram-input"]} ${styles.input}`}
            type="number"
            placeholder="0000"
          />
          <p className={styles.hint}>მხოლოდ ციფრები</p>
        </div>
      </div>

      {/* condition  */}

      <div className={styles["condition-wrapper"]}>
        <p className={styles["ssd-p"]}>ლეპტოპის მდგომარეობა</p>
        <div className={styles["ssd-hdd-wrapper"]}>
          <div className={styles["ssd-wrapper"]}>
            <input className={styles["ssd-input"]} type="radio" />
            <label className={styles["ssd-label"]}>ახალი</label>
          </div>
          <div className={styles["hdd-wrapper"]}>
            <input className={styles["hdd-input"]} type="radio" />
            <label className={styles["hdd-label"]}>მეორადი</label>
          </div>
        </div>
      </div>

      {/* buttons  */}

      <div className={styles["btn-wrapper"]}>
        <button className={styles["btn-back"]}>უკან</button>
        <button type="submit" className={styles.btn}>დამახსოვრება</button>
      </div>
    </form>
  );
};

export default LaptopForm;
