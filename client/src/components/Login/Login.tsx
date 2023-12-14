import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import styles from './login.module.scss'
import Form from '../Form/Form';
import Title from '../Title/Title';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function Login(){
  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        <div className={styles.container}>
          <Form>
            <Title title='ChatApp'/>
            <div className={styles.subContainer}>
             <label className={styles.subLabel}>Username</label>
            </div>
            <Input/>
            <div className={styles.subContainer}>
             <label className={styles.subLabel}>Username</label>
            </div>
            <Input/>
            <Button title='Log In'/>
            <hr className={styles.hr}></hr>
            <Link to='/register'>
              <Button title='Create New Account'/>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  )
}