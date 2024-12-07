import { useEffect, useRef } from "react"

function TextInputVerify({value,onchange,onkeyup,index,focused}) {
    const textRef = useRef(index)
    useEffect(()=>{
        console.log(focused)
        if(focused) textRef.current.focus()
    },[focused])
  return (
    <input pattern="[0-9]" value={value}  onKeyUp={onkeyup} ref={textRef} maxLength={1}  onChange={onchange} 
    className="size-20 text-center outline-none focus:border text-white focus:border-[#6DCF9D] py-3 px-4 rounded-md bg-[#1F3134]" />

  )
}

export default TextInputVerify
