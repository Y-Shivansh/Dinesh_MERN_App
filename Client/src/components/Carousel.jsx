import React, { useEffect } from "react";

function Carousel() {
    useEffect(() => {
        const items = document.querySelectorAll('[data-carousel-item]');
        const prevButton = document.querySelector('[data-carousel-prev]');
        const nextButton = document.querySelector('[data-carousel-next]');
        let activeIndex = 0;

        const updateCarousel = () => {
            items.forEach((item, index) => {
                item.classList.toggle('hidden', index !== activeIndex);
                item.classList.toggle('block', index === activeIndex);
            });
        };

        const showNextItem = () => {
            activeIndex = (activeIndex + 1) % items.length;
            updateCarousel();
        };

        const showPrevItem = () => {
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateCarousel();
        };

        nextButton.addEventListener('click', showNextItem);
        prevButton.addEventListener('click', showPrevItem);

        updateCarousel();

        return () => {
            nextButton.removeEventListener('click', showNextItem);
            prevButton.removeEventListener('click', showPrevItem);
        };
    }, []);

    return (
        <div id="services" className=" overflow-hidden relative w-full border-t-[.3px] border-slate-300 sm:opacity-95 box-border" data-carousel="static">
            {/* Title */}
            <div className="px-3 flex flex-col items-center justify-center">
                <div className="text-customBrown font-extrabold sm:text-[2.5rem] text-[1.8rem] my-5 uppercase font-wallpoet">What's on deck?</div>
            </div>
            {/* Carousel wrapper */}
            <div className="px-3 flex flex-col items-center justify-center min-h-[500px] md:h-[70vh] h-full">
                {/* Item 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 duration-700 ease-in-out items-center mx-5 md:mx-28 hidden carousel-slide-left" data-carousel-item>
                    <div className='flex justify-center items-center mb-7'>
                        <a href="">
                            <img className="w-48 h-48 sm:w-96 sm:h-96 rounded-full floating-image shadow-[0px_10px_10px_0px_rgba(256,256,256,0.2)]" src="https://as1.ftcdn.net/v2/jpg/02/84/84/94/1000_F_284849453_UzNIRRcuYM5P1njdxai0WPQxwEKrz9uJ.jpg" alt="Slide 1" />
                        </a>
                    </div>
                    <div className="text-black text-justify font-alternates font-thin md:text-lg md:tracking-wide md:leading-7 text-slide">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum reiciendis deleniti eos omnis animi, dolore reprehenderit iste ex ratione accusamus expedita, dolores repellat officiis aut delectus veniam aliquam rem. Minima quaerat mollitia tenetur exercitationem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus aperiam omnis harum, amet culpa quia accusamus pariatur hic cum impedit!
                    </div>
                </div>

                {/* Item 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 duration-700 ease-in-out items-center mx-5 md:mx-28 hidden carousel-slide-left" data-carousel-item>
                    <div className="flex justify-center items-center mb-7">
                        <a href="">
                            <img className="w-48 h-48 sm:w-96 sm:h-96 rounded-full floating-image shadow-[0px_10px_10px_0px_rgba(256,256,256,0.2)]" src="https://cdn4.vectorstock.com/i/1000x1000/44/13/cartoon-hands-with-control-drone-isolated-vector-10744413.jpg" alt="Slide 2" />
                        </a>
                    </div>
                    <div className="text-black text-justify font-alternates font-thin md:text-lg md:tracking-wide md:leading-7 text-slide">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe cupiditate illum blanditiis ut, totam libero delectus distinctio quasi quis expedita aut facere eligendi. Obcaecati, repellendus accusamus? Soluta officiis ratione aliquam repellat quaerat. Placeat, rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eius facilis, molestiae, amet harum quibusdam praesentium debitis ullam cum quia placeat deserunt? Quibusdam!
                    </div>
                </div>

                {/* Item 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 duration-700 ease-in-out items-center mx-5 md:mx-28 hidden carousel-slide-left" data-carousel-item>
                    <div className="flex justify-center items-center mb-7">
                        <a href="">
                            <img className="w-48 h-48 sm:w-96 sm:h-96 rounded-full floating-image shadow-[0px_10px_10px_0px_rgba(256,256,256,0.2)]" src="https://img.freepik.com/premium-vector/drawing-drone-with-green-top-blue-green-background_410516-78882.jpg" alt="Slide 3" />
                        </a>
                    </div>
                    <div className="text-black text-justify font-alternates font-thin md:text-lg md:tracking-wide md:leading-7 text-slide">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe cupiditate illum blanditiis ut, totam libero delectus distinctio quasi quis expedita aut facere eligendi. Obcaecati, repellendus accusamus? Soluta officiis ratione aliquam repellat quaerat. Placeat, rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eius facilis, molestiae, amet harum quibusdam praesentium debitis ullam cum quia placeat deserunt? Quibusdam!
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 duration-700 ease-in-out items-center mx-5 md:mx-28 hidden carousel-slide-left" data-carousel-item>
                    <div className="flex justify-center items-center mb-7">
                        <a href="">
                            <img className="w-48 h-48 sm:w-72 sm:h-72 rounded-full floating-image shadow-[0px_10px_10px_0px_rgba(256,256,256,0.2)]" src="https://img.freepik.com/premium-vector/drawing-drone-with-green-top-blue-green-background_410516-78882.jpg" alt="Slide 3" />
                        </a>
                        <div className="text-slate-300 text-justify font-alternates font-thin md:text-lg md:tracking-wide md:leading-7 text-slide">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe cupiditate illum blanditiis ut, totam libero delectus dis Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed autem esse, omnis voluptas natus nesciunt.
                        </div>
                    </div>
                </div> */}
            </div>


            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 md:w-auto cursor-pointer group focus:outline-none"
                data-carousel-prev
            >
                <span className="inline-flex items-center justify-center w-10 h-10">
                    <svg
                        className="w-4 h-6 text-black dark:text-gray-800 rtl:rotate-180 hover:dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button
                type="button"
                className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10 md:w-auto cursor-pointer group focus:outline-none"
                data-carousel-next
            >
                <span className="inline-flex items-center justify-center w-10 h-10">
                    <svg
                        className="w-4 h-6 text-black dark:text-gray-800 rtl:rotate-180 hover:dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>

        </div>

    );
}

export default Carousel;