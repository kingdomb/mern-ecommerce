import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../components/Layout'
/**
* @author
* @function Home
**/

const Home = (props) => {
  return (
    <Layout>
      <Jumbotron className='text-center' style={{ margin: 5 + 'rem', background: '#fff' }}>
        <h1>
          Welcome to the Admin. view!
        </h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a
          type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining
          essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum
        </p>
      </Jumbotron>
    </Layout>
  )
}

export default Home
