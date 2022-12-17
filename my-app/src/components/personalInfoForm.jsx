import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./../assets/styles/personalInfo.module.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

const teamsUrl = "https://pcfy.redberryinternship.ge/api/teams";
const positionsUrl = "https://pcfy.redberryinternship.ge/api/positions";

const PersonalInfoForm = () => {
  const [enteredTeams, setEnteredTeams] = useState("თიმი");
  const [enteredPositions, setEnteredPositons] = useState("პოზიცია");
  const [teams, setTeams] = useState("");
  const [teamsIsVisible, setTeamsIsVisible] = useState(false);
  const [teamsId, setTeamsId] = useState("");
  const [positionId, setPositionId] = useState("");

  const [positions, setPositions] = useState("");
  const [positionsIsVisible, setPositionsIsVisible] = useState(false);

  const [posdata, setposdata] = useState("");

  const [validTeams, setValidTeams] = useState(true);
  const [validPositions, setValidPositions] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const teamsPosSaver = (
      teamsId,
      teamsName,
      enteredPositions,
      positionId
    ) => {
      const data = {
        teamsId: teamsId,
        teamsName: teamsName,
        enteredPositions: enteredPositions,
        positionId: positionId,
      };
      localStorage.setItem("teams", JSON.stringify(data));
    };
    setTimeout(() => {
      teamsPosSaver(teamsId, enteredTeams, enteredPositions, positionId);
    }, 700);

    // console.log(enteredTeams)
  }, [enteredPositions, enteredTeams, teamsId]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("teams"));
    console.log(storageData);
    if (storageData) {
      setEnteredTeams(storageData.teamsName);
      setEnteredPositons(storageData.enteredPositions);
      setPositionId(storageData.positionId);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useFormPersist("userInfo", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  const submitHandler = (e) => {
    console.log("submited");
    selectsValidation();
    if (
      validTeams === true &&
      validPositions === true &&
      enteredTeams !== "თიმი" &&
      enteredPositions !== "პოზიცია"
    ) {
      history.push("/laptoppage");
    }
  };

  const onError = () => {
    selectsValidation();
  };

  const selectsValidation = () => {
    if (enteredTeams === "თიმი") {
      setValidTeams(false);
    } else {
      setValidTeams(true);
    }
    if (enteredPositions === "პოზიცია") {
      setValidPositions(false);
    } else {
      setValidPositions(true);
    }

    if (posdata[positionId - 1]?.team_id !== teamsId) {
      setValidPositions(false);
    } else {
      setValidPositions(true);
    }
  };

  const teamsChangeHandler = (id, name) => {
    setEnteredTeams(name);
    setTeamsId(id);
    setTeamsIsVisible(false);
    setValidTeams(true)
  };

  const positionsChangeHandler = (id, name) => {
    setEnteredPositons(name);
    setPositionsIsVisible(false);
    setPositionId(id);
    setValidPositions
  };

  const selectTeamsChangeHandler = () => {
    setPositionsIsVisible(false);
    setTeamsIsVisible(!teamsIsVisible);
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
    const data = fetchingTeams();
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
      console.log(response.data.data);
    }
    fetchingTeams();
  }, []);

  useEffect(() => {
    if (teamsId.length !== 0) {
      const filteredpositions = posdata.filter(
        (item) => item.team_id == teamsId
      );
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
      console.log(
        "teams sheicvala",
        teamsId,
        posdata[positionId - 1],
        positionId
      );
    }
  }, [enteredTeams, enteredPositions]);

  return (
    <form
      onSubmit={handleSubmit(submitHandler, onError)}
      className={styles.form}
    >
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
            {...register("name", {
              required: true,
              pattern: /^[ა-ჰ]{2,}$/,
            })}
            className={`${styles["name-input"]} ${styles.input} ${
              errors.name && styles["invalid-border"]
            }`}
            type="text"
            placeholder="გრიშა"
          />
          <p
            className={`${styles.hint} ${
              errors.name && styles["invalid-hint"]
            }`}
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
            {...register("surname", {
              required: true,
              pattern: /^[ა-ჰ]{2,}$/,
            })}
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
            {...register("number", {
              required: true,
              pattern: /^(\+995[0-9]{9})$/,
            })}
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
