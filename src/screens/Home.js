import React from 'react'
import Header from '../Header'
import { Image } from 'semantic-ui-react'

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Wellcome!</h1>
      <Image src='/logo-home.png' size='medium' spaced centered />
    </div>
  )
}
export default Home
