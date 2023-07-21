interface IInputProps {
  label?: string,
  id?: string,
  type?: React.HTMLInputTypeAttribute,
  value?: string,
  writable(arg: unknown): void
}

function InputXD({ label, id, type, writable, value }: IInputProps) {
  
  return (
    <>
      <label htmlFor={id}>{label}</label><br/>
      <input type={type} id={id} onChange={e => writable(e.target.value)} value={value}/>
    </>
  )
}

export default InputXD