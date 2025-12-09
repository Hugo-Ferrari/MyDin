
interface BlockProps{
    numero: number
    texto: string
}
export default function Blocks({texto,numero}:BlockProps) {

    return (
        <div className="bg-white p-4 shadow-sm w-full h-20 ">
            <div className=" flex items-center">
                <div className="flex flex-col ml-4">
                    <span className=" text-gray-500 text-sm whitespace-nowrap m">
                        {texto}
                    </span>
                    <span className="text-2xl font-bod text-black">
                        {numero}
                    </span>
                </div>
            </div>
        </div>
    )
}
