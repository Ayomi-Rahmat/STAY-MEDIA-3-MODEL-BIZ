import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import SiteLayout from "../../layouts/SiteLayout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
import Photo from "../../components/Photo";
import NotFound from "./NotFoundPage";
import { BLOG_POSTS } from "../../data/content";
import { BLOG_BODIES } from "./data/pages";

// One article (/blog/some-slug). useParams() reads "some-slug" from the address bar.
export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) return <NotFound />;

  const paragraphs = BLOG_BODIES[post.slug] ?? [post.excerpt];

  return (
    <SiteLayout>
      <Seo title={post.title} path={`/blog/${post.slug}`} description={post.excerpt} image={post.image} />
      <PageHeader eyebrow={`${post.category} · ${post.day} ${post.month}`} title={post.title} subtitle={`By ${post.author}`} />
      <article className="bg-white py-16">
        <div className="container-x max-w-3xl">
          <Photo src={post.image} alt="" className="h-72 w-full rounded-3xl object-cover" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-700">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link to="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            <FaArrowLeft aria-hidden="true" /> Back to all posts
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
