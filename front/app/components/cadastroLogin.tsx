import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import BotaoLink from './botaoLink'

export default function CadastroLogin() {
    return (
        <div className='max-w-sm mx-auto mt-20'>
            <div className=''>
                <h1 className=' text-center text-lg font-semibold'>
                    MyDin
                </h1>
                <p className='text-gray-600 text-center'>
                    Gestão financeira inteligente e personalizada
                </p>
            </div>
            <div className='text-center mt-5 '>

                <BotaoLink href="/" className= "">
                    Login
                </BotaoLink>

                <BotaoLink href="/cadastro" className="ml-4 "> {/* Adicionei uma margem de exemplo */}
                    Criar conta
                </BotaoLink>
            </div>
        </div>
    )
}

