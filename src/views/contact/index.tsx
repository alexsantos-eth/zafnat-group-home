import { useEffect } from "react";
import Heading from "@/layout/components/heading";

const ContactPage: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="contact"
      className="relative h-max w-full px-12 sm:px-28 flex flex-row items-start justify-between z-3 top-64 py-32"
    >
      {/* BACKGROUND */}
      <div
        className="absolute top-0 bg-blue left-0 w-full h-full scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
        style={{
          boxShadow: "0 -50px 100px rgba(0,0,0,.3)",
        }}
      />

      <div className="relative w-full pb-0 gap-30 flex flex-row z-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-[400px]">
            <Heading
              title="Contacto"
              description="¿Listo para digitalizar tu finca y mejorar tu producción? Nuestro equipo te ayudará a implementar InnoVAgro paso a paso."
            />
          </div>
        </div>
      </div>

      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/alexdsantosv/30min?hide_event_type_details=1&hide_gdpr_banner=1"
        style={{ minWidth: "520px", height: "700px" }}
      ></div>
    </div>
  );
};

export default ContactPage;
