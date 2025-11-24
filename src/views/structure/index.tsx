import StructureItem from "./components/structure-item";

const StructurePage = () => {
  return (
    <div>
      <StructureItem
        title="InnoVagro"
        description="Agricultura de precisión y trazabilidad Digital. Plataforma que optimiza la comercialización agrícola usando inteligencia artificial."
        imageSrc="/images/structure/hero_1.png"
      />

      <StructureItem
        title="Panea"
        description="Formación y cooperación científica internacional. Conectamos expertos, universidades y productores para promover el conocimiento agroindustrial."
        imageSrc="/images/structure/hero_2.png"
      />

      <StructureItem
        title="Goshen"
        description=" Infraestructura y bienes raíces a groindustriales. Creamos espacios sostenibles y productivos que impulsan el desarrollo rural y humano."
        imageSrc="/images/structure/hero_3.png"
      />
    </div>
  );
};

export default StructurePage;
