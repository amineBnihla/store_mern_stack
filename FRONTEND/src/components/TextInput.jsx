



function TextInput({value,modifierValue,Icon,Label,type="text"}) {
  return (
    <div className="flex w-full items-center gap-3 bg-[#1F3134] rounded-lg pl-3">
        <Icon size={'20px'} color={"#6DCF9D"} />
        <input type={type} value={value} className="placeholder:text-gray-400 w-full pr-7 placeholder:text-[1.5rem] text-[1.5rem] bg-transparent h-14 border-none outline-none text-white"  onChange={modifierValue} placeholder={Label}  />
      </div>
  )
}

export default TextInput
