const SHOCKWAVE_VARIANTS = [1, 2, 3, 4] as const;

export default function Shockwaves() {
  return (
    <>
      {SHOCKWAVE_VARIANTS.map((variant) => (
        <div
          key={variant}
          className={`ls-shockwave ls-shockwave-${variant}`}
          aria-hidden
        />
      ))}
    </>
  );
}
