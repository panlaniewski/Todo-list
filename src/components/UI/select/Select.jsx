import React, { useState, useRef, useEffect } from 'react'
import styles from './Select.module.scss'
import Button from '../button/Button'

const Select = ({options, value, onChange, disabled}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        options.find(option => option.value === value)
    );

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option.value); 
    };

    return (
        <div className={styles.select}>
            <Button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
                className={styles.button}
            >
                {selectedOption ? selectedOption.name : 'Sort by'}
            </Button>
            <div 
                className={`${styles.content} ${isOpen ? styles.active : ''}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <ul className={styles.list}>
                    {options.map(option => (
                        <li
                            key={option.value}
                            className={styles.option} 
                            onClick={() => handleSelect(option)}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Select
