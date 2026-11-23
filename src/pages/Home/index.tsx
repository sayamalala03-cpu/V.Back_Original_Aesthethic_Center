import { useState } from 'react'
import { Hero } from '../../components/home/Hero'
import { Curtain, shouldPlayIntro } from '../../components/home/Curtain'
import { Story } from '../../components/home/Story'
import { Specialties } from '../../components/home/Specialties'
import { Approach } from '../../components/home/Approach'
import { Standards } from '../../components/home/Standards'
import { Films } from '../../components/home/Films'
import { Booking } from '../../components/home/Booking'
import '../../styles/home.css'

export default function Home() {
  // Decided once, on first render: the opening curtain plays on the first Home visit of a session.
  const [intro] = useState(shouldPlayIntro)
  return (
    <main id="top">
      {intro && <Curtain />}
      <Hero intro={intro} />
      <Story />
      <Specialties />
      <Approach />
      <Standards />
      <Films />
      <Booking />
    </main>
  )
}
