import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import SiteLayout from "../layouts/SiteLayout";
import PageHeader from "../components/PageHeader";
import FoodImage from "../components/FoodImage";
import { BLOG_POSTS } from "../data/content";

// All blog posts (/blog). The homepage shows a few; this page shows every one.
export default function BlogList() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="News & Updates" title="Our Blog" subtitle="Stories, updates and ideas from our restaurant, hotel and club." />
      <section className="bg-sand py-16">
        <div className="container-x">
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <FoodImage src={post.image} alt="" className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand">
                      {post.category} · {post.day} {post.month}
                    </p>
                    <h2 className="mt-2 text-lg font-bold leading-snug">{post.title}</h2>
                    <p className="mt-2 text-sm text-gray-500">{post.excerpt}</p>
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
        </div>
      </section>
    </SiteLayout>
  );
}
