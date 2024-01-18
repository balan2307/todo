import { AuthContext } from "../Store/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const navigate=useNavigate();

  return (
    <div className="border p-4 flex justify-between">
      <p className="text-[#f53d00] font-semibold text-3xl">todos</p>

      <div className="flex gap-8">
        {/* <p className="text-[#f53d00] text-lg"> {user} </p> */}
        <button onClick={()=>{

          navigate('/auth')
          auth.logout()
        }} className="text-md pb-2">
          Logout
        </button>
      </div>
    </div>
  );
}
