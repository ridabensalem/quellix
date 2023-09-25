"use client"
import { Dialog , DialogHeader,DialogContent,DialogTitle, DialogFooter} from "./ui/dialog"
import { useProModal } from "@/app/hooks/pro_modal"
import { Badge } from "@/components/ui/badge"
export const ProModal = () =>{
    const proModal = useProModal();
    return(
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-lg font-bold text-gray-800">
                    Upgrade to Premium Plan 
                    <Badge variant="premium" className="bg-yellow-500 text-gray-800 ml-2 px-2 py-1 rounded font-semibold">
                        Pro
                    </Badge>
                </DialogTitle>
            </DialogHeader>
            <div className="mt-4 text-center">
                <p className="text-gray-600">
                    Unlock exclusive features with our Premium (Pro) plan:
                </p>
                <div className="mt-6">
                    {/* You can add beautiful UI/UX elements here */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-blue-700">Premium Features</h2>
                        <ul className="mt-2 text-gray-700">
                            <li className="flex items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
                                    <path fill-rule="evenodd" d="M10 2a8 8 0 01.293 15.293A8 8 0 1110 2zm-1 5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
                                </svg>
                                Advanced analytics
                            </li>
                            <li className="flex items-center mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
                                    <path fill-rule="evenodd" d="M10 2a8 8 0 01.293 15.293A8 8 0 1110 2zm-1 5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clip-rule="evenodd" />
                                </svg>
                                Priority customer support
                            </li>
                            {/* Add more premium features */}
                        </ul>
                    </div>
                </div>
            </div>
        </DialogContent>
        <DialogFooter>
            <button
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                
            >
                Upgrade
            </button>
        </DialogFooter>
    </Dialog>
    

    )
}