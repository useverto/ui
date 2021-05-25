import { Props as BaseProps, UserData } from "./index";
import { useTheme } from "../Provider/theme";
import { useEffect, useState } from "react";
import { FileIcon, MusicIcon } from "@iconicicons/react";
import Link from "next/link";
import Popover from "../Popover";
import Avatar from "../Avatar";
import styles from "./Card.module.sass";

export default function Asset({
  name,
  price,
  image,
  ticker,
  userData,
  reverse,
  className,
  style,
  onClick
}: Props) {
  const theme = useTheme();
  const { type, contentType } = useAssetType(image);

  return (
    <div
      className={[
        "VertoAssetCard",
        styles.Asset,
        reverse ? styles.ReverseAsset : "",
        theme === "Dark" ? styles.DarkAsset : "",
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.Preview + " " + (ticker ? styles.Logo : "")}>
        {((ticker || type === "image") && (
          <img src={image} alt={name} draggable={false} />
        )) ||
          (type === "video" && (
            <video
              controls={false}
              // @ts-ignore
              onMouseEnter={(e) => e.target.play()}
              // @ts-ignore
              onMouseLeave={(e) => e.target.pause()}
              muted
            >
              <source src={image} type={contentType} />
            </video>
          )) ||
          (type === "audio" && <MusicIcon />) ||
          (type === "other" && <FileIcon />)}
      </div>
      <div className={styles.AssetInfo}>
        <h1 style={ticker ? { margin: 0 } : {}}>{name}</h1>
        {ticker && <span className={styles.AssetTicker}>{ticker}</span>}
        {userData && (
          <Popover
            mode="hover"
            className={styles.UserPopover + " " + styles.AssetUserPopover}
            content={
              <Avatar
                avatar={userData.avatar}
                usertag={userData.usertag}
                displaytag={userData.displaytag}
                name={userData.name}
                size="large"
              />
            }
          >
            <Link href={`/@${userData.usertag}`}>
              <a className={styles.UserData}>
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  draggable={false}
                />
                <span>@{userData.displaytag || userData.usertag}</span>
              </a>
            </Link>
          </Popover>
        )}
        <p className={styles.Price + " " + (ticker ? styles.WithTicker : "")}>
          ${price.toLocaleString()}
          {!ticker && <span>/bit</span>}
        </p>
      </div>
    </div>
  );
}

export const Clear = ({ image, className, style, onClick }: ClearProps) => {
  const { type, contentType } = useAssetType(image);

  return (
    <div
      className={[
        "VertoAssetCard",
        styles.Asset,
        styles.ClearAsset,
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.Preview}>
        {(type === "image" && (
          <img src={image} alt="art" draggable={false} />
        )) ||
          (type === "video" && (
            <video
              controls={false}
              // @ts-ignore
              onMouseEnter={(e) => e.target.play()}
              // @ts-ignore
              onMouseLeave={(e) => e.target.pause()}
              muted
            >
              <source src={image} type={contentType} />
            </video>
          )) ||
          (type === "audio" && <MusicIcon />) ||
          (type === "other" && <FileIcon />)}
      </div>
    </div>
  );
};

const useAssetType = (src: string) => {
  const [type, setType] = useState<"image" | "video" | "audio" | "other">(
    "image"
  );
  const [contentType, setContentType] = useState("");

  useEffect(() => {
    (async () => {
      const content_type = (await fetch(src)).headers.get("Content-Type");
      setContentType(content_type);

      if (content_type.match(/^image\//)) setType("image");
      else if (content_type.match(/^video\//)) setType("video");
      else if (content_type.match(/^audio\//)) setType("audio");
      else setType("other");
    })();
  }, [src]);

  return { type, contentType };
};

interface Props extends BaseProps {
  name: string;
  price: number;
  image: string;
  ticker?: string;
  userData?: UserData;
  reverse?: boolean;
}

export interface ClearProps extends BaseProps {
  image: string;
}
