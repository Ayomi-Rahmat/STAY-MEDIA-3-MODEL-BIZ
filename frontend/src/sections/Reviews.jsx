import { useCallback, useEffect, useRef, useState } from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa6";
import Photo from "../components/Photo";
import SectionHeading from "../components/SectionHeading";
import { REVIEWS } from "../data/content";
import { FALLBACK_PERSON } from "../data/images";

// A horizontally scrolling row that "snaps" card by card.
// How many cards fit (1 on phones, 2 on tablets, 3 on desktop) is worked out from the screen width,
// and the dots underneath show one dot per "page". With 3 reviews on desktop there is only one page,
// so no dots are shown; they appear automatically once more reviews are added.
export default function Reviews() {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = useCallback(() => {
    const track = trackRef.current;
    // clientWidth is 0 while the row is hidden or being resized; dividing by 0 gives Infinity and would crash the page.
    if (!track || track.clientWidth === 0) return;
    setPages(Math.min(REVIEWS.length, Math.max(1, Math.round(track.scrollWidth / track.clientWidth))));
    setPage(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure); // re-measure when the screen is resized
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const goToPage = (index) => {
    const track = trackRef.current;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="scroll-mt-22 bg-white py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="What People Say"
          title={
            <>
              Our Customers <span className="text-brand">Feedback</span>
            </>
          }
        />

        <ul
          ref={trackRef}
          onScroll={measure}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review) => (
            <li
              key={review.name}
              className="relative flex shrink-0 basis-full snap-start flex-col rounded-3xl bg-cream p-7 md:basis-[calc((100%_-_1.5rem)/2)] lg:basis-[calc((100%_-_3rem)/3)]"
            >
              <FaQuoteRight aria-hidden="true" className="absolute right-6 top-6 text-3xl text-brand/15" />
              <p className="flex gap-1 text-sm text-accent" role="img" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </p>
              <blockquote className="mt-4 flex-1 leading-relaxed text-gray-600">{review.text}</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Photo
                  src={review.image}
                  alt=""
                  fallback={FALLBACK_PERSON}
                  className="h-12 w-12 rounded-full border-2 border-brand object-cover"
                />
                <div>
                  <p className="text-sm font-bold">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {pages > 1 && (
          <div className="mt-6 flex justify-center gap-2" role="group" aria-label="Choose a review page">
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
                aria-current={page === index}
                className={`h-2.5 rounded-full transition-all ${page === index ? "w-7 bg-brand" : "w-2.5 bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
