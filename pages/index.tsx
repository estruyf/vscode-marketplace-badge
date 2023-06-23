import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`h-screen w-full flex flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="space-y-2">
        <h1 className='text-4xl'>Visual Studio Code Marketplace Badge Service</h1>
        <p className='italic text-base text-center text-gray-300'>* Still in development *</p>
      </div>

      <div className='mt-12 flex space-x-4'>
        <img src="/api/extension?extId=eliostruyf.vscode-front-matter&type=version" className='h-6' />
        <img src="/api/extension?extId=eliostruyf.vscode-front-matter&type=rating" className='h-6' />
        <img src="/api/extension?extId=eliostruyf.vscode-front-matter&type=installs" className='h-6' />
        <img src="/api/extension?extId=eliostruyf.vscode-front-matter&type=installs&label=number%20of%20installs" className='h-6' />
      </div>
    </main>
  )
}
