import Image from "next/image";
import Link from "next/link";

const Card = ({ name, aiPrompt, slug, desc, icon }: any) => {
  return (
   <Link href={`/dashboard/content/${slug}`}>
    <div className=" p-5 shadow:md flex flex-col border gap-3 cursor-pointer rounded-md hover:scale-105 transition-all">
      <Image src={icon} alt={`${name} icon`} height={50} width={50} />
      <h2 className=" font-bold text-lg">{name}</h2>
      <p className=" text-gray-200 line-clamp-3">{desc}</p>
    </div>
   </Link>
  );
};

export default Card;
