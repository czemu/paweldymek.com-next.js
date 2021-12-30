import MainHead from '../../components/MainHead/MainHead'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useRouter } from 'next/router'
import { API_URL } from '../../config/api'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Post({ post }) {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div id="wrapper">
            <MainHead />

            <div id="content">
                <Sidebar simple={true} title={post.name} />

                <main>
                    <h1>{post.name}</h1>
                    <div>{post.intro}</div>
                    <div dangerouslySetInnerHTML={{__html: post.content}} />
                </main>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const response = await fetch(API_URL + '/posts/slug:' + context.params.slug)
    const json = await response.json()

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['post', 'common'])),
            post: json.data
        },
    }
}