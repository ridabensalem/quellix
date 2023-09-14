import { UserButton } from "@clerk/nextjs"

import { Code2, ImageIcon, LayoutDashboard, MessageSquare, Settings, Text, Video, VideoIcon } from 'lucide-react'


export default function Dashboard() {
  const tools =[
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-400',
        text: "Customized Dashboard to manage your AI models"
    },
    {
        name: 'Image generator',
        icon: ImageIcon,
        href: '/image',
        color: 'text-fuchsia-400',
        text: "Generate great images with AI"
    },{
        name: 'Video generator',
        icon: VideoIcon,
        href: '/video',
        color: 'text-amber-400',
        text: "Generate great videos that you never seen before"
    },{
        name:"Code generator",
        icon: Code2,
        href: '/code',
        color: 'text-green-400',
        text: "Generate code clean of bugs"
    },{
        name:"Chat bot",
        icon: MessageSquare,
        href: '/chat',
        color: 'text-indigo-400',
        text: 'Talk to your new AI friend'
    },{
        name:"Paragraph resume",
        icon: Text,
        href: '/paragraph',
        color: 'text-red-400',
        text: "summarize any text in a paragraph"
    },{
        name:"Settings",
        icon: Settings,
        href: '/settings',
        color: 'text-yellow-400',
        text: ' Manage your account settings'
    }
    
]
  
  return (
    <div className="flex h-screen bg-gray-100">
    <div className="flex-1 p-8">
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold">Welcome to your Quellix space </h2>
      </header>
      <main>
        <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">AI Model Overview</h3>
          <p>
            Explore and manage your AI models in one place. Get insights, predictions, and monitor model performance.
          </p>
        </section>
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Data Analytics</h3>
          <p>
            Dive deep into your data with powerful analytics tools. Visualize trends, patterns, and make data-driven decisions.
          </p>
        </section>
         
      </main>
     
    </div>
    
    
  </div>
  )
}
