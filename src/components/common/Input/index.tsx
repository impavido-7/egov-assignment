type InputProps = {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (arg: string | number) => void;
  required?: boolean;
};

const Input = (props: InputProps) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="mb-1">
        <label className="text-md">
          {props.label}{" "}
          {props.required ? <span className="text-red-500"> * </span> : null}
        </label>
      </div>
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full sm:w-52 border border-gray-300
          rounded px-2 py-3 outline-none
          focus:border-gray-700 shadow"
      />
    </div>
  );
};

export default Input;
