import React from 'react';

export function useForm () {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  
  function handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const error = target.validationMessage;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: error});
    setIsValid(target.closest('form').checkValidity());
  }

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);    
    },
    [setValues, setErrors, setIsValid]
  );

  return {values, errors, isValid, handleChange, resetForm}
}