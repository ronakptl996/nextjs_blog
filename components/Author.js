import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className="relative mt-20 mb-8 rounded-lg bg-black bg-opacity-20 p-12 text-center">
      <div className="absolute left-0 right-2 -top-14">
        <Image
          unoptimized
          className="rounded-full align-middle"
          src={author.photo.url}
          alt={author.name}
          height="100px"
          width="100px"
        />
      </div>
      <h3 className="my-4 mt-4 text-xl font-bold text-white">{author.name}</h3>
      <p className="text-lg text-white">{author.bio}</p>
    </div>
  )
}

export default Author
