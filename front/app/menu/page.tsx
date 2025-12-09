import Dashboard from "../components/dashboard/dashboard"

export default function Menu() {
  return (
    <div className='bg-[#EFF0F6] min-h-screen w-full overflow-x-hidden'>
          <div className='flex flex-col items-center p-8 max-w-7xl mx-auto'>
              <h1 className='mt-20 text-black font-extrabold text-5xl'>Bem-Vindo ao MonyFix</h1>
              <p className='text-gray-700  mt-4 text-center'>
                  Gestão inteligente feita sob medida pra você.
              </p>

        <p className='text-gray-700  mt-4 text-center'></p>

      </div>
      <Dashboard />
    </div>
  )
}