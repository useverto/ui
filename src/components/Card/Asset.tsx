import { Props as BaseProps, UserData } from "./index";
import { useTheme } from "../Provider/theme";
import { useEffect, useState } from "react";
import { FileIcon, MusicIcon } from "@iconicicons/react";
import { AssetType, generateAvatarGradient, getAssetType } from "../../utils";
import Popover from "../Popover";
import Avatar from "../Avatar";
import cardStyles from "./Card.module.sass";
import styles from "./Asset.module.sass";

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

  const [gradient, setGradient] =
    useState<ReturnType<typeof generateAvatarGradient>>();

  useEffect(
    () =>
      setGradient(
        generateAvatarGradient(userData?.name || userData?.usertag || "")
      ),
    [userData]
  );

  function formatName(name: string) {
    if (name.length <= 12) return name;
    return (
      name.substring(0, 5) +
      "..." +
      name.substring(name.length - 2, name.length)
    );
  }

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
        <h1 className={ticker ? "" : styles.ArtName}>{formatName(name)}</h1>
        {ticker && <span className={styles.AssetTicker}>{ticker}</span>}
        {userData && (
          <Popover
            mode="hover"
            className={cardStyles.UserPopover + " " + styles.UserPopover}
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
            <a
              href={`/@${userData.usertag}`}
              className={styles.UserData}
              onClick={(e) => e.stopPropagation()}
            >
              {(userData.avatar && (
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  draggable={false}
                />
              )) || (
                <div
                  className={styles.Gradient}
                  style={{ background: gradient?.gradient ?? "" }}
                >
                  <span>
                    {(userData.name || userData.usertag || "")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              )}
              <span className={styles.Username}>
                @{userData.displaytag || userData.usertag}
              </span>
            </a>
          </Popover>
        )}
        <p className={styles.Price + " " + (ticker ? styles.WithTicker : "")}>
          ${price ? price.toLocaleString() : " ??"}
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
  const [type, setType] = useState<AssetType>("image");
  const [contentType, setContentType] = useState("");

  useEffect(() => {
    getAssetType(src).then((res) => {
      setContentType(res.contentType);
      setType(res.type);
    });
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
