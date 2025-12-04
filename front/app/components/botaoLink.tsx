
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function BotaoLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  
  
  const classesPadrao = 'p-3 border-2 rounded-2xl bg-white text-black hover:bg-blue-600';
  
  
  const classesFinais = `${classesPadrao} ${className || ''}`;

  return (
    
    <Button className={classesFinais}>
      <Link href={href} className=" ">
        {children} {}
      </Link>
    </Button>
  );
}

// OBSERVAÇÃO IMPORTANTE: 
// Substitua <Button> pelo componente ou tag HTML que você está usando 
// (ex: <button> ou <div>) se for o caso.
