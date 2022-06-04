export const Agent = ({ name, email, date, clients}) => {
  return (
    <div className="flex justify-center">
      <div className="mt-4 ml-3 bg-slate-200 shadow-lg w-fit p-3 rounded-md cursor-pointer">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <h1 className=""><span className="font-semibold">email:</span> {email}</h1>
        <h1 className=""><span className="font-semibold">started date:</span> {date}</h1>
        <h1><span className="font-semibold">total clients: </span>{clients}</h1>
      </div>
    </div>

    
  )
}
