import { Inter } from 'next/font/google'
import { useMemo, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const defaultValue = 'eliostruyf.vscode-front-matter';

  const [extId, setExtId] = useState('');
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('');
  const [labelColor, setLabelColor] = useState('');
  const [style, setStyle] = useState('flat');
  const debouncedExtId = useDebounce<string>(extId, 500)
  const debouncedLabel = useDebounce<string>(label, 500)
  const debouncedColor = useDebounce<string>(color, 500)
  const debouncedLabelColor = useDebounce<string>(labelColor, 500)

  const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL ? `https://${process.env.NEXT_PUBLIC_WEBSITE_URL}` : "http://localhost:3000";


  const queryStringParams = useMemo(() => {
    const params = new URLSearchParams();
    if (debouncedLabel) {
      params.append('label', debouncedLabel);
    }

    if (debouncedColor) {
      params.append('color', debouncedColor);
    }

    if (debouncedLabelColor) {
      params.append('labelColor', debouncedLabelColor);
    }

    if (style && style !== 'flat') {
      params.append('style', style);
    }

    return params.toString();
  }, [debouncedLabel, debouncedColor, debouncedLabelColor, style]);

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
        <h1 className='text-4xl'>Visual Studio Code Marketplace - Extension Badge Service</h1>
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

        <div className='w-full'>
          <label htmlFor="labelColor" className='block text-base text-gray-300'>Label color</label>
          <input
            type="text"
            placeholder='Enter your label color (optional / hex)'
            name="labelColor"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            onChange={(e) => setLabelColor(e?.currentTarget?.value?.trim() || "")} />
        </div>
      </div>

      <hr className='mx-auto max-w-xl w-full opacity-20' />

      <div className='mx-auto max-w-2xl w-full space-y-4'>
        <div>
          <label htmlFor="version" className='flex space-x-2  text-base text-gray-300'>
            <span>Version</span>
            <img src={versionUrl} alt='Version badge' className='h-6' />
          </label>
          <textarea
            name="version"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            rows={2}
            disabled
            value={versionUrl}></textarea>
        </div>

        <div>
          <label htmlFor="rating" className='flex space-x-2  text-base text-gray-300'>
            <span>Rating</span>
            <img src={ratingUrl} alt='Rating badge' className='h-6' />
          </label>
          <textarea
            name="rating"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            rows={2}
            disabled
            value={ratingUrl}></textarea>
        </div>

        <div>
          <label htmlFor="installs" className='flex space-x-2 text-base text-gray-300'>
            <span>Installs</span>
            <img src={installsUrl} alt='Installation badge' className='h-6' />
          </label>
          <textarea
            name="installs"
            className='w-full mt-2 p-2 rounded-md bg-gray-700 text-gray-300 outline-none focus:outline-gray-400 outline-offset-0'
            rows={2}
            disabled
            value={installsUrl}></textarea>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 lg:justify-start">
        <a
          className="flex-none group relative isolate flex items-center rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium text-white transition-colors hover:text-[#97ca00] gap-x-3"
          href="https://eliostruyf.com/"
          title="Created by Elio Struyf">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>

          <span className="self-baseline text-white">Elio Struyf</span>
        </a>
        <a
          className="flex-none group relative isolate flex items-center rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium text-white transition-colors hover:text-[#97ca00] gap-x-3"
          href="https://github.com/estruyf/vscode-marketplace-badge"
          title="Check out the code on GitHub">
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor" className="flex-none w-6 h-6"><path d="M8 .198a8 8 0 0 0-8 8 7.999 7.999 0 0 0 5.47 7.59c.4.076.547-.172.547-.384 0-.19-.007-.694-.01-1.36-2.226.482-2.695-1.074-2.695-1.074-.364-.923-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.224 1.873.87 2.33.666.072-.518.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.954 0-.873.31-1.586.823-2.146-.09-.202-.36-1.016.07-2.118 0 0 .67-.214 2.2.82a7.67 7.67 0 0 1 2-.27 7.67 7.67 0 0 1 2 .27c1.52-1.034 2.19-.82 2.19-.82.43 1.102.16 1.916.08 2.118.51.56.82 1.273.82 2.146 0 3.074-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38A7.972 7.972 0 0 0 16 8.199a8 8 0 0 0-8-8Z"></path></svg>
          <span className="self-baseline text-white">GitHub</span>
        </a>
      </div>

      <a href="https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Festruyf%2Fvscode-marketplace-badge"><img src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Festruyf%2Fvscode-marketplace-badge&labelColor=%23d9e3f0&countColor=%23dce775&style=flat" /></a>
    </main>
  )
}
