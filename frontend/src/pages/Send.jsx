import axios from "axios";
import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom"

export const Send = function(){
  const [searchParams] = useSearchParams();
  const [amount,setamount] = useState(0)
  // searchParams = searchParams.split('&')[0]
  console.log(searchParams)
  const name = searchParams.get("name")
  const id =  searchParams.get("id")

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-x-0 bg-slate-400">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6"></div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex">
            <span className="text-2xl text-white flex ml-4 mt-2">{name[0]}</span>
            </div>
            <h3 className="text-2xl font-semibold">{name}</h3>
          </div>
          <div className="space-y-4">
          <div className="space-y-2">
          <label
                        className="text-sm font-medium leading-none "
                        
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        className="flex h-10 w-full rounded-md border-slate-400"
                        id="amount"
                        placeholder="Enter amount"
                        onChange={(e) => setamount(e.target.value)}
                    />
            </div>
            <button className="justify-center rounded-md text-sm border-solid border-2 " onClick={() => {axios.post('http://localhost:3000/api/v1/account/transfer',{
      to:id,
      amount
            },
          {
            headers: {
              Authorization: "Bearer "+localStorage.getItem("token")
          }})
        }}> 
                        Initiate Transfer
                    </button>
          </div>
        </div>
      </div>
    </div>
  )
}