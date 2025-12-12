import View, { ViewContent } from "@/components/view";
import { PinContainer } from "@/fx/3dpin";

const TEAM_MEMBERS = [
  {
    title: "Presidente de la Junta Directiva",
    name: "Claribelis Méndez Turbi",
    role: "Vicepresidente",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "David Osorio",
    role: "Secretario",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Felipe Santiago De Los Santos Contreras",
    role: "Vicepresidente",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Lauris Mabel Jimenez Garcia",
    role: "Tesorera",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Oscar Morfa de los Santos",
    role: "Sub-Secretario",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Robert Cristian Wellington Troncoso Ortiz",
    role: "Comisario de Cuenta",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Kelvin Manuel Pichardo",
    role: "Sub-Comisario de Cuenta",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Elvin Cesar De Los Santos",
    role: "Director",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Jose Yaribaldy Santos Mena",
    role: "Director",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Gregory Jose Santos Gomerez",
    role: "Director",
  },
  {
    title: "Presidente de la Junta Directiva",
    name: "Daliza Morfa De Los Santos",
    role: "Director",
  },
];
const TeamView = () => {
  return (
    <View className="py-40 bg-teal">
      <ViewContent className="flex flex-col gap-20">
        <div className="flex gap-6 relative">
          <div className="w-1 bg-emerald-400 rounded-full relative" />

          <div className="flex h-full flex-col gap-8 relative z-2">
            <div className="w-full max-w-2xl flex flex-col gap-6">
              <h1 className="text-white font-bold text-5xl sm:text-6xl">
                Junta <span className="text-emerald-400">Directiva</span>
              </h1>

              <p className="text-gray-200 font-medium text-sm sm:text-base lg:text-lg">
                Profesionales con amplia trayectoria que guían la visión,
                integridad y crecimiento de Zafnat.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TEAM_MEMBERS.map((member) => (
            <PinContainer
              title={member.role}
              className="w-full px-6"
              containerClassName="h-[220px]"
            >
              <div className="flex flex-col gap-6 w-full items-center justify-center">
                <p className="h-15 w-15 uppercase font-bold rounded-full text-white bg-gray-800 flex items-center justify-center">
                  {member.name.charAt(0)}
                  {member.name.charAt(1)}
                </p>

                <div className="w-full">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xs text-slate-100">
                    {member.name}
                  </h3>
                  <p className="text-white text-xs opacity-70">{member.role}</p>
                </div>
              </div>
            </PinContainer>
          ))}
        </div>
      </ViewContent>
    </View>
  );
};

export default TeamView;
