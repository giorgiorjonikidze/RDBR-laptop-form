import React, { useEffect, useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import styles from "./../assets/styles/personalInfo.module.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const teamsUrl = "https://pcfy.redberryinternship.ge/api/teams";
const positionsUrl = "https://pcfy.redberryinternship.ge/api/positions";

const PersonalInfoForm = () => {
  const [enteredTeams, setEnteredTeams] = useState("თიმი");
  const [enteredPositions, setEnteredPositons] = useState("პოზიცია");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  console.log("errors", errors);
  const submitHandler = (e) => {
    console.log("submited");
    console.log("errors", errors);
  };

  const [teams, setTeams] = useState("");
  const [teamsIsVisible, setTeamsIsVisible] = useState(false);
  const [teamsId, setTeamsId] = useState("");

  const [positions, setPositions] = useState("");
  const [positionsIsVisible, setPositionsIsVisible] = useState(false);

  const [posdata, setposdata] = useState("");

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
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <div className={styles["name-surname-wrapper"]}>
        <div className={styles["name-wrapper"]}>
          <label
            className={`${styles.label} ${
              errors.name && styles["invalid-label"]
            }`}
          >
            სახელი
          </label>
          <input
            {...register("name", { required: true, pattern: /^[ა-ჰ]{2,}$/ })}
            className={`${styles["name-input"]} ${styles.input} ${
              errors.name && styles["invalid-border"]
            }`}
            type="text"
            placeholder="გრიშა"
          />
          <p
          className={`${styles.hint} ${errors.name && styles["invalid-hint"]}`}
          >
            მინიმუმ 2 სიმბოლო, ქართული ასოები
          </p>
        </div>
        <div className={styles["surname-wrapper"]}>
          <label
          className={`${styles.label} ${
            errors.surname && styles["invalid-label"]
          }`}
          >
            გვარი
          </label>
          <input
            {...register("surname", { required: true, pattern: /^[ა-ჰ]{2,}$/ })}
            className={`${styles["surname-input"]} ${styles.input} ${
              errors.surname && styles["invalid-border"]
            }`}
            type="text"
            placeholder="ბაგრატიონი"
          />
          <p
          className={`${styles.hint} ${
            errors.surname && styles["invalid-hint"]
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
            // className={`${styles["selected"]} ${
            //   !validTeams && styles["invalid-border"]
            // }`}
            onClick={selectTeamsChangeHandler}
          >
            <p className={styles["selected-text"]}>{enteredTeams}</p>
          </div>
          {teamsIsVisible && <ul className={styles.ul}>{teams}</ul>}
        </div>
        <div className={`${styles["select-block"]}`}>
          <div
            // className={`${styles["selected"]} ${
            //   !validPositions && styles["invalid-border"]
            // }`}
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
            errors.email && styles["invalid-label"]
          }`}
          >
            მეილი
          </label>
          <input
            {...register("email", {
              required: true,
              pattern: /^\S+@redberry.ge$/,
            })}
            className={`${styles["mail-input"]} ${styles.input} ${
              errors.email && styles["invalid-border"]
            }`}
            type="text"
            placeholder="grish666@redberry.ge"
          />
          <p
          className={`${styles.hint} ${
            errors.email && styles["invalid-hint"]
          }`}
          >
            უნდა მთავრდებოდეს @redberry.ge-ით
          </p>
        </div>
        <div className={styles["number-wrapper"]}>
          <label
          className={`${styles.label} ${
            errors.number && styles["invalid-label"]
          }`}
          >
            ტელეფონის ნომერი
          </label>
          <input
          {...register("number", {required: true, pattern: /^(\+995[0-9]{9})$/})}
            className={`${styles["number-input"]} ${styles.input} ${
              errors.number && styles["invalid-border"]
            }`}
            type="text"
            placeholder="+995 598 00 07 01"
          />
          <p
          className={`${styles.hint} ${
            errors.number && styles["invalid-hint"]
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
