  import { Carousel, CarouselContent, CarouselItem} from "../ui/carousel"
  const ImageCarousel = ({images}) => { 
   
  return (
    <div>
        <Carousel className="w-full ">
            <CarouselContent>
              {images.map((image,index)=> (
                <CarouselItem key={index} className="flex flex-row items-center" >
                        <img src={image.url} alt="" className="w-full h-[80vh] object-cover rounded-none"></img> 
                </CarouselItem> 
              ))}
            </CarouselContent>
        </Carousel>
    </div>
  )
}

  export default ImageCarousel