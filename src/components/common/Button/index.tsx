type ButtonProps = {
  children: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full sm:w-52 bg-red-400 text-white px-3 py-2 rounded hover:scale-95 transition text-sm"
    >
      {children}
    </button>
  );
};

export default Button;
