import { Controller } from "react-hook-form";
import "../components/styles/InputField.css";

/**
 * InputField Component
 * A reusable input component for use with react-hook-form.
 * The defaultValue is set to an empty string to ensure controlled input.
 */
const InputField = ({ name, control, label, type = "text", error }) => {
  return (
    <div className="input-field-container">
      <label htmlFor={name} className="input-field-label">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue="" // Ensure the input is always controlled
        render={({ field }) => (
          <input
            id={name}
            {...field}
            type={type}
            value={field.value || ""} // Fallback to empty string if undefined
            className="input-field-input"
          />
        )}
      />
      {error && <p className="input-field-error">{error}</p>}
    </div>
  );
};

export default InputField;
