import { useRouter } from 'next/router';

interface Props {
    link: any
};

const Home = ({ link }: Props) => {
    const router = useRouter();

    return (
        <div style={{ margin: 16, fontSize: 16 }}>
            <span style={{ color: '#dddd' }} >root@lunish.nl:~# </span> sudo redirect "{router.query.path}" <br />
            <span>Fetching from <button onClick={() => alert(`[GET ${link.status}] ${link.message}`)}>https://api.waya.one/links/{router.query.path}</button></span>  <br />
            {link.content?.destination ?
                '[GET 200] ' + link.content.destination :
                link ? `[GET ${link.status}] ${link.message}` :
                    ''
            }<br />
            <span style={{ color: '#dddd' }} >root@lunish.nl:~# </span> <span role='cursor'>|</span> <br />
        </div>
    )
};

export default Home;
Home.getInitialProps = async ({ query, req, res }: any) => {
    if (!res || !req) return;
    const link = await fetch(`https://api.waya.one/links/${query.path}`).then(res => res.json()).catch(() => null);

    if (link?.content?.destination) {
        res.writeHead(307, {
            Location: `${link?.content?.destination}${req.url?.split('?')[1] ? `?${req.url.split('?')[1]}` : ''}`
        });
        fetch(`https://api.waya.one/links/${query.id}`, {
            method: 'PATCH',
            headers: {
                authorization: process.env?.token || ''
            }
        });
        res.end();
    };

    return { link };
};