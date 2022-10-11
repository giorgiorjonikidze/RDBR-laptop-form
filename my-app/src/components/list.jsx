import styles from "./../assets/styles/list.module.css";
import React from "react";
import { useHistory} from 'react-router-dom';

const ListItem = (props) => {
    const history = useHistory()
    const clickHandler = () => {
      history.push("/laptop/"+props.id)
    }

    

  return (
    <li className={styles.list}>
      <img src={props.image} className={styles.img} />
      <div className={styles["info-wrapper"]}>
        <p className={styles.name}>
          {props.name} {props.surname}
        </p>
        <p className={styles.cpu}>{props.cpu}</p>
        <button onClick={clickHandler} className={styles.button}>მეტის ნახვა</button>
      </div>
    </li>
  );
};

export default ListItem;
