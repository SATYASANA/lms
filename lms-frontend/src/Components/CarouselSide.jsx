import React from 'react'

export default function CarouselSide({title,image,description,slideNumber, totalSlides}) {
  return (
    <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
   <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
   <img
      src={image}
      className="w-48 rounded-full border-2 border-gray-400" />
      <p className='text-center'>{description}</p>
      <h2 className="text-center text-xl text-bold">{title}</h2>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href={`#slide${(slideNumber===1?totalSlides:slideNumber-1)}`} className="btn btn-circle">❮</a>
      <a href={`#slide${(slideNumber)% totalSlides + 1}`} className="btn btn-circle">❯</a>
    </div>
   </div>
  </div>
  )
}
