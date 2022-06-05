import type { AppProps } from 'next/app'
import '../styles/globals.css';

function LunishNl({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
};

export default LunishNl;
