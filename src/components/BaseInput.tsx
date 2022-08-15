type InputProps = {
    placeholder: string;
    type: string;
    handleChange: (value: string) => void;
    className?: string;
}

export const BaseInput = ({placeholder, type, handleChange, className}: InputProps) => {
  return (
    <input className={className} type={type} placeholder={placeholder} onChange={(e) => handleChange(e.target.value)} />
  )
}
