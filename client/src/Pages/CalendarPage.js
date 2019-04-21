import React from 'react'
import Calendar from './Scheduler/Calendar'
import Navigation from '../components/Navigation'
import styles from './CalenderPage.css'; 
const CalendarPage = (props) => {
    return(
        
        <div>
        <Navigation/>
        <div className={styles.Calendar}>
        <Calendar />  
        </div> 
        </div>
        );
    
};
export default CalendarPage