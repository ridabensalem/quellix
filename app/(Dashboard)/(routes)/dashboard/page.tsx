import { UserButton } from "@clerk/nextjs"


export default function Dashboard() {
  return (
    <div>
      <p>Dashboard protected</p>
      <UserButton afterSignOutUrl="/"/>
      
    </div>
  )
}
