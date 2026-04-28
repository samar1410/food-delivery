import { useState } from "react";


export default function LanguageSelect(){
    const[lang,setlang]=useState("ar");
    return(
        <select value={lang} onChange={(e)=>setlang(e.target.value)} className=" border border-gray-400 w-[200px] p-2 rounded">
            
            <option value="en">English</option>
            
        </select>
    )
}