// @ts-nocheck
import React from 'react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { MantineProvider, Button } from '@mantine/core'

import '../styles/tailwind.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../layout/layout'
//import { site } from "../settings"
//import { MetaTags } from "../components/next-seo"
import { useHasMounted, useDebounce } from '../lib/hooks'
//import { CssBaseline } from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react'

// export type Status = 'idle' | 'loading' | 'ready' | 'error'
// export type ScriptElt = HTMLScriptElement | null

//export function reportWebVitals(metric) {
//    //console.log(metric)
//}
import { Commander } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
    const hasMounted = useHasMounted()
    //const hasDebounced = useDebounce(hasMounted, 5000)
    //console.log("loading scripts", hasDebounced)
    return (
        <React.Fragment>
            <Layout>
                {/*<Head>
                {hasMounted && <Commander />}

                    <link
                        rel="preload"
                        href="/fonts/Satoshi-Regular.woff2"
                        as="font"
                        crossOrigin=""
                        type="font/woff2"
                    />
                    {
                        hasDebounced && <>
                            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-141617385-4"></script>
                            <script id="gtag-inline">
                                {
                                    `window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'UA-141617385-4');`
                                }
                            </script>
                        </>
                    }

                </Head>*/}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-M492EQF9QH"
                    strategy="worker"
                ></Script>
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments)}
                                gtag('js', new Date());
                                gtag('config', 'G-M492EQF9QH');
                            `,
                    }}
                />
                <NextUIProvider>
                    <Component {...pageProps} />
                </NextUIProvider>
            </Layout>

            {/* MESH GRADIENTS */}
        </React.Fragment>
    )
}
export default MyApp
