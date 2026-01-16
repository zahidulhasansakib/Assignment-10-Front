import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const HeroSlider = () => {
  return (
    <div className="w-full h-[350px] md:h-[500px] rounded-xl overflow-hidden mt-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        loop={true}
        className="w-full h-full">
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1502877338535-766e1452684a)",
            }}>
            <div className="bg-black/60 w-full h-full flex items-center">
              <div className="text-white px-10 max-w-xl">
                <h1 className="text-4xl font-bold mb-4">
                  Drive Your Way, Anytime, Anywhere
                </h1>
                <p className="mb-6">
                  Choose from premium and affordable cars for business trips,
                  family tours, or daily travel.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7)",
            }}>
            <div className="bg-black/60 w-full h-full flex items-center">
              <div className="text-white px-10 max-w-xl">
                <h1 className="text-4xl font-bold mb-4">
                  Book a Car in Just a Few Clicks
                </h1>
                <p className="mb-6">
                  Fast online booking with flexible plans, no hidden charges,
                  and easy pickup & return.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1525609004556-c46c7d6cf023)",
            }}>
            <div className="bg-black/60 w-full h-full flex items-center">
              <div className="text-white px-10 max-w-xl">
                <h1 className="text-4xl font-bold mb-4">
                  Safe, Reliable & Trusted Service
                </h1>
                <p className="mb-6">
                  All cars are regularly serviced and sanitized. Enjoy safe
                  rides with 24/7 support.
                </p>
              
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
