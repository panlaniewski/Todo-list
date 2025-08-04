import React, { useState } from 'react'
import Button from '../UI/button/Button'
import Input from '../UI/input/Input'
import styles from './Form.module.scss'

const From = ({create}) => {
    const [task, setTask] = useState({title: '', desc: '', deadline: ''})
    
    const addNewTask = (e) => {
        e.preventDefault();
        const newTask = {
            ...task, 
            id: Date.now(),
            created: new Date().toISOString(),
            completed: false,
        }
        create(newTask)
        setTask({title: '', desc: '', deadline: ''})
    }
    return (
        <form className={styles.form}>
            <Input 
                value={task.title}
                onChange={e => setTask({...task, title: e.target.value})}
                placeholder="title (required)" 
                type="text" 
            />
            <Input 
                value={task.desc}
                onChange={e => setTask({...task, desc: e.target.value})}
                type="text"
                placeholder='description'
            />
            <label>Chose deadline (required):</label>
            <input 
                type="datetime-local"
                onChange={e => setTask({...task, deadline: e.target.value})}
                className={styles.date}
                min={new Date().toISOString().slice(0, 16)}
            />
            <Button 
                onClick={addNewTask}
                disabled = {task.title && task.deadline ? false : true}
            >
                Create task
            </Button>
        </form>
    )
}

export default From
