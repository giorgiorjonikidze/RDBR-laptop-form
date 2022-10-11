import React from "react";
import styles from "./../assets/styles/laptopList.module.css";
import backIcon from "./../assets/images/back-button-icon.svg";
import ListItem from "../components/list";
import { useEffect, useState } from "react";
import axios from "axios";

const laptopsUrl =
  "https://pcfy.redberryinternship.ge/api/laptops?token=0a72c0ac0fdf855126c301571a75474b";


  const imageUrl = "https://pcfy.redberryinternship.ge"
  
  const LaptopList = () => {
  const [image, setImage] = useState("https://pcfy.redberryinternship.ge");
  const [laptopList, setLaptopList] = useState();
  useEffect(() => {
    async function fetchLaptopData() {
      const response = await axios.get(laptopsUrl);
      const laptopList = response.data.data.map((item) => (
        <ListItem
          image={`${imageUrl}${item.laptop.image}`}
          key={item.laptop.id}
          name={item.user.name}
          surname={item.user.surname}
          id={item.laptop.id}
          cpu={item.laptop.name}
        />
      ));
      setLaptopList(laptopList);
    }
    fetchLaptopData();
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.h1}>ᲩᲐᲜᲐᲬᲔᲠᲔᲑᲘᲡ ᲡᲘᲐ</h1>
        <ul className={styles.ul}>{laptopList}</ul>
      </div>
      <img className={styles["back-button"]} src={backIcon} />
    </div>
  );
};

export default LaptopList;
