import Image from "next/image";

 const EmptyImage = ({
}) => {
    return (
        <div className="h-full p-20 flex flex-col items-center  justify-center">
                 
            <div className="relative h-72 w-72">
                <Image
                    alt="Empty Image"
                    fill
                    src="/illustration_3.png"
                />
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {" No image generated."}
            </p>
        </div>
    );
}
export default EmptyImage;