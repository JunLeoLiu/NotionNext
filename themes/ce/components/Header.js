import Link from 'next/link'
import { siteConfig } from '@/lib/config'

/**
 * 网站顶部
 * @returns
 */
export const Header = (props) => {
  return (
      <header className="w-full px-6 bg-white  dark:bg-black relative z-100000 sticky top-0 left-0">
            <div className="container mx-auto max-w-4xl md:flex justify-center items-center">
                <Link
                    href='/'
                    className="py-2 px-6 w-full text-center md:text-left md:w-auto text-gray-dark no-underline flex justify-center items-center text-3xl font-bold">

                    {siteConfig('TITLE')}
                </Link>
                <div className="w-full md:w-auto text-center md:text-right">
                    {/* 右侧文字 */}
                </div>
            </div>
        </header>
  )
}
