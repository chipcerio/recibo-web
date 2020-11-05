function Button({ type, onClick, label, disable }) {
  return (
    <div
      className={`primary fontPrimary ${
        disable ? 'btnDisable' : 'btnContainer'
      }`}
      onClick={onClick}
      type={type}
    >
      {label}
    </div>
  );
}

export default Button;
