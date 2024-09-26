
import aboutMainImage from '../Assets/aboutMainImage.png'
import { celebrities } from '../Constants/CelebrityData'
import HomeLayout from '../Layouts/HomeLayout'
import CarouselSide from './CarouselSide'
export default function AboutUs() {
 
  return (
   <HomeLayout>
    <div className="pl-20 pt-20 flex flex-col items-center justify-center text-white">
        <div className='flex items-center gap-5 mx-10 justify-center'>
        <section className="w-1/2 space-y-10">
        <h1 className='text-5xl text-yellow-500 font-semibold'>
            Affordable and quality education
        </h1>
        <p>
        At Education, we believe in the transformative power of education. Our mission is to provide accessible, high-quality learning experiences that foster intellectual growth, personal development, and a passion for lifelong learning.
        </p>
        </section>
        <div className="w-1/2">
        <img style={{filter:"drop-shadow(0px 10px 10px)"}} id="test1" src={aboutMainImage} className='drop-shadow-2xl' alt="" />
        </div>

        </div>
        <div className="carousel w-1/2">
       
        {celebrities && celebrities.map(celebrity=>(<CarouselSide  key={celebrity.slideNumber} description={celebrity.description} title={celebrity.title} 
        image={celebrity.image} slideNumber={celebrity.slideNumber} totalSlides={celebrities.length}/>))}
 
</div>
    </div>
   </HomeLayout>
  )
}
