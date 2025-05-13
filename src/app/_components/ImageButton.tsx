import Image from "next/image";

export default function ImageButton({
  btnStyles,
  img,
  width,
  height,
}: {
  btnStyles: string;
  img: string;
  width: number;
  height: number;
}) {
  return (
    <button className={btnStyles}>
      <Image src={img} alt="" width={width} height={height} />
    </button>
  );
}
