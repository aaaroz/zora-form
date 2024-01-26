import Image from "next/image";

export const FeatureItem = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  return (
    <div className="px-5 mt-5 flex flex-col md:flex-row justify-between items-center border-b border-dashed">
      <Image
        src={`${imageUrl}`}
        alt="feature-item"
        width={250}
        height={250}
        className="transition-all hover:scale-[1.02]"
      />
      <div className="py-14 px-5 lg:px-20 space-y-3">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
