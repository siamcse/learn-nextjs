import ButtonCN from '@/components/ButtonCN'
import { Button } from '@/components/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <h1 className='text-2xl text-center'>Please go to...</h1>
      <Link className='mt-12 text-blue-600 underline' href='/login'><Button intent={'secondary'}>Login Page</Button></Link><br />
      <Link className='mt-2 text-blue-600 underline' href='/company'><Button size={'small'}>Company Page</Button></Link>
      <Link
        className='mt-2 text-blue-600 underline'
        href={{
          pathname: '/allcompany',
          query: { page: 1, size: 10, query: '' },
        }}
      >
        <Button size={'small'}>All Company</Button>
      </Link>
      <Link href={'/pricing'}>
        <ButtonCN className='bg-red-500 hover:bg-red-600 mt-5'>Pricing Page</ButtonCN>
        </Link>
    </main>
  )
}
