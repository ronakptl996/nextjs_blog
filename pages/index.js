import { useState } from 'react'
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components'
import { getPosts } from '../services'
import { FeaturedPosts } from '../sections'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'

import { request, gql } from 'graphql-request'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINT

const Home = ({ data, page }) => {
  const [posts, setPosts] = useState(data)
  const router = useRouter()

  const getMorePost = async () => {
    const query = gql`
    query MyQuery() {
      postsConnection(
        orderBy: createdAt_DESC
        first: 2
        ) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

    const result = await request(graphqlAPI, query)

    const newPosts = result.postsConnection.edges
    setPosts((posts) => [...posts, ...newPosts])
    console.log(newPosts)
  }
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8">
          {/* <InfiniteScroll
            dataLength={posts.length}
            next={getMorePost}
            hasMore={true}
            loader={<h2>Loading...</h2>}
            endMessage={
              <p className="text-center">Yay! You Have seen it all.</p>
            }
          > */}
          {posts.map((post, index) => (
            <PostCard post={post.node} key={post.title} />
          ))}
          {/* </InfiniteScroll> */}
          {/* <button onClick={() => router.push(`/?page=${page - 1}`)}>
            Previous
          </button>
          <button onClick={() => router.push(`/?page=${page + 1}`)}>
            Next
          </button> */}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

// fetch the data using getStaticProps()
// export async function getStaticProps() {
//   const posts = (await getPosts()) || []

//   return {
//     props: { posts },
//   }
// }

export async function getServerSideProps({ query: { page = 1 } }) {
  // Fetch data from external API
  // const posts = (await getPosts()) || []
  const data = (await getPosts(page)) || []

  // Pass data to the page via props
  return { props: { data, page: +page } }
}
