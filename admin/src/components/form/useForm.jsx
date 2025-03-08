import { convertMoneyVND, isNumber } from "@/utils/string";
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
    }
  }, [formState]);

  const onChange = (e, index) => {
    let { name, value } = e.target;
    if (isNumber(value)) {
      value = parseFloat(value);
    }

    if (name === 'price') {
      value = convertMoneyVND(value);
    }


    let errors = {};
    if (index > -1) {
      errors[index] = {
        ...errors[index],
        ...validate(formScreen, name, value),
      };
    } else {
      errors = validate(formScreen, name, value);
    }

    if (index > -1) {
      const updatedValues = [...formState.values];
      updatedValues[index][name] = value;
      setFormState((prev) => {
        return {
          ...prev,
          errors: { ...errors },
          values: updatedValues,
        };
      });
    } else {
      setFormState((prev) => {
        return {
          ...prev,
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
    const { name, value } = e.target;
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
    setFormState((prev) => {
      return {
        ...prev,
        errors: errors,
        onSubmit: (e) => onSubmit(e),
        isSubmitting: true,
      };
    });
  };

  return { onChange, handleSubmit, handleClearError, formState };
};

export default useForm;
