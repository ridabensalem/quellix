import Image from "next/image";

 const EmptyVoice = ({
}) => {
    return (
        <div className="h-full p-20 flex flex-col items-center  justify-center">
                 
            <div className="relative h-72 w-72">
                <Image
                    alt="Empty voice"
                    fill
                    src="/illustration_5.png"
                />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {" No voice generated ."}
            </p>
        </div>
    );
}
export default EmptyVoice;