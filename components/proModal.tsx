"use client"
import { Dialog , DialogHeader,DialogContent,DialogTitle, DialogFooter} from "./ui/dialog"
import { useProModal } from "@/app/hooks/pro_modal"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
export const ProModal = () =>{
    const proModal = useProModal();
    return(
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-lg font-bold text-gray-800">
                    Upgrade to Premium Plan 
                    <Badge variant="premium" className="bg-yellow-500 text-white ml-2 px-2 py-1 rounded font-semibold">
                        Pro
                    </Badge>
                </DialogTitle>
            </DialogHeader>
            <div class="Card_container">
       <div class="px-6 py-8">
    <h2 class="text-2xl font-semibold text-gray-800">Premium Plan</h2>
    <p class="text-gray-600 mt-2">Perfect for professionals</p>
    <div class="mt-4">
      <p class="text-4xl font-bold text-teal-600">$20<span class="text-xl font-medium text-gray-600">/month</span></p>
    </div>
    <ul class="mt-6 space-y-4">
      <li class="flex items-start">
      <Check  className='text-green-500'/>
        <span class="text-gray-700">Unlimited access to premium features</span>
      </li>
      <li class="flex items-start">
      <Check  className='text-green-500'/>
        <span class="text-gray-700">24/7 Customer Support</span>
      </li>
      <li class="flex items-start">
      <Check  className='text-green-500'/>
        <span class="text-gray-700">Access to exclusive content</span>
      </li>
    </ul>
    <div class="mt-8">
    <Button  variant={"upgrade"} className="block w-full text-white font-semibold text-center py-3 rounded-lg	">
            Upgrade
          </Button>
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