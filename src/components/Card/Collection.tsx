import { Props as BaseProps, UserData } from "./index";
import { useTheme } from "../Provider/theme";
import { useEffect, useState } from "react";
import {
  AssetTypeInfo,
  generateAvatarGradient,
  getAssetType
} from "../../utils";
import { FileIcon, MusicIcon } from "@iconicicons/react";
import Link from "next/link";
import Popover from "../Popover";
import Avatar from "../Avatar";
import styles from "./Card.module.sass";

export default function Collection({
  name,
  images,
  userData,
  className,
  style,
  onClick
}: Props) {
  const [itemTypes, setItemTypes] = useState<AssetTypeInfo[]>([]);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      let types: AssetTypeInfo[] = [];

      for (let i = 0; i < 3; i++) {
        const assetType = await getAssetType(images[i]);
        types.push(assetType);
      }

      setItemTypes(types);
    })();
  }, []);

  function formatName(name: string) {
    if (name.length <= 12) return name;
    return (
      name.substring(0, 5) +
      "..." +
      name.substring(name.length - 2, name.length)
    );
  }

  const [previewHovered, setPreviewHovered] = useState(false);
  const [zoomPreview, setZoomPreview] = useState(false);

  useEffect(() => {
    if (!previewHovered) return;
    const handle = setTimeout(() => {
      if (previewHovered) setZoomPreview(true);
    }, 1050);

    return () => clearTimeout(handle);
  }, [previewHovered]);

  const [gradient, setGradient] = useState<
    ReturnType<typeof generateAvatarGradient>
  >();

  useEffect(
    () =>
      setGradient(
        generateAvatarGradient(userData?.name || userData?.usertag || "")
      ),
    [userData]
  );

  return (
    <div
      className={[
        "VertoAssetCard",
        styles.Asset,
        theme === "Dark" ? styles.DarkAsset : "",
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      style={{ zIndex: zoomPreview ? 10 : undefined, ...style }}
      onClick={onClick}
    >
      <div
        className={
          styles.Preview +
          " " +
          styles.CollectionItem +
          " " +
          (zoomPreview ? styles.MouseOver : "")
        }
        style={{ overflow: "visible" }}
        onMouseEnter={() => setPreviewHovered(true)}
        onMouseLeave={() => {
          setZoomPreview(false);
          setPreviewHovered(false);
        }}
      >
        {itemTypes.length >= 3 && (
          <>
            <Image type={itemTypes[0]} src={images[0]} pos="left" />
            <Image type={itemTypes[1]} src={images[1]} pos="middle" />
            <Image type={itemTypes[2]} src={images[2]} pos="right" />
          </>
        )}
      </div>
      <div className={styles.AssetInfo}>
        <h1 className={styles.ArtName}>{formatName(name)}</h1>
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
              <a
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
            </Link>
          </Popover>
        )}
        <div className={styles.Price}>{images.length} items</div>
      </div>
    </div>
  );
}

interface Props extends BaseProps {
  name: string;
  images: string[];
  userData?: UserData;
}

const Image = ({
  type: { type, contentType },
  src,
  pos
}: {
  type: AssetTypeInfo;
  src: string;
  pos: "left" | "right" | "middle";
}) => {
  const spotlight = pos === "middle";

  return (
    <>
      {(type === "image" && (
        <img
          src={src}
          alt=""
          draggable={false}
          className={spotlight ? styles.SpotLight : styles.SideItem}
        />
      )) ||
        (type === "video" && (
          <video
            controls={false}
            // @ts-ignore
            onMouseEnter={(e) => e.target.play()}
            // @ts-ignore
            onMouseLeave={(e) => e.target.pause()}
            muted
            className={spotlight ? styles.SpotLight : styles.SideItem}
          >
            <source src={src} type={contentType} />
          </video>
        )) ||
        (type === "audio" && (
          <div
            className={
              styles.SvgWrapper + " " + spotlight
                ? styles.SpotLight
                : styles.SideItem
            }
          >
            <MusicIcon />
          </div>
        )) ||
        (type === "other" && (
          <div
            className={
              styles.SvgWrapper + " " + spotlight
                ? styles.SpotLight
                : styles.SideItem
            }
          >
            <FileIcon />
          </div>
        ))}
    </>
  );
};
