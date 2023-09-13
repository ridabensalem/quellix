import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";
const DashboardLayout = ({ children }:{
    children: React.ReactNode
}) => {
    return (
        <div className="relative h-full ">
        <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 z-[80] w-72 bg-main-bg-dark ">
            <div className="text-white">
                <Sidebar/>
            </div>
            
       </div>  
       <div className="md:pl-72 ">
        <Navbar/>
            {children}
            </div>         
        </div>
    )

}
export default DashboardLayout;