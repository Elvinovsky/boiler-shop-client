import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import ShippingPaymentPage from '@/components/templates/ShippingPaymentPage/ShippingPaymentPage'

function ShippingPayment() {
  return (
    <>
      <Head>
        <title>Аква Термикс | Оплата и доставка </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>

      <Layout>
        <main>
          <ShippingPaymentPage />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default ShippingPayment
