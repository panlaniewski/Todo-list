import { useCallback, useState } from "react";

export const useEditableField = (initialValue, callback) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((e) => setValue(e.target.value), []);

    const handleBlur = useCallback(() => {
        if (value.trim()) {
            callback(value.trim());
        }
        setIsEditing(false);
    }, [value, callback]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
        else if (e.key === 'Escape') {
            setValue(initialValue);
            setIsEditing(false);
        }
    }, [initialValue, handleBlur]);

    return { isEditing, setIsEditing, value, handleChange, handleBlur, handleKeyDown };
};