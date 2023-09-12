import { UserButton } from "@clerk/nextjs"


export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      <UserButton afterSignOutUrl="/"/>
      
    </div>
  )
}
