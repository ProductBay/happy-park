type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={
        centered
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      {eyebrow ? <span className="hp-eyebrow">{eyebrow}</span> : null}

      <h2 className="hp-heading mt-5 text-4xl font-black sm:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description ? (
        <p
          className={`hp-copy mt-5 text-base sm:text-lg ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
