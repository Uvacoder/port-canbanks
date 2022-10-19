import { WebmeisterGradientLogo } from '../components/logo'
import { Fragment, useState } from 'react'
import Script from 'next/script'
import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'
import Footer from './footer'
import Link from 'next/link'
import {
    TealBlob,
    BluePurpleBlob,
    ThreeColorsBlob,
    TealPinkBlob,
    PurplePinkBlob,
} from '../components/Svg'
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Toggle } from '../components/toggle'
import { useRouter } from 'next/router'
import { navLinks, footerLinks } from '../settings'
import { site } from '../settings'
import { useHasMounted, useDebounce, useWindowSize } from '../lib/hooks'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Tooltip,
} from '../components/styled'
import { motion, AnimatePresence } from 'framer-motion'
import { Commander } from '../components'
import { DIMENSIONS } from '../settings'
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }) {
    const vw = useWindowSize()
    const router = useRouter()
    const hasMounted = useHasMounted()
    const shouldLoadScripts = useDebounce(hasMounted, 5000)
    //console.log("loading scripts", shouldLoadScripts)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const toggle = () => setSidebarOpen(!sidebarOpen)
    const navigation = navLinks.map((navlink) =>
        navlink.href === router.asPath ? { ...navlink, current: true } : navlink
    )
    return (
        <motion.div className="h-full min-h-screen flex !overflow-x-hidden relative z-10 !bg-transparent !max-w-[100vw]">
            <motion.div
                style={{
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '100%',
                    maxWidth: DIMENSIONS.SETTINGS_PANEL_WIDTH,
                    display: 'flex',
                    paddingTop: '16px',
                    flexDirection: 'column',
                    flexGrow: 0,
                    flexShrink: 1,
                    alignItems: 'center',
                    height: '100vh',
                    background: '#010101',
                    zIndex: 30,
                }}
            >
                <MenuToggle onClick={toggle} data-ison={sidebarOpen} />
            </motion.div>
            <motion.div
                variants={variants}
                animate={sidebarOpen ? 'open' : 'closed'}
                style={{ width: '100%', maxWidth: DIMENSIONS.SIDEBAR_MAX_WIDTH, zIndex: 20 }}
                id="sidebar"
                className="gradientbox relative"
            >
                <motion.div className="fixed left-0 top-0  bottom-0 min-h-screen blur-2xl z-20"></motion.div>
                <motion.div className="sticky w-full h-screen max-h-[100vh] overflow-y-scroll lefft-0 top-0 z-20 pt-8 pl-[54px] bg-[rgba(0,0,0,0.8)]">
                    <Accordion type="single" collapsible className="">
                        {navigation.map((item, i) =>
                            item.children ? (
                                <AccordionItem value={`item-${i}`} key={`acc-${i}`}>
                                    <AccordionTrigger>{item.name}</AccordionTrigger>
                                    <AccordionContent>
                                        {item.children.map((subItem) => (
                                            <Link key={subItem.name} href={subItem.href}>
                                                <motion.a
                                                    exit={{ opacity: 0 }}
                                                    title={subItem.name}
                                                    className="group w-full flex items-center pl-5 pr-2 py-2 text-sm font-medium text-gray-400 rounded-md hover:text-gray-300 "
                                                >
                                                    {subItem.name}
                                                </motion.a>
                                            </Link>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ) : (
                                <Link key={item.name} href={item.href}>
                                    <motion.a
                                        exit={{ opacity: 0 }}
                                        title={item.name}
                                        className="group w-full flex items-center pl-5 pr-2 py-2 text-sm  text-gray-300 rounded-md hover:text-white"
                                    >
                                        {item.name}
                                    </motion.a>
                                </Link>
                            )
                        )}
                    </Accordion>
                </motion.div>
            </motion.div>
            <motion.div
                style={{
                    width: `calc(100vw - ${DIMENSIONS.SIDEBAR_MAX_WIDTH})`,
                    maxWidth: '100vw',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0,
                }}
                variants={variantsMain}
                animate={sidebarOpen ? 'open' : 'close'}
                className="absolute from-gray-900 to-gray-600 bg-gradient-to-r flex flex-col min-h-screen flex-grow"
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
const variants = {
    open: { x: 0, transition: { duration: 0.4, ease: [0, 0.71, 0.2, 1.01] } },
    closed: { x: -DIMENSIONS.SIDEBAR_MAX_WIDTH },
}
const variantsMain = {
    open: {
        x: DIMENSIONS.SIDEBAR_MAX_WIDTH,
        transition: { duration: 0.4, ease: [0, 0.71, 0.2, 1.01] },
    },
    closed: { left: 0, width: '100vw' },
}
const MenuToggle = ({ onClick, ...props }) => (
    <svg
        onClick={onClick}
        width={32}
        height={32}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
            fill="#cecece"
        />
        <path
            d="M12 13C11.44 13 11 12.55 11 12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12C13 12.55 12.56 13 12 13Z"
            fill="#cecece"
        />
        <path
            d="M16 13C15.44 13 15 12.55 15 12C15 11.45 15.45 11 16 11C16.55 11 17 11.45 17 12C17 12.55 16.56 13 16 13Z"
            fill="#cecece"
        />
        <path
            d="M8 13C7.44 13 7 12.55 7 12C7 11.45 7.45 11 8 11C8.55 11 9 11.45 9 12C9 12.55 8.56 13 8 13Z"
            fill="#cecece"
        />
    </svg>
)
