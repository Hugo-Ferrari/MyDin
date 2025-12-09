import { OrigamiIcon } from "lucide-react";
import Blocks from "./bloco_menu/blocks";

export default function Dashboard(){
    return(
        <div className="mt-10 w-full max-w-4xl mx-auto grid grid-cols- sm:grid-cols-1 lg:grid-cols-4 gap-6 ">
            <Blocks texto={"Faturamento"}
            numero={125000}/>

            <Blocks texto={"Despesas"}
            numero={1200}/>
            <Blocks texto={"Lucro "}
            numero={2000}/>
            
            
            
        </div>
    )
}