const Footer = () => {
  return (
    <div
      id="footer"
      className="bg-black py-24 relative w-full px-12 sm:px-16 lg:px-28 flex flex-col items-center justify-center z-5"
    >
      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-8 sm:gap-10 lg:gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-6 sm:mb-8">
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <img
              src="/images/logo.png"
              alt="ZAFNAT Logo"
              className="w-32 sm:w-36 lg:w-40 h-auto mb-1 sm:mb-2"
            />
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Transformando la agricultura con tecnología, innovación y
              cooperación internacional para un futuro sostenible.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">
              Divisiones
            </h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <a
                href="#modules"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-xs sm:text-sm"
              >
                InnovAgro - Agricultura Digital
              </a>
              <a
                href="#structure"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-xs sm:text-sm"
              >
                Panea - Educación y Eventos
              </a>
              <a
                href="#structure"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-xs sm:text-sm"
              >
                Goshen - Producción e Infraestructura
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">
              Servicios
            </h3>
            <nav className="flex flex-col gap-2 sm:gap-3">
              <a
                href="#producers"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm"
              >
                Productores
              </a>
              <a
                href="#cooperation"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm"
              >
                Cooperación Internacional
              </a>
              <a
                href="#fitotecnia"
                className="text-gray-400 hover:text-lime-400 transition-colors duration-300 text-sm"
              >
                Fitotecnia
              </a>
              <a
                href="#zootecnia"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm"
              >
                Zootecnia
              </a>
            </nav>
          </div>

          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-1 sm:mb-2">
              Síguenos
            </h3>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://www.facebook.com/myzafnat?mibextid=wwXIfr&rdid=NBbFIDXpJpINxFfd&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17PCrNPC53%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-blue-500/20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/10 hover:border-blue-400/50"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
                className="bg-white/5 hover:bg-pink-500/20 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/10 hover:border-pink-400/50"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-1 sm:mt-2">
              contacto@zafnat.com
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm mb-2">
              Documentación Institucional
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Políticas de Privacidad
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Términos de Uso
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Política Anticorrupción
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="#"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Transparencia
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm mb-2">
              Certificaciones
            </h4>
            <div className="flex gap-4">
              <div className="bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-xs text-gray-300">ISO 9001</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-xs text-gray-300">Global GAP</span>
              </div>
              <div className="bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-xs text-gray-300">Organic</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} ZAFNAT Group International. Todos los
            derechos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Innovación agrícola • Tecnología sostenible • Cooperación global
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
