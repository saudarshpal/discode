  import { Carousel, CarouselContent, CarouselItem

  } from "../ui/carousel"
  const ImageCarousel = ({images}) => {
    return (
      <div>
          <Carousel className="w-full">
              <CarouselContent>
                {images.map((images,index)=>{
                  <CarouselItem key={index}>
                    <Card className="border-0 shadow-none">
                      <CardContent className="flex aspect-square items-center justify-center ">
                        <img src={images.url} alt="" className="w-full h-full object-cover rounded-lg"></img>
                    </CardContent>
                    </Card>
                  </CarouselItem>
                })}
              </CarouselContent>
          </Carousel>
      </div>
    )
  }

  export default ImageCarousel