import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { useStore } from 'effector-react'
import { $boilerPart, setBoilerPart } from '@/context/boiler-part'
import { getBoilerPartFx } from '@/app/api/boilerParts'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import PartPage from '@/components/templates/PartPage/PartPage'
import { useRouter } from 'next/router'
import Custom404 from '@/pages/404'

function CatalogPartPage({ query }: { query: IQueryParams }) {
  const boilerPart = useStore($boilerPart)
  const { shouldLoadContent } = useRedirectByUserCheck()

  const [error, setError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])
  const loadBoilerPart = async () => {
    try {
      const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)
      if (!data) {
        setError(true)
        return
      }
      setBoilerPart(data)
      return
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <PartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogPartPage
