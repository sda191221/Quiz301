const Input = ({ type, name, label, onChange, value }) => {
    return (
        <>
            <label>
                <input type={type} name={name} onChange={onChange} value={value} />
                {label}
            </label>
        </>
    );
};

export default Input;