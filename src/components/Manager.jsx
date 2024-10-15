import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);


  const getPassword = async()=>{
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords)
    setPasswordArray(passwords);

  }
  
  useEffect(() => {
    getPassword();
   
  }, [])


  const copyText = (text) => {
    toast('🦄Item Copied to clipboard', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    navigator.clipboard.writeText(text);
  }

  const savePassword = async () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){

      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id:form.id})})

      toast('🦄 saved successfully', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    setPasswordArray([...passwordArray, {...form,id: uuidv4()}])
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form,id: uuidv4()}]))
    await fetch("http://localhost:3000/",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
    console.log([...passwordArray, form]);
    setForm({ site: "", username: "", password: "" });
  }
  else{
    toast("Error: enter atleast 3 characters ", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  }
  
  const deletePassword= async(id)=>{
    console.log("deleted " + id);
    let c = confirm("do you really want to delete this item?");
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id})})
      toast('🦄Item Deleted!!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }
  
  const editPassword=(id)=>{
    setForm({...passwordArray.filter(i=>i.id===id)[0],id: id});
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (  
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition= "Bounce"/><ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className="py-5 md:mycontainer">
        <h1 className="text-4xl text font-bold text-center"> <span className="text-green-700"> &lt;</span>
          Password
          <span className="text-green-600"> Manager/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">your own Password Manager</p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">

          <input value={form.site} onChange={handleChange} placeholder="Enter website URL" type="text" name="site" className="rounded-full border border-green-500 w-full p-4 py-1" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">

            <input value={form.username} onChange={handleChange} placeholder="Enter Username" type="text" name="username" className="rounded-full border border-green-500 w-full p-4 py-1" />
            <div className="relative">
              <input value={form.password} onChange={handleChange} placeholder="Enter Password" type="password" name="password" className="rounded-full border border-green-500 w-full p-4 py-1" />

            </div>
          </div>
          <button onClick={savePassword} className=" flex justify-center items-center w-fit bg-green-500 rounded-full px-8 py-3 hover:bg-green-400 gap-2 border border-green-900">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save password</button>
        </div>
        <div className="passwords">

          <h2 className="font-bold text-xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-2 border border-white">Site</th>
                <th className="py-2 border border-white">Username</th>
                <th className="py-2 border border-white">Password</th>
                <th className="py-2 border border-white">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-200">
              {passwordArray.map((item, index) => {
                return <tr key={index} >
                  <td className="py-2 border border-white text-center gap-5 " >
                    <div className="flex gap-3 p-2">
                      <a href={item.site} target="_black">{item.site}</a>
                      <div onClick={()=>{copyText(item.site)}}>
                        <img className="hover:animate-bounce  w-5 cursor-pointer"  src="icons/copy.png" alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 border border-white text-center gap-5">
                    <div className="flex gap-3 p-2">
                      <span>{item.username}</span>
                      <div onClick={()=>{copyText(item.username)}}>
                        <img className="hover:animate-bounce w-5 cursor-pointer" src="icons/copy.png" alt="" />
                      </div>
                    </div>
                  </td>
                  <td className="py-2 border border-white text-center gap-5">
                    <div className="flex gap-3 p-2 " >
                      <span>{"*".repeat(item.password.length)}</span>
                      <div onClick={()=>{copyText(item.password)}}>
                        <img className="hover:animate-bounce w-5 cursor-pointer" src="icons/copy.png" alt="" />
                      </div>
                    </div>
                  </td>
                  <td className=" p-2 py-2 border border-white text-center">
                    <div className="flex justify-center gap-3" >
                    <span className="p-1 " onClick={()=>{deletePassword(item.id)}}><img className="hover:animate-bounce w-5 cursor-pointer" src="icons/delete.png" alt="" /></span>
                    <span className="p-1 " onClick={()=>{editPassword(item.id)}}><img className="hover:animate-bounce w-5 cursor-pointer" src="icons/edit.png" alt="" /></span>
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
