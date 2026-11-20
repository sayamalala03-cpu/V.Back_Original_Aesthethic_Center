import { Hero } from '../../components/home/Hero'
import { Story } from '../../components/home/Story'
import { Specialties } from '../../components/home/Specialties'
import { Approach } from '../../components/home/Approach'
import { Standards } from '../../components/home/Standards'
import { Booking } from '../../components/home/Booking'
import '../../styles/home.css'

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Story />
      <Specialties />
      <Approach />
      <Standards />
      <Booking />
    </main>
  )
}
