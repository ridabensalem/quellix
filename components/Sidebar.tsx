"use client "
import Link from 'next/link'
import { Code2, ImageIcon, LayoutDashboard, MessageSquare, Settings, Video, VideoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
const Sidebar = () => {
    const routes =[
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            href: '/dashboard',
            color: 'text-sky-400'
        },
        {
            name: 'Image generator',
            icon: ImageIcon,
            href: '/image',
            color: 'text-fuchsia-400'
        },{
            name: 'Video generator',
            icon: VideoIcon,
            href: '/video',
            color: 'text-amber-400'
        },{
            name:"Code generator",
            icon: Code2,
            href: '/code',
            color: 'text-green-400'
        },{
            name:"Chat bot",
            icon: MessageSquare,
            href: '/chat',
            color: 'text-indigo-400'
        },{
            name:"Settings",
            icon: Settings,
            href: '/settings',
            color: 'text-yellow-400'
        }
        
    ]

    return(
        <div className="flex h-screen  text-white">
        <div className=" w-64 flex-shrink-0">
          <div className="p-8">
            <Link href="/dashboard" className="font-bold text-3xl text-white">
              Quellix
            </Link>
          </div>
          <div className="mt-4">
            {routes.map((route) => (
              <Link href={route.href} key={route.href}>
                <div className="flex items-center py-2 px-4 group hover:bg-gray-700 ">
                  <route.icon className={cn( "h-6 w-6 m-3 ", route.color)} />
                  <span className="text-base">{route.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
        </div>
      </div>
      
    )
}
export default Sidebar;