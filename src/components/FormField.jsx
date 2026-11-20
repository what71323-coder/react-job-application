export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows,
  accept,
  maxLength,
}) {
  return (
    <div className={`form-field ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>
        {label}
        {required && <span className="required">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 4}
          maxLength={maxLength}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={type === "file" ? undefined : value}
          onChange={onChange}
          placeholder={placeholder}
          accept={accept}
        />
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}