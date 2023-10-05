'use client '
import { useState } from "react";
import { useEffect } from "react";
import { useProModal } from "@/app/hooks/pro_modal";
import { MAX_FREE_COUNTS } from "@/constants";
import { Card, CardContent } from "./ui/card";
import {Progress} from "./ui/progress";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";



interface freeCounterProps {
    apiLimitCount: number
}
const freeCounter = ( {
    apiLimitCount = 0
}: freeCounterProps) => {
    const proModal = useProModal();
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) return null
    return (
        <div className=" ">
         <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>
          <Button onClick={proModal.onOpen} variant={"upgrade"} className="w-full">
            Upgrade
            <Rocket className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
            

        </div>
    )
}
export default freeCounter;