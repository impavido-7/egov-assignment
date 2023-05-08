type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="border border-gray-200 text-gray-500 shadow-lg">
      {/* Card title */}
      <div className="border-b-2 p-5 font-bold border-gray-200">{title}</div>

      {/* Card Body */}
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Card;
