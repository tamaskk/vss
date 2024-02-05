interface InputProps {
  id: string;
  label: string;
  className?: string;
  type?: string;
  value?: string;
  readonly?: boolean;
  placeholder?: string;
  extraDivClasses?: string;
  extraInputClasses?: string;
  extraLabelClasses?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  label,
  type,
  value,
  readonly,
  placeholder,
  extraDivClasses,
  extraInputClasses,
  extraLabelClasses,
  onChange,
}: InputProps) => {
  return (
    <div className={`flex flex-col ${extraDivClasses} gap-2`}>
      <label className={`text-xl w-80 text-black ${extraLabelClasses}`}>{label}</label>
      <input
        type={type}
        id={id}
        className={`py-2 px-2 w-80 rounded-sm focus:outline-none active:outline-none text-black ${extraInputClasses}`}
        readOnly={readonly}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
