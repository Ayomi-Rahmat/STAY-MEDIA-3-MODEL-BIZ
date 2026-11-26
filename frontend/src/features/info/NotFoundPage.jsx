import { Link } from "react-router-dom";
import Seo from "../../components/Seo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-5 text-center">
      <Seo title="Page not found" noindex />
      <p className="font-script text-2xl text-brand">Oops!</p>
      <h1 className="font-heading text-4xl font-bold">Page not found</h1>
      <p className="text-gray-500">This page doesn&apos;t exist yet.</p>
      <Link to="/" className="mt-2 font-semibold text-brand hover:underline">
        Back to home
      </Link>
    </div>
  );
}
