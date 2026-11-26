import SiteLayout from "../../layouts/SiteLayout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";

// One layout for Privacy Policy and Terms: a title, intro and numbered sections of plain text.
export default function LegalPage({ content, path }) {
  return (
    <SiteLayout>
      <Seo title={content.title} path={path} description={content.intro} />
      <PageHeader eyebrow={`Last updated ${content.updated}`} title={content.title} subtitle={content.intro} />
      <section className="bg-white py-16">
        <div className="container-x max-w-3xl">
          {content.sections.map(({ heading, body }, index) => (
            <div key={heading} className="mb-10 last:mb-0">
              <h2 className="font-heading text-2xl font-bold text-ink">
                {index + 1}. {heading}
              </h2>
              <div className="mt-3 space-y-3 leading-relaxed text-gray-600">
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
