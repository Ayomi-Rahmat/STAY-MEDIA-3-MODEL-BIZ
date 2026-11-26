// The title band at the top of information pages (Privacy, Terms, FAQ, Blog).
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-cream py-16 text-center">
      <div className="container-x">
        <p className="font-script text-2xl text-brand">{eyebrow}</p>
        <h1 className="mt-1 font-heading text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-gray-600">{subtitle}</p>}
      </div>
    </section>
  );
}
