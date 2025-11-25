const Footer = () => {
  return (
    <div
      id="footer"
      className="relative h-max w-full px-12 sm:px-28 flex flex-col items-center justify-center z-5 top-50 pt-32"
    >
      {/* BACKGROUND */}
      <div
        className="absolute top-0 bg-[#020609] left-0 w-full h-full scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
        style={{
          boxShadow: "0 -50px 100px rgba(0,0,0,.3)",
        }}
      />

      <div className="absolute bg-[#020609] left-0 w-full h-full z-0 pointer-events-none top-30" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-4">
            <img
              src="/images/logo.png"
              alt="ZAFNAT Logo"
              className="w-32 h-auto"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Innovación agrícola para un futuro sostenible
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start md:items-center gap-4">
            <h3 className="text-sm font-light text-white">Contenido</h3>
            <nav className="flex flex-col gap-3">
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Nosotros
              </a>
              <a
                href="#structure"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                Estructura
              </a>
              <a
                href="#modules"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                InnoVAgro
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start md:items-end gap-4">
            <h3 className="text-sm font-light text-white">Síguenos</h3>
            <div className="flex relative left-2">
              <a
                href="https://www.facebook.com/myzafnat?mibextid=wwXIfr&rdid=NBbFIDXpJpINxFfd&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17PCrNPC53%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/myzafnat/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} ZAFNAT. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
