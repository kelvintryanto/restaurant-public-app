import { useEffect } from "react";

export default function Hero() {
  function handleScroll() {
    const element = document.getElementById("main-course");
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const carousel = document.getElementById("carousel");
    const slides = carousel.children; // All slides
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Auto-slide every 5 seconds
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="relative h-screen w-full">
      {/* Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out h-full w-full" id="carousel">
          {/* Slide 1 */}
          <div className="h-full w-full flex-none bg-cover bg-center relative opacity-95" style={{ backgroundImage: 'url("/assets/image/Forest_Fog_1600x.webp")' }}>
            {/* Brown Overlay */}
            <div className="absolute inset-0 bg-black opacity-60" />
          </div>
          {/* Slide 1 */}
          <div
            className="h-full w-full flex-none bg-cover bg-center relative opacity-95"
            style={{
              backgroundImage: 'url("/assets/image/chef.jpg")',
            }}>
            {/* Brown Overlay */}
            <div className="absolute inset-0 bg-black opacity-60" />
          </div>
          {/* Slide 2 */}
          <div className="h-full w-full flex-none bg-cover bg-center relative opacity-95" style={{ backgroundImage: 'url("/assets/image/people.jpeg")' }}>
            <div className="absolute inset-0 bg-black opacity-60" />
          </div>
          {/* Slide 3 */}
          <div
            className="h-full w-full flex-none bg-cover bg-center relative opacity-95"
            style={{
              backgroundImage: 'url("/assets/image/peoples.jpg")',
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-60" />
          </div>
        </div>
      </div>
      {/* Overlay content (Navbar and Logo) */}
      <div className="relative z-10">
        <div className="flex justify-center align-top">
          {/* Logo */}
          {/* Navbar */}
          <nav className="top-0 left-0 w-full p-3 flex justify-between items-start bg-transparent">
            <div className="flex gap-3 items-center">
              <a href="#">
                <img src="/assets/image/logo.png" width='100px"' height="100px" alt="Logo" />
              </a>
              <div className="flex flex-col gap-2">
                <a href="#" className="text-white self-center text-4xl">
                  East Mountain Avenue
                </a>
                <i className="text-white">Miraculous Cuisines in the Beauty of Mountain Forest</i>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Overlay Text */}
      <div className="relative inset-0 flex justify-center items-center text-center text-white mt-[180px]">
        <div>
          <h1 className="text-5xl font-bold">Welcome to Our Restaurant</h1>
          <p className="text-xl mt-2">An unforgettable dining experience amidst the serene beauty of mountain forests.</p>
          <button className="px-6 py-2 bg-green-900 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition-all duration-300 mt-[200px]" onClick={handleScroll}>
            Main Course
          </button>
        </div>
      </div>
    </header>
  );
}
