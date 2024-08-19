'use client';

import React from 'react'
import Link from 'next/link'
import { useStyles } from '../contexts/StyleContext'

function Footer() {
  const { styles, isLoading } = useStyles()

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const bgColor = styles.backgroundColor
  const textColor = styles.textColor
  const logoColor = styles.logoColor
  const hoverColor = styles.hoverColor

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor }} className="body-font mt-8">
      <div className="container px-5 py-12 mx-auto flex flex-wrap justify-between items-center">
        <div className="flex-shrink-0 text-center md:text-left mb-6 md:mb-0">
          <Link href="/" style={{ color: textColor }} className="flex title-font font-medium items-center md:justify-start justify-center">
            <img src="/photo/door.svg" alt="Door" style={{ color: logoColor }} className="inline-block h-8 w-8 mr-3" />
            <span className="text-2xl font-bold">{styles.logoname || 'DoorDash'}</span>
          </Link>
          <p className="mt-2 text-base">Your trusted home services partner</p>
        </div>
        <div className="flex flex-wrap md:text-left text-center">
          {['Services', 'About Us', 'Contact', 'FAQ'].map((category, index) => (
            <div key={index} className="px-4 mb-4 md:mb-0">
              <h2 className="title-font font-medium text-lg mb-2">{category}</h2>
              <nav className="list-none">
                <li>
                  <Link href="#" className={`text-base hover:${hoverColor}`}>Learn More</Link>
                </li>
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto py-4 px-5 flex flex-wrap justify-between items-center">
          <p className="text-sm">© 2023 {styles.logoname || 'DoorDash'} - All Rights Reserved</p>
          <span className="inline-flex mt-2 md:mt-0">
            {[
              { href: "https://facebook.com", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
              { href: "https://twitter.com", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
              { href: "https://instagram.com", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 19.5h.01" },
              { href: "https://linkedin.com", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" }
            ].map((social, index) => (
              <Link key={index} style={{ color: textColor }} className={index > 0 ? "ml-4" : ""} href={social.href}>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d={social.icon}></path>
                </svg>
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer