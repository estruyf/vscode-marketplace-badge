import { Inter } from 'next/font/google'
import { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const defaultValue = 'eliostruyf.vscode-front-matter';

  const [extId, setExtId] = useState('');
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('');
  const [style, setStyle] = useState('flat');
  const debouncedExtId = useDebounce<string>(extId, 500)
  const debouncedLabel = useDebounce<string>(label, 500)
  const debouncedColor = useDebounce<string>(color, 500)

  const siteUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "http://localhost:3000";

  const queryStringParams = useMemo(() => {
    const params = new URLSearchParams();
    if (debouncedLabel) {
      params.append('label', debouncedLabel);
    }

    if (debouncedColor) {
      params.append('color', debouncedColor);
    }

    if (style && style !== 'flat') {
      params.append('style', style);
    }

    return params.toString();
  }, [debouncedLabel, debouncedColor, style]);

  const versionUrl = useMemo(() => {
    return `${siteUrl}/api/badge/version/${debouncedExtId || defaultValue}${queryStringParams ? `?${queryStringParams}` : ``}`;
  }, [debouncedExtId, queryStringParams]);

  const ratingUrl = useMemo(() => {
    return `${siteUrl}/api/badge/rating/${debouncedExtId || defaultValue}${queryStringParams ? `?${queryStringParams}` : ``}`;
  }, [debouncedExtId, queryStringParams]);

  const installsUrl = useMemo(() => {
    return `${siteUrl}/api/badge/installs/${debouncedExtId || defaultValue}${queryStringParams ? `?${queryStringParams}` : ``}`;
  }, [debouncedExtId, queryStringParams]);

  return (
    <main
      className={`h-screen w-full space-y-12 flex flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="space-y-2">
        <p className='text-base text-center text-gray-300'>🚧 Still in development 🚧</p>
        <h1 className='text-4xl'>Visual Studio Code Marketplace Badge Service</h1>
      </div>

      <div className='flex space-x-4'>
        <img src={versionUrl} className='h-6' />
        <img src={ratingUrl} className='h-6' />
        <img src={installsUrl} className='h-6' />
      </div>

      <hr className='mx-auto max-w-xl w-full opacity-20' />

      <div className='mx-auto max-w-2xl w-full space-y-4'>
        <div className='w-full'>
          <label htmlFor="extId" className='block text-base text-gray-300'>Extension ID</label>
          <input
            type="text"
            name="extId"
            placeholder='Enter you extension ID: <publisher>.<extension-id>'
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            onChange={(e) => setExtId(e?.currentTarget?.value?.trim() || "")} />
        </div>

        <div className='w-full'>
          <label htmlFor="style" className='block text-base text-gray-300'>Style</label>
          <select
            name="style"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            defaultValue={style}
            onChange={(e) => setStyle(e?.currentTarget?.value || "flat")}>
            <option value="flat">flat</option>
            <option value="flat-square">flat-square</option>
            <option value="plastic">plastic</option>
            <option value="for-the-badge">for-the-badge</option>
            <option value="social">social</option>
          </select>
        </div>

        <div className='w-full'>
          <label htmlFor="label" className='block text-base text-gray-300'>Label</label>
          <input
            type="text"
            placeholder='Enter your label (optional)'
            name="label"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            onChange={(e) => setLabel(e?.currentTarget?.value?.trim() || "")} />
        </div>

        <div className='w-full'>
          <label htmlFor="color" className='block text-base text-gray-300'>Color</label>
          <input
            type="text"
            placeholder='Enter your color (optional / hex)'
            name="color"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            onChange={(e) => setColor(e?.currentTarget?.value?.trim() || "")} />
        </div>
      </div>

      <hr className='mx-auto max-w-xl w-full opacity-20' />

      <div className='mx-auto max-w-2xl w-full space-y-4'>
        <div>
          <label htmlFor="version" className='block text-base text-gray-300'>Version</label>
          <textarea
            name="version"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            rows={2}
            disabled
            value={versionUrl}></textarea>
        </div>

        <div>
          <label htmlFor="rating" className='block text-base text-gray-300'>Rating</label>
          <textarea
            name="rating"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            rows={2}
            disabled
            value={ratingUrl}></textarea>
        </div>

        <div>
          <label htmlFor="installs" className='block text-base text-gray-300'>Installs</label>
          <textarea
            name="installs"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            rows={2}
            disabled
            value={installsUrl}></textarea>
        </div>
      </div>

      <a href="https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Festruyf%2Fvscode-marketplace-badge"><img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Festruyf%2Fvscode-marketplace-badge&labelColor=%23d9e3f0&countColor=%23dce775&style=flat" /></a>
    </main>
  )
}
