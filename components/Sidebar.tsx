"use client"
import Link from 'next/link'
import { Code2, ImageIcon, LayoutDashboard, MessageSquare, Settings, VideoIcon, Volume2 } from 'lucide-react'
import {usePathname} from 'next/navigation'
import FreeCounter from '@/components/freeCounter'
import { cn } from '@/lib/utils'
 

interface SidebarProps {
    apiLimitCount: number
}

const Sidebar = ({apiLimitCount = 0}:SidebarProps) => {
  const pathname= usePathname();

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
            color: 'text-fuchsia-500'
        },{
            name: 'Video generator',
            icon: VideoIcon,
            href: '/video',
            color: 'text-amber-500'
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
            name:"Voice generator",
            icon: Volume2,
            href: '/voice',
            color: 'text-red-400'
        },{
            name:"Settings",
            icon: Settings,
            href: '/settings',
            color: 'text-yellow-400'
        }
        
    ]

    return(
        <div className=" sidebar flex h-screen  text-white">
        <div className=" w-64 flex-shrink-0">
          <div className="p-8">
            <Link href="/dashboard" className="font-bold text-3xl text-white">
              Quellix
            </Link>
          </div>
          <div className="mt-4">
            {routes.map((route) => (
              <Link href={route.href} key={route.href}>
                <div className={cn("flex items-center py-2 px-4 group hover:bg-gray-700 ",pathname== route.href ?'text-white bg-white/10':'text-zinc-400'  )}>
                  <route.icon className={cn( "h-6 w-6 m-3 ", route.color)} />
                  <span className="text-base">{route.name}</span>
                </div>
              </Link>

            ))}
          </div>
          <div className='pt-48 '>
          <FreeCounter apiLimitCount={apiLimitCount}/>
          </div>
        </div>
        
      </div>
      
    )
}
export default Sidebar;