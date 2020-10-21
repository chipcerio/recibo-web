function Button({ type, onClick, label }) {
  return (
    <div
      className='btnContainer primary fontLight'
      onClick={onClick}
      type={type}
    >
      {label}
    </div>
  );
}

export default Button;
