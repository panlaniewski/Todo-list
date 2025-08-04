import React, { useState, useCallback } from 'react'
import styles from './Task.module.scss'
import Checkbox from '../UI/checkbox/Checkbox'
import { useEditableField } from '../../hooks/useEditableField';
import editIcon from '../../assets/edit.svg';
import removeIcon from '../../assets/remove.svg';

const Task = ({task, remove, editValue}) => {
    const {id, title, desc, created, deadline, completed} = task;
    const titleField = useEditableField(title, (val) => editValue(id, 'title', val));
    const descField = useEditableField(desc, (val) => editValue(id, 'desc', val));
    const formattedDeadline = new Date(deadline).toLocaleTimeString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: "2-digit", 
        minute: "2-digit"
    })
    const isOverdue = !completed && new Date(deadline) < new Date();
    const deadlineClass = isOverdue ? `${styles.deadline} ${styles.overdue}` : styles.deadline;
    const taskBodyClass = completed ? `${styles.body} ${styles.checked}` : styles.body;
    const titleClass = completed ? `${styles.title} ${styles.checked}` : styles.title;
    const descClass = completed ? `${styles.desc} ${styles.checked}` : styles.desc;

    const handleToggleCompleted = useCallback(() => {
        editValue(id, 'completed', !completed);
    }, [id, completed, editValue]);

    return (
        <div className={styles.task}>
            <div className={deadlineClass}>
                {completed ? "Completed" : "Deadline: " + formattedDeadline}
            </div>
            <div className={taskBodyClass}>
                <div className={styles.head}>
                    <Checkbox 
                        checked={completed}
                        onChange={handleToggleCompleted} 
                    />
                    {titleField.isEditing ? (
                        <input 
                            type="text"
                            value={titleField.value}
                            onChange={titleField.handleChange}
                            onBlur={titleField.handleBlur}
                            onKeyDown={titleField.handleKeyDown}
                            autoFocus
                            className={styles.input}
                        />
                    ) : (
                        <h3 className={titleClass}>
                            {title}
                        </h3>
                    )}
                    {!completed && (
                        <button className={styles.edit} onClick={() => titleField.setIsEditing(true)}>
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.2587 6.73084C34.6279 13.2908 28.0337 22.2083 22.5158 26.6329L19.1504 29.3321C18.7233 29.6396 18.2962 29.9129 17.8179 30.1008C17.8179 29.7933 17.8008 29.4517 17.7496 29.1271C17.5617 27.6921 16.9125 26.3596 15.7679 25.215C14.6062 24.0533 13.1883 23.37 11.7362 23.1821C11.3946 23.165 11.0529 23.1308 10.7112 23.165C10.8992 22.6354 11.1896 22.14 11.5483 21.73L14.2133 18.3646C18.6208 12.8467 27.5725 6.21834 34.1154 3.60459C35.1233 3.22875 36.0971 3.50209 36.7121 4.13417C37.3612 4.76625 37.6687 5.74 37.2587 6.73084Z" style={{ stroke: "var(--main-color)" }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.8179 30.1008C17.8179 31.98 17.1004 33.7738 15.7508 35.1404C14.7088 36.1825 13.2908 36.9 11.5996 37.1221L7.39708 37.5833C5.10792 37.8396 3.14333 35.8921 3.41667 33.5688L3.87792 29.3663C4.28792 25.625 7.41417 23.2333 10.7283 23.165C11.07 23.1479 11.4288 23.165 11.7533 23.1821C13.2054 23.37 14.6233 24.0363 15.785 25.215C16.9296 26.3596 17.5787 27.6921 17.7667 29.1271C17.7837 29.4517 17.8179 29.7763 17.8179 30.1008Z" style={{ stroke: "var(--main-color)" }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M24.3267 24.7196C24.3267 20.2608 20.705 16.6392 16.2463 16.6392" style={{ stroke: "var(--main-color)" }} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    )}
                    <button className={styles.remove} onClick={() => remove(task)}>
                        <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.1299 7.29666C21.5101 7.29666 26.904 7.5359 32.2744 8.00272L34.5742 8.21658L34.6494 8.2283C35.0221 8.30359 35.2842 8.65045 35.2461 9.0369C35.2078 9.42326 34.883 9.71263 34.5029 9.71365L34.4258 9.70975L32.1445 9.49783C26.8163 9.03468 21.4657 8.79666 16.1299 8.79666C12.5252 8.79667 8.92042 8.97842 5.3154 9.34256L5.31345 9.34354L1.57322 9.70975L1.49607 9.71365C1.11624 9.71214 0.79195 9.42303 0.753881 9.0369C0.713467 8.62467 1.01451 8.25701 1.42673 8.21658L5.16501 7.85135V7.85037C8.81975 7.48122 12.4747 7.29667 16.1299 7.29666Z" style={{ fill: "var(--main-color)" }}/>
                            <path d="M20.4017 0.916656C22.041 0.91666 23.1424 1.27876 23.8324 2.07388C24.4777 2.81757 24.6236 3.81361 24.7523 4.60318H24.7533L25.1566 6.98697C25.2254 7.39519 24.9496 7.78214 24.5414 7.85123C24.1332 7.92004 23.7463 7.64514 23.6771 7.23697L23.2738 4.85318L23.2728 4.84927C23.1267 3.95292 23.0155 3.42035 22.6996 3.0563C22.427 2.74235 21.8603 2.41666 20.4017 2.41666H15.598C14.1283 2.41671 13.5693 2.72918 13.3031 3.03091C12.9932 3.38227 12.8827 3.90372 12.7259 4.83463L12.3226 7.23599L12.306 7.31119C12.2053 7.6775 11.8421 7.91541 11.4593 7.85123C11.0508 7.78262 10.7755 7.39546 10.8441 6.98697L11.2474 4.5856L11.3587 3.94888C11.4879 3.29095 11.692 2.58992 12.1781 2.03873C12.8698 1.25448 13.9703 0.916705 15.598 0.916656H20.4017Z" style={{ fill: "var(--main-color)" }}/>
                            <path d="M30.6068 14.0086C31.0199 14.0353 31.3334 14.3914 31.307 14.8045L30.1156 33.2664L30.1146 33.2703C30.065 33.9787 30.0143 34.709 29.8792 35.3797C29.7426 36.0582 29.5104 36.7297 29.0628 37.3123C28.1408 38.5125 26.5179 39.0838 23.8851 39.0838H12.1146C9.48191 39.0837 7.85883 38.5126 6.93686 37.3123C6.48934 36.7297 6.2571 36.0582 6.12045 35.3797C5.9854 34.709 5.93473 33.9786 5.8851 33.2703V33.2664L4.6937 14.8045C4.66726 14.3913 4.98068 14.0353 5.39389 14.0086C5.80706 13.9822 6.16312 14.2956 6.18979 14.7088L7.38217 33.1697H7.3812C7.43229 33.8989 7.47894 34.5266 7.59116 35.0838C7.702 35.6341 7.86808 36.062 8.12631 36.3983C8.61594 37.0357 9.63301 37.5837 12.1146 37.5838H23.8851C26.3669 37.5838 27.3837 37.0357 27.8734 36.3983C28.1317 36.0619 28.2987 35.6342 28.4095 35.0838C28.5219 34.5256 28.5673 33.8966 28.6185 33.1658L29.8099 14.7088C29.8366 14.2954 30.1934 13.9819 30.6068 14.0086Z" style={{ fill: "var(--main-color)" }}/>
                            <path d="M21.0438 27.5L21.12 27.5039C21.4982 27.5423 21.7938 27.8617 21.7938 28.25C21.7938 28.6383 21.4982 28.9577 21.12 28.9961L21.0438 29H14.9384C14.5241 29 14.1884 28.6642 14.1884 28.25C14.1884 27.8358 14.5241 27.5 14.9384 27.5H21.0438Z" style={{ fill: "var(--main-color)" }}/>
                            <path d="M22.5836 20.1667L22.6598 20.1706C23.0381 20.2089 23.3336 20.5283 23.3336 20.9167C23.3336 21.305 23.0381 21.6244 22.6598 21.6628L22.5836 21.6667H13.4166C13.0024 21.6667 12.6666 21.3309 12.6666 20.9167C12.6666 20.5024 13.0024 20.1667 13.4166 20.1667H22.5836Z" style={{ fill: "var(--main-color)" }}/>
                        </svg>
                    </button>
                </div>
                {(descField.isEditing || desc.trim()) && (
                    descField.isEditing ? (
                        <textarea 
                            value={descField.value}
                            onChange={descField.handleChange}
                            onBlur={descField.handleBlur}
                            onKeyDown={descField.handleKeyDown}
                            autoFocus
                            className={styles.textarea}
                        />
                    ) : (
                        <div 
                            className={descClass}
                            onClick={() => completed ? null : descField.setIsEditing(true)}
                        >
                            <p>{desc}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Task;
