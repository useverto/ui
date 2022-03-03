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
import assetStyles from "./Asset.module.sass";
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
  }, [images]);

  function formatName(name: string) {
    if (name.length <= 12) return name;
    return (
      name.substring(0, 5) +
      "..." +
      name.substring(name.length - 2, name.length)
    );
  }

  const [gradient, setGradient] =
    useState<ReturnType<typeof generateAvatarGradient>>();

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
        assetStyles.Asset,
        theme === "Dark" ? assetStyles.DarkAsset : "",
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div
        className={assetStyles.Preview + " " + assetStyles.CollectionItem}
        style={{ overflow: "visible" }}
      >
        {itemTypes.length >= 3 && (
          <>
            <Image type={itemTypes[0]} src={images[0]} />
            <Image type={itemTypes[1]} src={images[1]} />
            <Image type={itemTypes[2]} src={images[2]} />
          </>
        )}
      </div>
      <div className={assetStyles.AssetInfo}>
        <h1 className={assetStyles.ArtName}>{formatName(name)}</h1>
        {userData && (
          <Popover
            mode="hover"
            className={
              styles.UserPopover +
              " " +
              assetStyles.UserPopover +
              " " +
              assetStyles.AssetUserPopover
            }
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
                className={assetStyles.UserData}
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
                    className={assetStyles.Gradient}
                    style={{ background: gradient?.gradient ?? "" }}
                  >
                    <span>
                      {(userData.name || userData.usertag || "")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>
                )}
                <span className={assetStyles.Username}>
                  @{userData.displaytag || userData.usertag}
                </span>
              </a>
            </Link>
          </Popover>
        )}
        <div className={assetStyles.Price}>{images.length} items</div>
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
  src
}: {
  type: AssetTypeInfo;
  src: string;
}) => (
  <>
    {(type === "image" && <img src={src} alt="" draggable={false} />) ||
      (type === "video" && (
        <video
          controls={false}
          // @ts-ignore
          onMouseEnter={(e) => e.target.play()}
          // @ts-ignore
          onMouseLeave={(e) => e.target.pause()}
          muted
        >
          <source src={src} type={contentType} />
        </video>
      )) ||
      (type === "audio" && (
        <div className={styles.SvgWrapper}>
          <MusicIcon />
        </div>
      )) ||
      (type === "other" && (
        <div className={styles.SvgWrapper}>
          <FileIcon />
        </div>
      ))}
  </>
);
