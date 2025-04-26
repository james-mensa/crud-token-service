export function isFormFilled<T extends Record<string, any>>(
    form: T,
    requiredFields?: (keyof T)[],
    excludeFields?: (keyof T)[]
  ): boolean {
    const fieldsToCheck = requiredFields ?? (Object.keys(form) as (keyof T)[]);
    
    return fieldsToCheck.every((fieldKey) => {
      if (excludeFields?.includes(fieldKey)) {
        return true;
      }
  
      const field = form[fieldKey];
      const value = typeof field.value === "string" ? field.value.trim() : field.value;
      const isValid = field.isValid !== undefined ? field.isValid : true;
  
      return value !== "" && isValid;
    });
  }
  