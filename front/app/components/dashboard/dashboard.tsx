import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, OrigamiIcon } from "lucide-react";


export default function Dashboard() {
    return (
        <div className='bg-[#EFF0F6] min-h-screen w-full overflow-x-hidden'>
          <div className='flex flex-col items-center p-8 max-w-7xl mx-auto'>
              <h1 className='mt-20 text-black font-extrabold text-5xl'>Bem-Vindo à Comunidade</h1>
              <p className='text-gray-700  mt-4 text-center'>
                  Conecte-se, tire dúvidas, compartilhe conhecimento e cresça junto com seus colegas acadêmicos.
              </p>
              <div className='mt-10 w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {/* integrar com o banco de dados*/}
                 
                 <Card>
                    <CardHeader>
                        <div className=" flex items-center justify-center">
                            <CardTitle className="text-lg sm:text-xl text-gray-600">
                                Lucros
                            </CardTitle>
                            <DollarSign className="ml-auto w-4 h-4"/>
                        </div>
                        <CardDescription>Lucros obtidos no mes de Dezembro </CardDescription>
                        <CardContent>
                            <p className="text-base sm:text-lg font-bold">R$ 20.000</p>
                        </CardContent>
                    </CardHeader>
                 </Card>

                 <Card>
                    <CardHeader>
                        <div className=" flex items-center justify-center">
                            <CardTitle className="text-lg sm:text-xl text-gray-600">
                                Despesas
                            </CardTitle>
                            <DollarSign className="ml-auto w-4 h-4"/>
                        </div>
                        <CardDescription>Gastos obtidos no mes de Dezembro </CardDescription>
                        <CardContent>
                            <p className="text-base sm:text-lg font-bold">R$ 12.468</p>
                        </CardContent>
                    </CardHeader>
                 </Card>
                 
                 <Card>
                    <CardHeader>
                        <div className=" flex items-center justify-center">
                            <CardTitle className="text-lg sm:text-xl text-gray-600">
                                Despesas
                            </CardTitle>
                            <DollarSign className="ml-auto w-4 h-4"/>
                        </div>
                        <CardDescription>Gastos obtidos no mes de Dezembro </CardDescription>
                        <CardContent>
                            <p className="text-base sm:text-lg font-bold">R$ 12.468</p>
                        </CardContent>
                    </CardHeader>
                 </Card>
              </div>
              <div>

              </div>
              

          </div>
      </div>
                )
}