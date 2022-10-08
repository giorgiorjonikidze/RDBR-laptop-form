import React, { useEffect, useState } from "react";
import styles from "./../assets/styles/laptopForm.module.css";
import axios from "axios";
import Joi from "joi-browser";

const cpuUrl = "https://pcfy.redberryinternship.ge/api/cpus";
const brandsUrl = "https://pcfy.redberryinternship.ge/api/brands";

const LaptopForm = () => {
  // value states
  const [enteredLaptopName, setEnteredLaptopName] = useState("");
  const [enteredBrand, setEnteredBrand] = useState("ლეპტოპის ბრენდი");
  const [enteredCpu, setEnteredCpu] = useState("cpu");
  const [enteredCpuCore, setEnteredCpuCore] = useState("");
  const [enteredCpuThread, setEnteredCpuThread] = useState("");
  const [enteredRam, setEnteredRam] = useState("");
  const [enteredMemoryType, setEnteredMemoryType] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredCondition, setEnteredCondition] = useState("");

  // local storage
  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("laptop info"))
    console.log(storageData)
    if(storageData) {
      if(storageData.laptopName.length !== 0) {
        setEnteredLaptopName(storageData.laptopName)
      }

      if(storageData.brand.length !== 0) {
        setEnteredBrand(storageData.brand)
      }
      if(storageData.cpu.length !== 0) {
        setEnteredCpu(storageData.cpu)
      }
      if(storageData.laptopName.length !== 0) {
        setEnteredLaptopName(storageData.laptopName)
      }
      if(storageData.core.length !== 0) {
        setEnteredCpuCore(storageData.core)
      }
      if(storageData.thread.length !== 0) {
        setEnteredCpuThread(storageData.thread)
      }
      if(storageData.ram.length !== 0) {
        setEnteredRam(storageData.ram)
      }
      if(storageData.memory.length !== 0) {
        setEnteredMemoryType(storageData.memory)
      }
      if(storageData.date.length !== 0) {
        setEnteredDate(storageData.date)
      }
      if(storageData.price.length !== 0) {
        setEnteredPrice(storageData.price)
      }
      if(storageData.condition.length !== 0) {
        setEnteredCondition(storageData.condition)
      }
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const formData = {
        laptopName: enteredLaptopName,
        brand: enteredBrand,
        cpu: enteredCpu,
        core: enteredCpuCore,
        thread: enteredCpuThread,
        ram: enteredRam,
        memory: enteredMemoryType,
        date: enteredDate,
        price: enteredPrice,
        condition: enteredCondition,
      }
      localStorage.setItem("laptop info", JSON.stringify(formData))
    }, 700)
  }, [
    enteredLaptopName,
    enteredBrand,
    enteredCpu,
    enteredCpuCore,
    enteredCpuThread,
    enteredRam,
    enteredMemoryType,
    enteredDate,
    enteredDate,
    enteredPrice,
    enteredCondition,
  ]);


  // validation
  const [validLaptopName, setValidLaptopName] = useState(true);
  const [validBrand, setValidBrand] = useState(true);
  const [validCpu, setValidCpu] = useState(true);
  const [validCore, setValidCore] = useState(true);
  const [validThread, setValidThread] = useState(true);
  const [validRam, setValidRam] = useState(true);
  const [validMemory, setValidMemory] = useState(true);
  const [validDate, setValidDate] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validCondition, setValidCondition] = useState(true);

  const schema = {
    laptopName: Joi.string().required(),
    brand: Joi.string()
      .required()
      .regex(/^((?!ლეპტოპის ბრენდი).)*$/),
    cpu: Joi.string()
      .required()
      .regex(/^((?!cpu).)*$/),
    core: Joi.string()
      .required()
      .regex(/^[0-9]/),
    thread: Joi.string()
      .required()
      .regex(/^[0-9]/),
    ram: Joi.string()
      .required()
      .regex(/^[0-9]/),
    memory: Joi.string().required(),
    date: Joi.string().required(),
    price: Joi.string()
      .required()
      .regex(/^[0-9]/),
    condition: Joi.string().required(),
  };
  const validate = () => {
    const data = {
      laptopName: enteredLaptopName,
      brand: enteredBrand,
      cpu: enteredCpu,
      core: enteredCpuCore,
      thread: enteredCpuThread,
      ram: enteredRam,
      memory: enteredMemoryType,
      date: enteredDate,
      price: enteredPrice,
      condition: enteredCondition,
    };

    const result = Joi.validate(data, schema, { abortEarly: false });
    const errors = result.error
      ? result.error.details.map((item) => item.context.key)
      : [];

    if (errors.includes("laptopName")) {
      console.log("sheicavs da eroor");
      setValidLaptopName(false);
    } else {
      console.log(" arsheicavs da araa eroor");
      setValidLaptopName(true);
    }
    if (errors.includes("brand")) {
      setValidBrand(false);
    } else {
      setValidBrand(true);
    }
    if (errors.includes("cpu")) {
      setValidCpu(false);
    } else {
      setValidCpu(true);
    }
    if (errors.includes("core")) {
      setValidCore(false);
    } else {
      setValidCore(true);
    }
    if (errors.includes("thread")) {
      setValidThread(false);
    } else {
      setValidThread(true);
    }
    if (errors.includes("ram")) {
      setValidRam(false);
    } else {
      setValidRam(true);
    }
    if (errors.includes("memory")) {
      setValidMemory(false);
    } else {
      setValidMemory(true);
    }
    if (errors.includes("date")) {
      setValidDate(false);
    } else {
      setValidDate(true);
    }
    if (errors.includes("price")) {
      setValidPrice(false);
    } else {
      setValidPrice(true);
    }
    if (errors.includes("condition")) {
      setValidCondition(false);
    } else {
      setValidCondition(true);
    }
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    validate();
  };

  // change handlers
  const laptopNameChangeHandler = (e) => {
    setEnteredLaptopName(e.target.value);
  };
  const brandChangeHandler = (e) => {
    setEnteredBrand(e.target.value);
  };
  const coreChangeHandler = (e) => {
    setEnteredCpuCore(e.target.value);
  };
  const cpuChangeHandler = (e) => {
    setEnteredCpu(e.target.value);
  };
  const threadChangeHandler = (e) => {
    setEnteredCpuThread(e.target.value);
  };
  const ramChangeHandler = (e) => {
    setEnteredRam(e.target.value);
  };
  const ssdChangeHandler = (e) => {
    setEnteredMemoryType("SSD");
  };
  const hddChangeHandler = (e) => {
    setEnteredMemoryType("HDD");
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setEnteredPrice(e.target.value);
  };
  const newChangeHandler = (e) => {
    setEnteredCondition("new");
  };
  const usedChangeHandler = (e) => {
    setEnteredCondition("used");
  };

  // fetching data
  const [cpuList, setCpuList] = useState();
  const [brandsList, setBrandsList] = useState();
  useEffect(() => {
    async function fetchCpuData() {
      const response = await axios.get(cpuUrl);
      const cpuList = response.data.data.map((item) => (
        <option key={item.id}>{item.name}</option>
      ));
      setCpuList(cpuList);
    }
    fetchCpuData();
  }, []);

  useEffect(() => {
    async function fetchBrands() {
      const response = await axios.get(brandsUrl);
      const brandsList = response.data.data.map((item) => (
        <option key={item.id}>{item.name}</option>
      ));
      setBrandsList(brandsList);
    }
    fetchBrands();
  }, []);
  // end of fetch data

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      {/* ასატვირთი სურათის */}
      <div className={styles["input-image-wrapper"]}>
        <input className={styles["input-image"]} type="file" />
      </div>

      <div className={styles["name-brand-wrapper"]}>
        {/* laptop name */}
        <div className={styles["name-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validLaptopName && styles["invalid-label"]
            }`}
          >
            ლეპტოპის სახელი
          </label>
          <input
            onChange={laptopNameChangeHandler}
            value={enteredLaptopName}
            className={`${styles["name-input"]} ${styles.input} ${
              !validLaptopName && styles["invalid-border"]
            }`}
            type="text"
            placeholder="HP"
          />
          <p
            className={`${styles.hint} ${
              !validLaptopName && styles["invalid-hint"]
            }`}
          >
            ლათინური ასოები, ციფრები, !@#$%^&*()_+={" "}
          </p>
        </div>

        {/* laptop brand  */}
        <select
        value={enteredBrand}
          className={`${styles["brand-select"]} ${
            !validBrand && styles["invalid-border"]
          }`}
          onChange={brandChangeHandler}
        >
          <option defaultValue hidden>
            ლეპტოპის ბრენდი
          </option>
          {brandsList}
        </select>
      </div>
      <div className={styles.divider}></div>

      {/* cpu information  */}

      <div className={styles["cpu-wrapper"]}>
        <select
        value={enteredCpu}
          className={`${styles["cpu-select"]} ${
            !validCpu && styles["invalid-border"]
          }`}
          onChange={cpuChangeHandler}
        >
          <option defaultValue hidden>
            cpu
          </option>
          {cpuList}
        </select>
        <div className={styles["cpu-core-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validCore && styles["invalid-label"]
            }`}
          >
            CPU-ს ბირთვი
          </label>
          <input
            onChange={coreChangeHandler}
            value={enteredCpuCore}
            className={`${styles["core-input"]} ${styles.input} ${
              !validCore && styles["invalid-border"]
            }`}
            type="text"
            placeholder="14"
          />
          <p
            className={`${styles.hint} ${!validCore && styles["invalid-hint"]}`}
          >
            მხოლოდ ციფრები
          </p>
        </div>

        <div className={styles["cpu-thread-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validThread && styles["invalid-label"]
            }`}
          >
            CPU-ს ნაკადი
          </label>
          <input
            onChange={threadChangeHandler}
            value={enteredCpuThread}
            className={`${styles["thread-input"]} ${styles.input} ${
              !validThread && styles["invalid-border"]
            }`}
            type="text"
            placeholder="365"
          />
          <p
            className={`${styles.hint} ${
              !validThread && styles["invalid-hint"]
            }`}
          >
            მხოლოდ ციფრები
          </p>
        </div>
      </div>

      {/* ram & ssd and HDD input */}

      <div className={styles["ram-ssd-wrapper"]}>
        {/* ram  */}
        <div className={styles["ram-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validRam && styles["invalid-label"]
            }`}
          >
            ლეპტოპის RAM (GB)
          </label>
          <input
            onChange={ramChangeHandler}
            value={enteredRam}
            className={`${styles["ram-input"]} ${styles.input} ${
              !validRam && styles["invalid-border"]
            }`}
            type="number"
            placeholder="16"
          />
          <p
            className={`${styles.hint} ${!validRam && styles["invalid-hint"]}`}
          >
            მხოლოდ ციფრები
          </p>
        </div>

        {/* ssd hdd  */}

        <div className={styles["ssd-hdd-p-wrapper"]}>
          <p
            className={`${styles["ssd-p"]} ${
              !validMemory && styles["invalid-label"]
            }`}
          >
            მეხსიერების ტიპი
          </p>
          <div className={styles["ssd-hdd-wrapper"]}>
            <div className={styles["ssd-wrapper"]}>
              <input
                className={styles["ssd-input"]}
                type="radio"
                onChange={ssdChangeHandler}
                checked={enteredMemoryType === "SSD"}
              />
              <label
                className={`${styles["ssd-label"]} ${
                  !validMemory && styles["invalid-label"]
                }`}
              >
                SSD
              </label>
            </div>
            <div className={styles["hdd-wrapper"]}>
              <input
                className={styles["hdd-input"]}
                type="radio"
                checked={enteredMemoryType === "HDD"}
                onChange={hddChangeHandler}
              />
              <label
                className={`${styles["hdd-label"]} ${
                  !validMemory && styles["invalid-label"]
                }`}
              >
                HDD
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
      {/* date & price  */}

      <div className={styles["ram-ssd-wrapper"]}>
        {/* ram  */}
        <div className={styles["ram-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validDate && styles["invalid-label"]
            }`}
          >
            შეძენის რიცხვი (არჩევითი)
          </label>
          <input
            onChange={dateChangeHandler}
            value={enteredDate}
            className={`${styles["ram-input"]} ${styles.input} ${
              !validDate && styles["invalid-border"]
            }`}
            type="string"
            placeholder="დდ / თთ / წწწწ"
          />
          <p
            className={`${styles.hint} ${!validDate && styles["invalid-hint"]}`}
          >
            მხოლოდ ციფრები
          </p>
        </div>

        {/* price  */}

        <div className={styles["ram-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validPrice && styles["invalid-label"]
            }`}
          >
            ლეპტოპის ფასი
          </label>
          <input
            onChange={priceChangeHandler}
            value={enteredPrice}
            className={`${styles["ram-input"]} ${styles.input} ${
              !validPrice && styles["invalid-border"]
            }`}
            type="number"
            placeholder="0000"
          />
          <p
            className={`${styles.hint} ${
              !validPrice && styles["invalid-hint"]
            }`}
          >
            მხოლოდ ციფრები
          </p>
        </div>
      </div>

      {/* condition  */}

      <div className={styles["condition-wrapper"]}>
        <p
          className={`${styles["ssd-p"]} ${
            !validCondition && styles["invalid-label"]
          }`}
        >
          ლეპტოპის მდგომარეობა
        </p>
        <div className={styles["ssd-hdd-wrapper"]}>
          <div className={styles["ssd-wrapper"]}>
            <input
              className={styles["ssd-input"]}
              type="radio"
              checked={enteredCondition === "new"}
              onChange={newChangeHandler}
            />
            <label
              className={`${styles["ssd-label"]} ${
                !validCondition && styles["invalid-label"]
              }`}
            >
              ახალი
            </label>
          </div>
          <div className={styles["hdd-wrapper"]}>
            <input
              className={styles["hdd-input"]}
              type="radio"
              checked={enteredCondition === "used"}
              onChange={usedChangeHandler}
            />
            <label
              className={`${styles["hdd-label"]} ${
                !validCondition && styles["invalid-label"]
              }`}
            >
              მეორადი
            </label>
          </div>
        </div>
      </div>

      {/* buttons  */}

      <div className={styles["btn-wrapper"]}>
        <button className={styles["btn-back"]}>უკან</button>
        <button type="submit" className={styles.btn}>
          დამახსოვრება
        </button>
      </div>
    </form>
  );
};

export default LaptopForm;
