export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <div
        className="absolute left-1/2 top-[-15%] h-[60vh] w-[60vw] -translate-x-1/2 rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(40, 184, 170, 0.18), rgba(6, 14, 20, 0) 60%)",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-1/2 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full blur-[50px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(18, 122, 110, 0.15), rgba(6, 14, 20, 0) 60%)",
        }}
      />
    </div>
  );
}
