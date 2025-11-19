const Footer = () => {
  return (
    <div className="h-[30dvh] bg-black w-full relative p-8 z-10">
      <div className="flex flex-row items-center gap-8">
        <img src="/images/logo.png" alt="Zafnat Logo" className="h-8 w-auto" />
        <div>
          <p className="text-white">
            © 2025 Zafnat Group — Innovación agrícola para un futuro sostenible.
          </p>
          <div>
            <a
              className="text-white underline text-xs"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tiktk
            </a>{" "}
            {" | "}
            <a
              className="text-white underline text-xs"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>{" "}
            {" | "}
            <a className="text-white underline text-xs" href="#">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
