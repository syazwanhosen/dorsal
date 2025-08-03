import { useEffect, useRef } from 'react';
import quotation from "@/assets/qutation.png";

const testimonials = [
  { id: 1, quote: "The transparency in billing blew my mind. I finally feel in control." },
  { id: 2, quote: "Such a relief to know what others paid before heading to the hospital." },
  { id: 3, quote: "Negotiated my bill and saved RM800. This app is gold!" },
  { id: 4, quote: "Uploading bills was seamless. Proud to help the community." },
  { id: 5, quote: "I was able to compare bills and get clarity before surgery." },
  { id: 6, quote: "Effortless upload and reliable cost estimates — total game-changer." },
  { id: 7, quote: "This platform saved me time and stress. Highly recommended." },
  { id: 8, quote: "The breakdowns helped me ask the right questions at the hospital." },
];

const Testimonials = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const debounce = (func: () => void, delay: number) => {
      let timeout: NodeJS.Timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
      };
    };
    const calculateAnimation = () => {
      if (!sliderRef.current || !contentRef.current) return;
      const contentWidth = contentRef.current.scrollWidth / 2;
      sliderRef.current.style.setProperty('--marquee-distance', `-${contentWidth}px`);
      sliderRef.current.style.setProperty('--marquee-duration', `${contentWidth / 50}s`);
    };
    const debouncedCalculate = debounce(calculateAnimation, 100);
    calculateAnimation();
    window.addEventListener('resize', debouncedCalculate);
    return () => window.removeEventListener('resize', debouncedCalculate);
  }, []);

  return (
    <section className='Testimonial bg-white'>
    <div className="lg:pt-20 py-16 container px-0">
      <div className="mx-auto text-center px-4">
        {/* Badge */}
        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#9F70FD1A] mb-4">
          <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">TESTIMONIALS</span>
        </span>

        {/* Title */}
        <div className="text-center mb-6 lg:mb-10">
          <h3 className="lg:text-4xl text-[20px] sm:text-[24px] md:text-[24px] font-bold text-gray-800">Walls Of Love</h3>
        </div>
        </div>

      <div className="relative overflow-hidden w-full" ref={sliderRef}>
        <div 
          className="flex flex-nowrap gap-0 animate-marquee"
          ref={contentRef}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            backfaceVisibility: "hidden"
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 px-3 w-full sm:w-1/2 lg:w-1/4">
              <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg h-full font-sans">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[#8770BC] font-bold text-lg">John Smith</h4>
                  <img 
                    src={quotation} 
                    alt="Quotation" 
                    className="h-12 w-12 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="text-black text-base leading-snug text-left mb-0">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(var(--marquee-distance, -50%)); }
        }
        .animate-marquee {
          animation: marquee var(--marquee-duration, 30s) linear infinite;
          transform: translateZ(0);
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: calc(var(--marquee-duration, 30s) * 0.75);
          }
        }
      `}</style>
    </div>
    </section>
  );
};

export default Testimonials;