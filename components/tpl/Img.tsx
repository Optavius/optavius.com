import type { ImgHTMLAttributes } from "react";
import sizes from "@/content/image-sizes.json";
import { BASE } from "@/lib/base";

const SIZES = sizes as Record<string, [number, number]>;

/** Plain <img> that adds the intrinsic width and height of known site images, so the browser reserves space before the file loads. */
export default function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  const src = typeof props.src === "string" ? props.src : "";
  const key = BASE && src.startsWith(BASE) ? src.slice(BASE.length) : src;
  const dims = SIZES[key];
  const extra = dims && !props.width && !props.height ? { width: dims[0], height: dims[1] } : {};
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...extra} {...props} />;
}
