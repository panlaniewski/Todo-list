import React, { useState, useEffect } from 'react'
import './styles/App.scss'
import Button from './components/UI/button/Button.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import From from './components/Form/From.jsx';
import Modal from './components/Modal/Modal.jsx';
import Select from './components/UI/select/Select.jsx';
import iconMoon from './assets/moon.svg';
import iconSun from './assets/sun.svg';
// --------------------------------------------------------------------------------------------------------------------------------
function App() {
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
    });
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : []
    });
    const [isVisible, setIsVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme'));
// --------------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
// ---------------------------------------------------------------------------------------------------------------------------------
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
    const createTask = (newTask) => {
        setTasks([...tasks, newTask])
        setIsVisible(false)
    }
    const removeTask = (task) => {
        setTasks(tasks.filter(item => item.id !== task.id));
    }
    const editValue = (id, key, newValue) => {
        setTasks(prevTasks => 
            prevTasks.map(task =>
                task.id === id ? { ...task, [key]: newValue } : task
            )
        );
    }
    const sortTasks = (sort) => {
        setSelectedSort(sort)
        let sorted = [...tasks];
        switch (sort) {
            case "first-new":
                sorted.sort((a, b) => new Date(b.created) - new Date(a.created));
                break;
            case "first-old":
                sorted.sort((a, b) => new Date(a.created) - new Date(b.created));
                break;
            case "active":
                sorted.sort((a, b) => a.completed - b.completed);
                break;
            default:
                sorted.sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        setTasks(sorted);
    }
// ---------------------------------------------------------------------------------------------------------------------------------    
    return (
        <div className="page">
            <div className="page__container">
                <div className="page__head">
                    <div className="page__uphead">
                        <h1 className="page__title">TODO LIST</h1>
                        <div className="page__date">{date}</div>
                        <Modal isVisible={isVisible} setVisible={setIsVisible}>
                            <From create={createTask}/>
                        </Modal>
                    </div>
                    <div className="page__theme theme">
                        <button 
                                className={`theme__btn ${theme === 'light' ? 'dark' : 'light'}`}
                                onClick={toggleTheme}
                        >
                            <img src={ theme === 'light' ? iconMoon : iconSun } alt="theme icon" />
                        </button>
                    </div>
                </div>
                <div className="page__body">
                    <div className="page__btns">
                        <Button onClick={() => setIsVisible(true)}>Add task</Button>
                        <Select 
                            value={selectedSort}
                            onChange={sortTasks}
                            options={[
                                { value: 'title', name: 'By title' },
                                { value: 'deadline', name: 'By deadline' },
                                { value: 'first-old', name: 'Old first' },
                                { value: 'first-new', name: 'New first' },
                                { value: 'active', name: 'Active' },
                            ]} 
                        /> 
                    </div>
                    <TaskList 
                        tasks={tasks} 
                        remove={removeTask} 
                        editValue={editValue}
                    />
                </div>
            </div>
        </div>
    )
}

export default App