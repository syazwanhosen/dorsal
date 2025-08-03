import { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide, Splide as SplideClass } from "@splidejs/react-splide";

// Components
import { Card, CardContent } from "@/components/ui/card";

// Images
import dorsalFyiImage from "../../assets/product-family/dorsal_fyi.jpg";
import dorsalCompanionImage from "../../assets/product-family/dorsal_companion.png";
import dorsalAppealImage from "../../assets/product-family/dorsal_appeal.png";
import dorsalDataImage from "../../assets/product-family/dorsal_data.png";
import dorsalEnterpriseImage from "../../assets/product-family/dorsal_enterprise.png";

import "@splidejs/react-splide/css";
import "./style.css";

const products = [
  {
    title: "Dorsal.fyi",
    description:
      "Free public access to crowd-sourced medical bill data. Great for patients wanting pricing insights before receiving care.",
    image: dorsalFyiImage
  },
  {
    title: "Dorsal Companion",
    description:
      "Think Rocket Money but for healthcare. Tracks bills, finds discrepancies, and assists in saving on out-of-pocket costs.",
    image: dorsalCompanionImage
  },
  {
    title: "Dorsal Appeals Engine",
    description:
      "Appeal denied claims via web, hospital-specific app, or even SMS. Easy-to-use engine to guide consumers through the process.",
    image: dorsalAppealImage
  },
  {
    title: "Dorsal Data",
    description:
      "Our polished dataset offering for reserchers, policy makers, and analysts seeking deep insight into healthcare costs.",
    image: dorsalDataImage
  },
  {
    title: "Dorsal for Enterprise",
    description:
      "Tailored for employers and clinics looking to reduce healthcare spend by leveranging Dorsal insights at a popilation level.",
    image: dorsalEnterpriseImage
  },
];


export const ProductFamily = () => {
  const splideRef = useRef<SplideClass | null>(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const updateArrows = () => {
    const splide = splideRef.current?.splide;
    if (!splide) return;

    const index = splide.index;
    const total = splide.length;
    const perPage = Number(splide.options.perPage ?? 1);

    setCanGoPrev(index > 0);
    setCanGoNext(index < total - perPage);
  };

  useEffect(() => {
    const splide = splideRef.current?.splide;
    if (splide) {
      splide.on("mounted move resized", updateArrows);
    }

    return () => {
      if (splide) {
        splide.off("mounted move resized");
      }
    };
  }, []);

  useEffect(() => {
    const splide = splideRef.current?.splide;

    if (splide) {
      splide.on('move', () => {
        const list = document.querySelector('.splide__list') as HTMLElement;
        if (list) {
          list.style.transition = 'transform 1s ease-in-out';
        }
      });
    }
  }, []);

  return (
    <section
      className="container relative lg:min-h-fit md:min-h-full w-full overflow-hidden lg:mt-16 mt-6 bg-gradient-to-br from-[#864196] to-[#EB3897]
             lg:bg-[url('@/assets/union.png')]
             lg:bg-center lg:bg-no-repeat lg:bg-[length:100%_100%]
             lg:bg-gradient-none lg:h-[800px]"
    >
      <div className="md:py-16 pb-16 lg:pb-10 px-6 sm:px-12 text-white text-center z-10 relative mt-16 md:mt-0">
        <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white">
          <span className="text-xs font-semibold uppercase bg-gradient-to-r from-[#E770C1] to-[#9F70FD] text-transparent bg-clip-text">
            PRODUCTS
          </span>
        </span>
        <h2 className="text-[20px] sm:text-[24px] md:text-[24px] lg:text-[32px] font-bold leading-tight mt-4">
          Dorsal Product Family
        </h2>
        <p className="text-base sm:text-lg text-white/90 mt-4">
          Explore our suite of tools built to empower consumers, researchers, and enterprises with healthcare <br />
          price transparency and negotiation.
        </p>
      </div>

      {/* Slider */}
      <div className="relative z-10 pb-16 lg:pb-[8rem]">
        <Splide
          ref={splideRef}
          options={{
            arrows: true,
            pagination: false,
            rewind: false,
            perPage: 3,
            gap: "1.5rem",
            padding: { left: "1rem", right: "1rem" },
            breakpoints: {
              1024: { perPage: 3 },
              1023: { perPage: 2 },
              768: { perPage: 2 },
              639: { perPage: 1 },
            },
            speed: 600,
            easing: "ease-in-out",
            omitEnd: false,
          }}
          className="relative [&_.splide__arrow]:bg-white [&_.splide__arrow]:text-purple-600 
                    [&_.splide__arrow]:rounded-full [&_.splide__arrow]:w-10 [&_.splide__arrow]:h-10 
                    [&_.splide__arrow]:shadow-md [&_.splide__arrow]:hover:bg-purple-100"
        >
          <style>
            {`
              .splide__arrow--prev { display: ${canGoPrev ? "flex" : "none"} !important; }
              .splide__arrow--next { display: ${canGoNext ? "flex" : "none"} !important; }
            `}
          </style>

          {products.map((product, index) => (
            <SplideSlide key={index}>
              <Card className="mx-auto h-full min-w-[280px] max-w-[360px] shrink-0 rounded-2xl bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src={product.image}
                      alt="Product illustration"
                      className="h-40 object-contain mb-4"
                    />
                    <h3 className="text-lg font-semibold text-purple-700 text-center">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-700 mt-2 text-center">
                      {product.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default ProductFamily;
