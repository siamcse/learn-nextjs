import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      <h1 className='text-2xl text-center'>Please go to Login page</h1>
      <Link className='mt-12 text-blue-600 underline' href='/login'>Login Page</Link>
    </main>
  )
}
