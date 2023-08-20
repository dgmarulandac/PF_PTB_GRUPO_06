import React, { useEffect, useState } from "react";

export default function Slider() {
    const [currentImage, setCurrentImage] = useState(0)
    const slides = [
        "https://www.lunapark.com.ar/images/eventos/eventos/11066.jpg?1680027036",
        "https://www.lunapark.com.ar/images/eventos/eventos/11027.jpg?1679514160",
        "https://www.lunapark.com.ar/images/eventos/eventos/11477.jpg?1690910639",
    ];
    const nextImage = () => {
        setCurrentImage((prevImage) =>
            prevImage === slides.length - 1 ? 0 : prevImage + 1
        );
    };

    const prevImage = () => {
        setCurrentImage((prevImage) =>
            prevImage === 0 ? slides.length - 1 : prevImage - 1
        );
    };

    const handleKeys = (e)=>{
        if (e.key === 'ArrowRight'){
            nextImage()
        }
        if(e.key === 'ArrowLeft'){
            prevImage()
        } 
    }
    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
              prevImage()
            } else if (event.key === 'ArrowRight') {
              nextImage()
            }
        })

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <img src={slides[currentImage]} alt="slider" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            </div>
            <button onClick={prevImage} type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/50 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button onClick={nextImage} type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/50 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>

    )
}