import React, { useEffect, useState } from "react";
import styles from "./../assets/styles/laptopInfo.module.css";
import backIcon from "./../assets/images/back-button-icon.svg";


import { useParams } from "react-router-dom";
import axios from "axios";

const token = "0a72c0ac0fdf855126c301571a75474b";

const LaptopInfo = () => {
  const [image, setImage] = useState("https://pcfy.redberryinternship.ge");
  const [laptopData, setLaptopData] = useState({
    user: {
      name: "",
      surname: "",
      team_id: "",
      position_id: "",
      email: "",
      phone_number: "",
    },
    laptop: {
      name: "",
      image: "",
      brand_id: 1,
      cpu: { name: "", cores: "", threads: "" },
      ram: "",
      hard_drive_type: "",
      state: "",
      purchase_date: "",
      price: "",
    },
  });

  const { laptopId } = useParams();
  const url =
    "https://pcfy.redberryinternship.ge/api/laptop/" +
    laptopId +
    "?token=0a72c0ac0fdf855126c301571a75474b";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url);
      setImage(image + response.data.data.laptop.image);
      setLaptopData(response.data.data);
      console.log(response)
    }
    fetchData();
  }, []);

  return (
    <div className={styles["main-block"]}>
      <img className={styles["back-button"]} src={backIcon} />
      <p className={styles.h1}>ᲚᲔᲞᲢᲝᲞᲘᲡ ᲘᲜᲤᲝ</p>
      <div className={styles["data-wrapper"]}>
        <div className={styles["first-segment-wrapper"]}>
          <div className={styles["image-wrapper"]}>
            <img src={image} className={styles.image} />
          </div>
          <div>
            <table>
              <tr>
                <td className={styles["table-key"]}>სახელი:</td>
                <td className={styles["table-body"]}>
                  {laptopData.user.name} {laptopData.user.surname}
                </td>
              </tr>
              <tr>
                <td className={styles["table-key"]}>თიმი:</td>
                <td className={styles["table-body"]}>
                  {laptopData.user.team_id}
                </td>
              </tr>
              <tr>
                <td className={styles["table-key"]}>პოზიცია:</td>
                <td className={styles["table-body"]}>
                  {laptopData.user.position_id}
                </td>
              </tr>
              <tr>
                <td className={styles["table-key"]}>მეილი:</td>
                <td className={styles["table-body"]}>
                  {laptopData.user.email}
                </td>
              </tr>
              <tr>
                <td className={styles["table-key"]}>ტელ. ნომერი:</td>
                <td className={styles["table-body"]}>
                  {laptopData.user.phone_number}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.stroke}></div>
        <div className={styles["middle-segment-wapper"]}>
          <table>
            <tr>
              <td className={styles["table-key"]}>ლეპტოპის სახელი:</td>
              <td className={styles["table-body"]}>{laptopData.laptop.name}</td>
            </tr>
            <tr>
              <td className={styles["table-key"]}>ლეპტოპის ბრენდი:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.brand_id}
              </td>
            </tr>
            <tr>
              <td className={styles["table-key"]}>RAM:</td>
              <td className={styles["table-body"]}>{laptopData.laptop.ram}</td>
            </tr>
            <tr>
              <td className={styles["table-key"]}>მეხსიერების ტიპი:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.hard_drive_type}
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td className={styles["table-key"]}>CPU:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.cpu.name}
              </td>
            </tr>
            <tr>
              <td className={styles["table-key"]}>CPU-ს ბირთვი:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.cpu.cores}
              </td>
            </tr>
            <tr>
              <td className={styles["table-key"]}>CPU-ს ნაკადი:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.cpu.threads}
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.stroke}></div>
        <div className={styles["bottom-segment-wrapper"]}>
          <table>
            <tr>
              <td className={styles["table-key"]}>ლეპტოპის მდგომარეობა:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.state}
              </td>
            </tr>
            <tr>
              <td className={styles["table-key"]}>ლეპლტოპის ფასი:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.price}
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td className={styles["table-key"]}>შეზენის რიცხვი:</td>
              <td className={styles["table-body"]}>
                {laptopData.laptop.purchase_date}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LaptopInfo;
