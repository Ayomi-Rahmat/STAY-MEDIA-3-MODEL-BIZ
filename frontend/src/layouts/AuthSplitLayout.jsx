import Logo from "../components/Logo";

// Two-column layout for Login and Register (like EcoBridge):
//   left  = dark branded panel (hidden on phones)
//   right = white card holding the form
// Each page passes its own panel content through the `panel` prop.
export default function AuthSplitLayout({ panel, children }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <aside className="relative hidden overflow-hidden bg-linear-to-br from-[#1f0502] via-[#4a0f07] to-brand-dark p-12 text-white lg:flex lg:flex-col">
        {/* soft decorative glows */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-flame/20 blur-3xl" />

        <div className="relative">
          <Logo light />
        </div>
        <div className="relative flex flex-1 flex-col justify-center">{panel}</div>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-5 py-10 lg:min-h-0">
        <div className="w-full max-w-md">
          {/* logo shows here on phones, where the left panel is hidden */}
          <div className="mb-6 flex justify-center lg:hidden">
            <Logo />
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-xl shadow-orange-900/5 ring-1 ring-black/5 sm:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
