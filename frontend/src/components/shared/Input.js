export default function textInput({label, placeholder, type, value, setValue, labelClassName}) {
  return (
    <div className="form-group mb-3 fw-bold mx-1 w-100">
      <label for={label} style={{fontSize: "0.9rem"}} className={labelClassName}>{label}</label>
      <input type={type} className="form-control mt-2 border-3 py-2 input-bold" id={label} placeholder={placeholder} onChange={(e)=>{
        setValue(e.target.value);
      }}/>
    </div>
  )
}
