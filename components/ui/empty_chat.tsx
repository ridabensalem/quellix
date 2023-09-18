import Image from "next/image";

 const EmptyChat = ({
}) => {
    return (
        <div className="h-full p-20 flex flex-col items-center  justify-center">
                 
            <div className="relative h-72 w-72">
                <Image
                    alt="Empty code"
                    fill
                    src="/illustration_1.png"
                />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {" No conversation has started ."}
            </p>
        </div>
    );
}
export default EmptyChat;