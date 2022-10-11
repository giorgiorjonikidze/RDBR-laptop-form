import React from 'react';
import SuccessImage from './../assets/images/celebrate-last-icon.svg'
import styles from './../assets/styles/success.module.css'
import { useHistory } from 'react-router-dom';

const Success = () => {
    const history = useHistory()
    return (
        <div className={styles.main}>
            <div className={styles.block}>
                <img src={SuccessImage} className={styles.img} />
                <h1 className={styles.h1}>ჩანაწერი დამატებულია!</h1>
                <button onClick={() => history.push('/laptoplist')} className={styles.btn}>სიაში გადაყვანა</button>
                <button onClick={() => history.push('/landing')} className={styles['go-to-main']}>მთავარი</button>
            </div>
            
        </div>
    );
}
 
export default Success;