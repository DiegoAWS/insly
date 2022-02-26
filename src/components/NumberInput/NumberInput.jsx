import { InputAdornment, TextField } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'

function NumberInput({
    initialValue,
    value,
    setValue,
    functionOnChange,
    functionOnBlur,
    checkErrorsFunc,
    label = "",
    helperText = "",
    endAdormentText = "",
    checkingForErrors,
    ...props
}) {

    const [valueError, setValueError] = useState(false);

    const updateValue = useCallback((event) => {
        const myValue = event?.target?.value || "";
        const cleanedValue = functionOnChange ? functionOnChange(myValue) : value;

        if (cleanedValue !== null) {
            setValue(cleanedValue);
        }
    }, [functionOnChange, setValue, value]);

    const checkForErrors = useCallback(() => {
     
        if (checkErrorsFunc && checkErrorsFunc(value)) {
            setValueError(true);
            setTimeout(() => {
                setValue(initialValue);
                setValueError(false);
            }, 2000);

            return true
        }
        return false
    }, [checkErrorsFunc, value, setValue, initialValue]);

    const onBlurCarValue = useCallback(() => {

        if (checkForErrors() && functionOnBlur) {
            setValue(functionOnBlur);
        }
    }, [checkForErrors, functionOnBlur, setValue]);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue, setValue]);

    useEffect(() => {
        if (checkingForErrors) {
            checkForErrors();
        }
    }, [checkForErrors, checkingForErrors])

    return (
        <>
            <TextField
                {...props}
                value={value}
                onChange={updateValue}
                InputProps={{
                    endAdornment: endAdormentText ? <InputAdornment position="end">{endAdormentText}</InputAdornment> : null,
                }}
                onBlur={onBlurCarValue}
                InputLabelProps={{
                    shrink: true
                }}
                label={label}
                type="text"
                error={valueError}
                helperText={helperText}
            />
        </>
    )
}

export default memo(NumberInput)