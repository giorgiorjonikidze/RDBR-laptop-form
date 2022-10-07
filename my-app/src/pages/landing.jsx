import React, {useEffect} from "react";
import redberryLogoText from "./../assets/images/redberry-logo-text.svg"
import mainImg from "./../assets/images/landing-main.svg"
import mainImgMobile from './../assets/images/landing-mobile.svg'
import styles from './../assets/styles/landing.module.css'
import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Landing = () => {
    const history = useHistory()
    const [image, setImage] = useState()
    useEffect(() => {
        let mediaQuery = window.matchMedia("(max-width: 415px)");
        if(mediaQuery.matches) {
            setImage(<img className={styles['img-main']} src={mainImgMobile} />)
        } else {
            setImage(<img className={styles['img-main']} src={mainImg} />)
        }
      }, []);
  return (
    <div className={styles['main-block']}>
      <img className={styles['img-logo']} src={redberryLogoText} />
      {image}
      <button onClick={() => history.push('/personalinfo')} className={`${styles.button} ${styles.btn}`}>ჩანაწერის დამატება</button>
      <button onClick={() => history.push('/recordslist')} className={`${styles.button}`}>ჩანაწერების სია</button>
    </div>
  );
};

export default Landing;