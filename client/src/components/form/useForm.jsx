import { isNumber } from "@/utils/string";
import { useEffect, useState } from "react";
import { validate, validateEntireValues } from "./validate";
const useForm = (formScreen, defaultValues) => {
  const [formState, setFormState] = useState({
    isSubmitting: false,
    values: defaultValues,
    errors: {},
    onSubmit: undefined,
  });
  useEffect(() => {
    setFormState((prev) => {
      return {
        ...prev,
        values: defaultValues,
      };
    });
  }, [defaultValues]);

  useEffect(() => {
    //Validate Success
    if (formState.isSubmitting && Array.isArray(formState.errors)) {
      if (!formState.errors.find((object) => Object.keys(object).length > 0))
        formState.onSubmit();
    } else {
      if (
        formState.isSubmitting &&
        !Object.entries(formState.errors).some((arr) => arr[1])
      ) {
        formState.onSubmit(formState);
      }
    }
  }, [formState]);

  const onChange = (e, index) => {
    let { name, value } = e.target;
    if (isNumber(value)) {
      value = parseFloat(value);
    }

    let errors = {};
    if (index > -1) {
      errors[index] = {
        ...errors[index],
        ...validate(formScreen, name, value),
      };
    } else {
      errors = validate(formScreen, name, value);
      if (!errors || Object.keys(errors).length === 0) {
        errors[name] = undefined;
      }
    }

    if (index > -1) {
      const updatedValues = [...formState.values];
      updatedValues[index][name] = value;
      setFormState((prev) => {
        return {
          ...prev,
          errors: { ...prev.errors, ...errors },
          values: updatedValues,
        };
      });
    } else {
      setFormState((prev) => {
        return {
          ...prev,
          isSubmitting: false,
          errors: { ...prev.errors, ...errors },
          values: {
            ...prev.values,
            [name]: value,
          },
        };
      });
    }
  };

  const handleClearError = (e, index) => {
    const { name } = e.target;
    const updateError = { ...formState.errors };

    if (index > -1) {
      if (updateError && updateError[index] && updateError[index][name]) {
        updateError[index][name] = {};
        setFormState((prev) => {
          return {
            ...prev,
            errors: { updateError },
          };
        });
      }
    } else {
      updateError[name] = {};
      setFormState((prev) => {
        return {
          ...prev,
          errors: { updateError },
        };
      });
    }
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();

    const errors = validateEntireValues(formScreen, formState.values);
    const newFormState = {
      ...formState,
      errors: errors,
      isSubmitting: true,
      onSubmit: (formState) => onSubmit(formState),
    };
    setFormState(newFormState);
  };

  const setValues = (key, value) => {
    setFormState((prev) => {
      return {
        ...prev,
        isSubmitting: false,
        values: {
          ...prev.values,
          [key]: value,
        },
      };
    });
  };
  const getValues = (key) => {
    const values = formState.values;
    if (key) {
      if (!Array.isArray()) {
        return values[key];
      }
    } else {
      return values;
    }
  };

  return {
    onChange,
    handleSubmit,
    handleClearError,
    formState,
    setValues,
    getValues,
  };
};

export default useForm;
