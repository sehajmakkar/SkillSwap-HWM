import React from 'react'

import Benefits from '../../components/Benefits'
import Collaboration from '../../components/Collaboration'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import Pricing from '../../components/Pricing'

const LandingPage = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden bg-white-purple-gradient">
      <Header />
      <Hero />
      <Benefits />
      <Collaboration />
      {/* <Services /> */}
      <Pricing />
      {/* <Roadmap /> */}
      <Footer />
    </div>
  )
}

export default LandingPage
