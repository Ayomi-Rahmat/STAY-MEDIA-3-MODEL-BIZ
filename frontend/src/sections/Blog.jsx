import { Link } from "react-router-dom";
import { FaArrowRight, FaComment, FaUser } from "react-icons/fa6";
import FoodImage from "../components/FoodImage";
import SectionHeading from "../components/SectionHeading";
import { BLOG_POSTS } from "../data/content";

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-36 bg-sand pb-20 pt-4">
      <div className="container-x">
        <SectionHeading
          eyebrow="News & Updates"
          title={
            <>
              Our Latest <span className="text-brand">Blog</span> Posts
            </>
          }
        />

        <ul className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48 overflow-hidden">
                  <FoodImage
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <p className="absolute left-4 top-4 rounded-lg bg-brand px-3 py-2 text-center text-white shadow-lg">
                    <span className="block text-lg font-bold leading-none">{post.day}</span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase">{post.month}</span>
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand">{post.category}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{post.title}</h3>
                  <p className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <FaUser aria-hidden="true" className="text-brand" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaComment aria-hidden="true" className="text-brand" /> {post.comments} Comments
                    </span>
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3"
                  >
                    Read More <FaArrowRight aria-hidden="true" className="text-xs" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:gap-3">
            View all posts <FaArrowRight aria-hidden="true" className="text-xs" />
          </Link>
        </p>
      </div>
    </section>
  );
}
