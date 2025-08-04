import React from 'react'
import Task from '../Task/Task.jsx'
import styles from './TaskList.module.scss'

const TaskList = ({tasks, remove, editValue}) => {
    return (
        <div>
            <h2 className={styles.title}>
                {tasks.length 
                    ? "All tasks:"
                    : "No tasks today"
                } 
            </h2>
            <div className={styles.wrapper}>
                {tasks.map(task => 
                    <Task 
                        task={task} 
                        key={task.id}
                        remove={remove} 
                        editValue={editValue}
                    />
                )}
            </div>
        </div>
    )
}

export default TaskList;
