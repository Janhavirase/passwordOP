import React, { useRef, useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {v4 as uuidv4} from 'uuid';
const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const ref = useRef();
  const [passwordArray,setpasswordArray]=useState([])
  const passwordref=useRef();
  const showPassword = () => {
    passwordref.current.type="text";
    if (ref.current.src.includes("/eye.png")) {
      ref.current.src = "/eee.png";
        passwordref.current.type="password";
    } else {
      ref.current.src = "/eye.png";
        passwordref.current.type="text";
    }
  };
const getpasswords=()=>{
let req=fetch("https://localhost:3000/");
let passwords=localStorage.getItem("passwords");
console.log(passwords)
    setpasswordArray(passwords)
  
}
  useEffect(() => {
  getpasswords()
  
  }, [])
  
const copyText=(text)=>{
  toast('Copied to clipboard', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
navigator.clipboard.writeText(text)
}









  const savepassword = async() => {
    console.log(form);
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){

      //if any exists delete it
         await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id:form.id})})

  setpasswordArray([...passwordArray,{...form,id:uuidv4()}])
  await fetch("http://localhost:3000/",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
  setform({ site: "", username: "", password: "" })
  localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id:uuidv4()}]))
  console.log([...passwordArray,form])
    toast('Password saved!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

    });
  }else{
     toast('Error: Fill all the fields', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

    });
  }
  };


  const deletepassword =async(id) => {
    console.log("deleteing ",id);
  setpasswordArray(passwordArray.filter(item=>item.id!==id))
    let res=fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id})})

 // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast('Deleted successfully', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
  };

  
  const editpassword = (id) => {
    console.log("editing ",id);
  setform({...passwordArray.filter(i=>i.id===id)[0],id:id})
  setpasswordArray(passwordArray.filter(item=>item.id!==id))

  };


  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <div className=' p-2 md:p-0 md:mycontainer text-white min-h-[88.2vh]'>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-700'>&lt;</span>
          <span className='text-pink-700'>Pass</span>
          <span className='text-green-700'>OP/&gt;</span>
        </h1>
        <p className='text-center text-black font-bold'>Your own password manager</p>

        <div className='text-black flex flex-col p-4 gap-5 align-center'>
          <input
            value={form.site}
            onChange={handlechange}
            placeholder='Enter website URL'
            className="rounded-lg border-2 border-black w-full px-4 py-1"
            type="text"
            name="site"
            id='site'
          />

          <div className="flex flex-col md:flex-row justify-between gap-5 w-full">
            <input
              value={form.username}
              name="username"
              onChange={handlechange}
              placeholder='Enter username'
              className='rounded-lg border-2 border-black w-full px-4 py-1 text-black'
              type="text"
              id='username'
            />

            <div className="relative w-full">
              <input ref={passwordref}
                value={form.password}
                name="password"
                onChange={handlechange}
                placeholder='Enter password'
                className='rounded-lg border-2 border-black w-full px-4 py-1 text-black'
                type="password"
                id='password'
              />
              <span
                className='absolute right-[8px] top-[8px] cursor-pointer'
                onClick={showPassword}
              >
                <img ref={ref} className='w-5' src="/eye.png" alt="toggle visibility" />
              </span>
            </div>
          </div>

          <div className="mx-auto">
            <button
              onClick={savepassword}
              className='border-2 border-green-500 flex mx-auto text-black bg-green-500 justify-center items-center hover:bg-green-700 rounded-full px-4 py-2 gap-2'
            >
              <lord-icon
                src="https://cdn.lordicon.com/sbnjyzil.json"
                trigger="hover"
                style={{ width: "20px", height: "20px" }}
              >
              </lord-icon>
              Save Password
            </button>
          </div>
          <div className="passwords">
            <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
            {passwordArray.length===0 && <div>No passwords </div>}
            {passwordArray.length!=0 &&  
            <table className="table-auto w-full overflow-hidden rounded-xl mb-10">
  <thead className='bg-green-700 text-white '>
    <tr>
      <th className='py-2'>Site</th>
      <th className='py-2'>Username</th>
      <th className='py-2'>Password</th>
      <th className='py-2'>Actions</th>

    </tr>
  </thead>
  <tbody className='bg-green-100'>
    {passwordArray.map((item,index)=>{
    return  <tr key={index}>
      <td className=' py-2 border border-white  text-center '>
        <div className='flex justify-center items-center'>
      <span> <a href={item.site} target='_blank' >{item.site}</a></span>
     <div className= "lordiconcopy cursor-pointer" onClick={()=>{copyText(item.site)}}>
      <lord-icon 
       style={{"width":"25px","height":"25px"}}
    src="https://cdn.lordicon.com/xuoapdes.json"
    trigger="hover">
    
</lord-icon>
</div>
</div>
    
      </td>
      <td className='  py-2  border border-white  text-center '>
      <div  className='flex justify-center item-center'>
        <span>{item.username}</span>
          <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.username)}}>
            
      <lord-icon 
       style={{"width":"25px","height":"25px"}}
    src="https://cdn.lordicon.com/xuoapdes.json"
    trigger="hover">
    
</lord-icon>
</div>
        
      </div> 
      </td>
      <td className='justify-center py-2  border border-white  text-center '>
      <div className='flex items-center justify-center'>
            <span>{"*".repeat(item.password.length)}</span>
          <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.password)}}>
      <lord-icon 
       style={{"width":"25px","height":"25px"}}
       src="https://cdn.lordicon.com/xuoapdes.json"
       trigger="hover">
    
</lord-icon>
</div>
      </div>
      </td>
      <td className= '  justify-center py-2`  border border-white text-center'>
        <span className='cursor-pointer mx-2'onClick={()=>{editpassword(item.id)}}><lord-icon
    src="https://cdn.lordicon.com/nwfpiryp.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>


<span className='cursor-pointer mx-2' onClick={()=>{deletepassword(item.id)}}><lord-icon
    src="https://cdn.lordicon.com/wqftjceu.json"
    trigger="hover"
    style={{"width":"25px","height":"25px"}}>
</lord-icon></span>
      </td>
    </tr>
    })}
   
   
  </tbody>
</table>}
          </div>
        
        </div>
      </div>
    </>
  );
};

export default Manager;
