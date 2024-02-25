import throttle from 'lodash.throttle'
import { useCallback, useEffect, useState } from 'react'
import FloatDarkModeButton from './FloatDarkModeButton'
import JumpToTopButton from './JumpToTopButton'
import LANGS from '@/lib/lang' // 导入语言常量

/**
 * 悬浮在右下角的按钮，当页面向下滚动100px时会出现
 * @param {*} param0
 * @returns
 */
export default function RightFloatArea({ floatSlot }) {
  const [showFloatButton, switchShow] = useState(false)
  const [currentLang, setCurrentLang] = useState('en') // 设置默认语言状态为英语
  const scrollListener = useCallback(throttle(() => {
    const targetRef = document.getElementById('wrapper')
    const clientHeight = targetRef?.clientHeight
    const scrollY = window.pageYOffset
    const fullHeight = clientHeight - window.outerHeight
    let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
    if (per > 100) per = 100
    const shouldShow = scrollY > 100 && per > 0

    // 右下角显示悬浮按钮
    if (shouldShow !== showFloatButton) {
      switchShow(shouldShow)
    }
  }, 200))

  useEffect(() => {
    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [])

  // 语言选择事件处理函数
  const onLangSelectChange = (e) => {
    const newLang = e.target.value
    setCurrentLang(newLang)
    // 在此处可以添加切换语言的其他逻辑
  }

  return (
    <div className={(showFloatButton ? 'opacity-100 ' : 'invisible opacity-0') + '  duration-300 transition-all bottom-12 right-1 fixed justify-end z-20  text-black dark:text-white rounded-sm'}>
      <div className={'justify-center  flex flex-col items-center cursor-pointer'}>
        <FloatDarkModeButton />
        {floatSlot}
        <JumpToTopButton />

        {/* 语言切换部分 */}
        <div className="text-sm flex items-center group-hover:w-32 transition-all duration-200">
          <i className="fa-solid fa-language w-5" />
          <div className='w-0 group-hover:w-24 transition-all duration-200 overflow-hidden'>
            <label htmlFor="langSelect" className="sr-only">选择语言：</label>
            <select id="langSelect" value={currentLang} onChange={onLangSelectChange} name="languages" className='pl-1 bg-gray-50 dark:bg-black appearance-none outline-none dark:text-white uppercase cursor-pointer'>
              {Object.keys(LANGS)?.map(t => {
                return <option key={t} value={t}>{LANGS[t].LOCALE}</option>
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
