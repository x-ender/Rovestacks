import Image from "next/image";

export default function PhoneShot({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`phone-wrap ${className}`}>
      <div className="phone-glow" />
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          <Image
            src={src}
            alt={alt}
            width={429}
            height={908}
            style={{ width: "100%", height: "auto" }}
            sizes="230px"
          />
        </div>
      </div>
    </div>
  );
}
