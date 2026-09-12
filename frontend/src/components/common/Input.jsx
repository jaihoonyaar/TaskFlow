import "./Input.css";

const Input = ({
                   label,
                   error,
                   id,
                   ...props
               }) => {
    return (
        <div className="form-field">
            {label && (
                <label htmlFor={id}>
                    {label}
                </label>
            )}

            <input
                id={id}
                className={`form-input ${error ? "input-error" : ""}`}
                {...props}
            />

            {error && (
                <span className="form-error">
          {error}
        </span>
            )}
        </div>
    );
};

export default Input;