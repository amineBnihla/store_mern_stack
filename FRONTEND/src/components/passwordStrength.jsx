import { IoIosCheckmark ,IoIosClose} from "react-icons/io"

export function PasswordCheck({password}){

    const criteria = [
        {message:"Contains uppercase letter",pattern: /[A-Z]/.test(password)},
        {message:"Contains at least 8 charactere",pattern: password.length > 8},
        {message:"Contains lowercase letter",pattern: /[a-z]/.test(password)},
        {message:"Contains number",pattern: /\d/.test(password)},
        {message:"Contains special charactere",pattern: /[^A-Za-z0-9]/.test(password)}
    ]
 
    return<>
   
     
        <div>
            {
                criteria.map((cr,index)=>(
                    <div key={index} className="flex gap-2 text-white text-xl">
                     {cr.pattern ? <IoIosCheckmark size={20} color="#6DCF9D"/> : <IoIosClose size={20} color="#6DCF9D"/>}
                     {cr.message}
                    </div>
                ))
            }
        </div>

    </>

}

export default function PasswordStrength({password}){
    function getStrength(){
        let strengt=0
        if(/[A-Z]/.test(password) && /[a-z]/.test(password)) strengt++
        if(/\d/.test(password)) strengt++
        if(/[^A-Za-z0-9]/.test(password)) strengt++
        if(password.length > 8) strengt++
        return strengt
    }
    const strength = getStrength()
    function getColor(strength){
        if (strength === 0) return "bg-red-500";
		if (strength === 1) return "bg-red-400";
		if (strength === 2) return "bg-yellow-500";
		if (strength === 3) return "bg-yellow-400";
		return "bg-green-500";
    }
     function getStrengthText(strength){
       if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
    }
    
     return <>
     <div className="my-2">
     <div className="flex justify-between ">
            <span className="text-xl text-slate-200">Password strength</span>
            <span className="text-xl text-slate-200">{getStrengthText(strength)}</span>
        </div>
        <div className="flex gap-[2px] mt-2 mb-3">
            {
              [...Array(4)].map((val,index)=>(
                <div className={"h-[4px] flex-grow rounded-sm "+(index < strength ? getColor(strength): 'bg-gray-600')} key={index}>
                </div>
              ))
            }
        </div>
        <PasswordCheck password={password}/>
     </div>
     </>  

}