import TorusKnotScene from "./components/TorusKnotScene";

export default function App() {
  return (
    <div
      style={{
        backgroundColor: "#030707",
        background:
          "linear-gradient(46deg, rgba(3, 7, 7, 1) 0%, rgba(19, 79, 73, 1) 49%, rgba(2, 57, 18, 1) 100%)",
      }}
    >
      <div
        className="w-full h-dvh bg-[url(/images/noise.png)] bg-repeat fixed top-0 left-0 z-1000 mix-blend-multiply pointer-events-none"
        style={{ backgroundSize: "120px 120px" }}
      />
      <TorusKnotScene />
    </div>
  );
}
