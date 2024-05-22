import React from 'react'
import { useId } from 'react'

import { Intro, IntroFooter } from '@/components/Intro'
import { StarField } from '@/components/StarField'
import { ThemeToggle } from '@/components/ThemeToggle'

// Sanity imports
import { sanityFetch } from '../../sanity/lib/fetch';
import { vergaderingenQuery, combinedSortedQuery } from '../../sanity/lib/queries';
import { SanityDocument } from 'next-sanity';

import { article as Article} from '@/components/mdx'
// import { EncryptedText } from '@/app/encrypt'

function Timeline() {
  let id = useId()

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-visible">
      <svg
        className="absolute left-[max(0px,calc(50%-18.125rem))] top-0 h-full w-1.5 lg:left-full lg:ml-1 xl:left-auto xl:right-1 xl:ml-0"
        aria-hidden="true"
      >
        <defs>
          <pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0 0H6M0 8H6"
              className="stroke-sky-900/10 xl:stroke-white/10 dark:stroke-white/10"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

function Glow() {
  let id = useId()

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem]">
      <svg
        className="absolute -bottom-48 left-[-40%] h-[80rem] w-[180%] lg:-right-40 lg:bottom-auto lg:left-auto lg:top-[-40%] lg:h-[180%] lg:w-[80rem]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-desktop`} cx="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
          <radialGradient id={`${id}-mobile`} cy="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-desktop)`}
          className="hidden lg:block"
        />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-mobile)`}
          className="lg:hidden"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 right-0 h-px bg-white mix-blend-overlay lg:left-auto lg:top-0 lg:h-auto lg:w-px" />
    </div>
  )
}

function FixedSidebar({
  main,
  footer,
}: {
  main: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      {/* <Glow /> */}
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))] chbackground">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
            <div className="relative">
              {/* <StarField className="-right-44 top-14" /> */}
              {main}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function Layout({ children }: { children: React.ReactNode }) {
  // const vergaderingen = await sanityFetch<SanityDocument[]>({query: vergaderingenQuery});
  // const announcements = await sanityFetch<SanityDocument[]>({query: announcementsQuery});

  const items = await sanityFetch<SanityDocument[]>({query: combinedSortedQuery});
  console.log(items);

  return (
    <>
      <FixedSidebar main={<Intro />} footer={<IntroFooter />} />
      <ThemeToggle />
      <div className="relative flex-auto">
        <Timeline />
        <main className="space-y-20 py-20 sm:space-y-32 sm:py-32">
          {items.map((item) => (
            item.number ? (
            <Article key={item._id} id={item.number} date={item.date}>
              <h2>De {item.number}ste Vergadering...</h2>
              <p>...van het <i>Medisch-Natuurfilosofisch en Veterinair-Tandheelkundig Gezelschap &quot;Christiaan Huygens&quot;</i> gehouden op <b>{new Date(item.date).toLocaleDateString('nl', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b> in de <b>{item.location}</b>.</p>
              <p>Tijdens de vergadering is door <b>het {item.lecturer.name}</b> een {item.lecturer.type === "lector" ? 'lezing' : 'memorisatie'} gegeven getiteld <a href={item.lecture.fileUrl}>&quot;{item.lecture.title}&quot;</a>.</p>
              <p>De uitnodiging van deze vergadering is <a className="hover:cursor-pointer" href={item.invitationUrl}>hier</a> te vinden.</p>
            </Article>
            ) : (
              <Article key={item._id} id={item.title} date={item.date}>
                <h2>{item.title}</h2>
                <p>
                  {item.body.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </Article>
            )
          ))}
        </main>
      </div>
    </>
  )
}
