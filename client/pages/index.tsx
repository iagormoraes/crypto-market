import type { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getToken, GetTokenParams } from 'next-auth/jwt';

import Button from '../src/commons/components/buttons/Button';
import PageCarousel from '../src/commons/components/PageCarousel';
import BitcoinRenderer from '../src/commons/components/3d/BitcoinRenderer';
import SimpleCard from '../src/commons/components/cards/SimpleCard';
import NoSSR from '../src/commons/components/NoSSR';
import NavigationBar from '../src/commons/containers/NavigationBar';

const Home: NextPage = () => {
  const exchangeCards = [
    {
      title: 'Fast and easy',
      children: (
        <p>
          We offer an easy platform so you don't waste any <strong>time</strong>{' '}
          and <strong>money</strong>.
        </p>
      ),
    },
    {
      title: 'Cashback',
      children: (
        <p>
          With <strong>cashback</strong> your investments on crypto assets
          become much more profitable on long term.
        </p>
      ),
    },
    {
      title: 'Low spread',
      children: (
        <p>
          Our spread percentages are lower as <strong>2%</strong> of your book
          operation.
        </p>
      ),
    },
  ];

  return (
    <main>
      <Head>
        <title>Home | Crypto Market</title>
      </Head>
      <NavigationBar />
      <PageCarousel>
        <section className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center px-2">
          <div className="text-white w-full md:w-2/5 px-2 flex flex-col gap-2 order-1 md:-order-1">
            <h2 className="text-2xl md:text-5xl text-center md:text-left font-bold mb-4 md:mb-8">
              Buy Bitcoin & More!
            </h2>
            <p className="text-lg md:text-2xl text-center md:text-left">
              Sign up today and <strong>start investing</strong>{' '}
              <strong>cryptocurrencies</strong> in minutes. Get started!.
            </p>
            <Link href="/register">
              <Button className="mt-8 self-center md:self-start">
                Sign Up
              </Button>
            </Link>
          </div>
          <div>
            <NoSSR>
              <BitcoinRenderer />
            </NoSSR>
          </div>
        </section>
        <section className="container mx-auto h-full flex flex-col items-center justify-center px-2">
          <h2
            className="text-white text-2xl md:text-5xl text-center md:text-left font-bold mb-4 md:mb-8"
            data-swiper-parallax-scale="0.7"
          >
            Exchange in a easy way.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exchangeCards.map((card, index) => {
              const bgs = [
                'bg-blueGray-200',
                'bg-blueGray-300',
                'bg-blueGray-400',
              ];

              return (
                <SimpleCard
                  key={card.title}
                  title={card.title}
                  className={bgs[index]}
                  data-swiper-parallax-y="-100"
                  data-swiper-parallax-duration={`${(index + 1) * 500}`}
                >
                  {card.children}
                </SimpleCard>
              );
            })}
          </div>
          <div className="mx-auto mt-8">
            <Link href="/register">
              <Button className="mt-4 self-center md:self-start">
                Start Now
              </Button>
            </Link>
          </div>
        </section>
        <section className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-2">
          <div className="text-white w-full md:w-2/5 px-2 flex flex-col gap-2 order-1 md:-order-0">
            <h2 className="text-2xl md:text-5xl text-center md:text-left font-bold mb-4 md:mb-8">
              What are you waiting for?
            </h2>
            <p className="text-lg md:text-2xl text-center md:text-left">
              Start today with <strong>cryptos</strong> and maximise your
              profits.
            </p>
            <Link href="/register">
              <Button className="mt-8 self-center md:self-start">
                Start Now
              </Button>
            </Link>
          </div>
          <div className="w-1/3 md:w-64 aspect-square relative">
            <Image
              className="w-full h-full"
              src="/section-img-1.svg"
              alt="Three persons drawing a bitcoin"
              layout="fill"
            />
          </div>
        </section>
      </PageCarousel>
    </main>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getToken(context as unknown as GetTokenParams);

  if (session)
    return {
      redirect: {
        destination: '/market',
      },
      props: {},
    };

  return {
    props: {},
  };
}
