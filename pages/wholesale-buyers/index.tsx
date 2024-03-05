import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage'

function WholesaleBuyers() {
  return (
    <>
      <Head>
        <title>Аква Термикс | О компании </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>

      <Layout>
        <main>
          <ContactsPage isWholesaleBuyersPage={true} />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default WholesaleBuyers
