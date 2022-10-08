import React, { useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import styles from "./../assets/styles/personalInfo.module.css";
import { useHistory } from 'react-router-dom';


const teamsUrl = "https://pcfy.redberryinternship.ge/api/teams";
const positionsUrl = "https://pcfy.redberryinternship.ge/api/positions";

const PersonalInfoForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredSurname, setEnteredSurname] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredNumber, setEnteredNumber] = useState("");
  const [enteredTeams, setEnteredTeams] = useState("თიმი");
  const [enteredPositions, setEnteredPositons] = useState("პოზიცია");

  const [validName, setValidName] = useState(true);
  const [validSurname, setValidSurname] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validNumber, setValidNumber] = useState(true);
  const [validTeams, setValidTeams] = useState(true);
  const [validPositions, setValidPositions] = useState(true);

  const history = useHistory()

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("personal info"));
    if(storageData) {

      if (storageData.name.length !== 0) {
        setEnteredName(storageData.name);
      }
      if (storageData.surname.length !== 0) {
        setEnteredSurname(storageData.surname);
      }
      if (storageData.email.length !== 0) {
        setEnteredEmail(storageData.email);
      }
      if (storageData.number.length !== 0) {
        setEnteredNumber(storageData.number);
      }
      if (storageData.teams.length !== 0) {
        setEnteredTeams(storageData.teams);
      }
      if (storageData.positions.length !== 0) {
        setEnteredPositons(storageData.positions);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storageData = localStorage.setItem(
        "personal info",
        JSON.stringify({
          name: enteredName,
          surname: enteredSurname,
          email: enteredEmail,
          number: enteredNumber,
          teams: enteredTeams,
          positions: enteredPositions,
        })
      );
    }, 600);
  }, [
    enteredName,
    enteredEmail,
    enteredSurname,
    enteredNumber,
    enteredTeams,
    enteredPositions,
  ]);

  const schema = {
    name: Joi.string()
      .regex(/^[ა-ჰ]{2,}$/)
      .required(),
    surname: Joi.string()
      .regex(/^[ა-ჰ]{2,}$/)
      .required(),
    email: Joi.string()
      .regex(/^\S+@redberry.ge$/)
      .required(),
    number: Joi.string()
      .regex(/^(\+995[0-9]{9})$/)
      .required(),
    teams: Joi.string()
      .regex(/^((?!თიმი).)*$/)
      .required(),
    positions: Joi.string()
      .regex(/^((?!პოზიცია).)*$/)
      .required(),
  };

  const validate = () => {
    const data = {
      name: enteredName,
      surname: enteredSurname,
      email: enteredEmail,
      number: enteredNumber,
      teams: enteredTeams,
      positions: enteredPositions,
    };
    const result = Joi.validate(data, schema, { abortEarly: false });
    
    const errors = result.error ? result.error.details.map((item) => item.context.key) : [];

    if (errors.includes("name")) {
      setValidName(false);
    } else {
      setValidName(true);
    }
    if (errors.includes("surname")) {
      setValidSurname(false);
    } else {
      setValidSurname(true);
    }
    if (errors.includes("email")) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    if (errors.includes("number")) {
      setValidNumber(false);
    } else {
      setValidNumber(true);
    }
    if (errors.includes("teams")) {
      setValidTeams(false);
    } else {
      setValidTeams(true);
    }
    if (errors.includes("positions")) {
      setValidPositions(false);
    } else {
      setValidPositions(true);
    }
    return errors
  };

  // submit handler 

  const submitHandler = (e) => {
    e.preventDefault();
    const error = validate();
    if(error.length === 0) {
      history.push('/laptoppage')
    }
  };

  const [teams, setTeams] = useState("");
  const [teamsIsVisible, setTeamsIsVisible] = useState(false);
  const [teamsId, setTeamsId] = useState("");

  const [positions, setPositions] = useState("");
  const [positionsIsVisible, setPositionsIsVisible] = useState(false);

  const [posdata, setposdata] = useState("");

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const surnameChangeHandler = (e) => {
    setEnteredSurname(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const numberChangeHandler = (e) => {
    setEnteredNumber(e.target.value);
  };

  const teamsChangeHandler = (id, name) => {
    setEnteredTeams(name);
    setTeamsId(id);
    setTeamsIsVisible(false);
  };

  const positionsChangeHandler = (id, name) => {
    setEnteredPositons(name);
    console.log(id);
    setPositionsIsVisible(false);
  };

  const selectTeamsChangeHandler = () => {
    setPositionsIsVisible(false);
    setTeamsIsVisible(!teamsIsVisible);
    console.log(true);
  };
  const selectPositionChangeHandler = () => {
    setTeamsIsVisible(false);
    setPositionsIsVisible(!positionsIsVisible);
  };

  useEffect(() => {
    async function fetchingTeams() {
      const response = await axios.get(teamsUrl);
      const teamsList = response.data.data.map((item) => (
        <li
          key={item.id}
          id={item.id}
          className={styles.li}
          onClick={() => teamsChangeHandler(item.id, item.name)}
        >
          {item.name}
        </li>
      ));
      setTeams(teamsList);
    }
    fetchingTeams();
  }, []);
  useEffect(() => {
    async function fetchingTeams() {
      const response = await axios.get(positionsUrl);
      const teamsList = response.data.data.map((item) => (
        <li
          key={item.id}
          team_id={item.team_id}
          id={item.id}
          className={styles.li}
          onClick={() => positionsChangeHandler(item.id, item.name)}
        >
          {item.name}
        </li>
      ));
      setPositions(teamsList);
      setposdata(response.data.data);
    }
    fetchingTeams();
  }, []);

  useEffect(() => {
    if (teamsId.length !== 0) {
      const filteredpositions = posdata.filter(
        (item) => item.team_id == teamsId
      );
      console.log(filteredpositions);
      const teamsList = filteredpositions.map((item) => (
        <li
          key={item.id}
          team_id={item.team_id}
          id={item.id}
          className={styles.li}
          onClick={() => positionsChangeHandler(item.id, item.name)}
        >
          {item.name}
        </li>
      ));
      setPositions(teamsList);
    }
  }, [enteredTeams]);

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles["name-surname-wrapper"]}>
        <div className={styles["name-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validName && styles["invalid-label"]
            }`}
          >
            სახელი
          </label>
          <input
            value={enteredName}
            onChange={nameChangeHandler}
            className={`${styles["name-input"]} ${styles.input} ${
              !validName && styles["invalid-border"]
            }`}
            type="text"
            placeholder="გრიშა"
          />
          <p
            className={`${styles.hint} ${!validName && styles["invalid-hint"]}`}
          >
            მინიმუმ 2 სიმბოლო, ქართული ასოები
          </p>
        </div>
        <div className={styles["surname-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validSurname && styles["invalid-label"]
            }`}
          >
            გვარი
          </label>
          <input
          value={enteredSurname}
            onChange={surnameChangeHandler}
            className={`${styles["surname-input"]} ${styles.input} ${
              !validSurname && styles["invalid-border"]
            }`}
            type="text"
            placeholder="ბაგრატიონი"
          />
          <p
            className={`${styles.hint} ${
              !validSurname && styles["invalid-hint"]
            }`}
          >
            მინიმუმ 2 სიმბოლო, ქართული ასოები
          </p>
        </div>
      </div>

      {/* select */}

      <div className={styles["select-wrapper"]}>
        {/* <select onChange={teamsChangeHandler} >
          <option selected hidden>
            თიმი
          </option>
          {teams}
        </select> */}

        <div className={`${styles["select-block"]}`}>
          <div
            className={`${styles["selected"]} ${
              !validTeams && styles["invalid-border"]
            }`}
            onClick={selectTeamsChangeHandler}
          >
            <p className={styles["selected-text"]}>{enteredTeams}</p>
          </div>
          {teamsIsVisible && <ul className={styles.ul}>{teams}</ul>}
        </div>
        <div className={`${styles["select-block"]}`}>
          <div
            className={`${styles["selected"]} ${
              !validPositions && styles["invalid-border"]
            }`}
            onClick={selectPositionChangeHandler}
          >
            <p className={styles["selected-text"]}>{enteredPositions}</p>
          </div>
          {positionsIsVisible && <ul className={styles.ul}>{positions}</ul>}
        </div>
        {/* <select onChange={positionsChangeHandler}>
          <option selected hidden>
            პოზიცია
          </option>
          {positions}
        </select> */}
      </div>

      {/* mail & number input */}

      <div className={styles["mail-number-wrapper"]}>
        <div className={styles["name-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validEmail && styles["invalid-label"]
            }`}
          >
            მეილი
          </label>
          <input
          value={enteredEmail}
            onChange={emailChangeHandler}
            className={`${styles["mail-input"]} ${styles.input} ${
              !validEmail && styles["invalid-border"]
            }`}
            type="text"
            placeholder="grish666@redberry.ge"
          />
          <p
            className={`${styles.hint} ${
              !validEmail && styles["invalid-hint"]
            }`}
          >
            უნდა მთავრდებოდეს @redberry.ge-ით
          </p>
        </div>
        <div className={styles["number-wrapper"]}>
          <label
            className={`${styles.label} ${
              !validNumber && styles["invalid-label"]
            }`}
          >
            ტელეფონის ნომერი
          </label>
          <input
          value={enteredNumber}
            onChange={numberChangeHandler}
            className={`${styles["number-input"]} ${styles.input} ${
              !validNumber && styles["invalid-border"]
            }`}
            type="text"
            placeholder="+995 598 00 07 01"
          />
          <p
            className={`${styles.hint} ${
              !validNumber && styles["invalid-hint"]
            }`}
          >
            უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს
          </p>
        </div>
      </div>
      <button type="submit" className={styles.button}>
        შემდეგი
      </button>
    </form>
  );
};

export default PersonalInfoForm;
