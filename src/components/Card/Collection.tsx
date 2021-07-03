import { Props as BaseProps, UserData } from "./index";
import { useTheme } from "../Provider/theme";
import { useEffect, useState } from "react";
import { AssetTypeInfo, getAssetType } from "../../utils";
import { FileIcon, MusicIcon } from "@iconicicons/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Popover from "../Popover";
import Avatar from "../Avatar";
import styles from "./Card.module.sass";

export default function Asset({
  name,
  images,
  userData,
  className,
  style,
  onClick
}: Props) {
  const [spotlightIndex, setSpotlightIndex] = useState(1);
  const [itemTypes, setItemTypes] = useState<AssetTypeInfo[]>([]);
  const theme = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateMs = 3000;
    const progressInterval = setInterval(
      () => setProgress((val) => val + 1),
      updateMs / 100
    );
    const updateImages = setInterval(() => {
      setSpotlightIndex((val) => (val + 1 >= images.length ? 0 : val + 1));
      setProgress(0);
    }, updateMs);

    return () => clearInterval(updateImages);
  }, [images]);

  useEffect(() => {
    (async () => {
      for (let i = 0; i < images.length; i++) {
        const assetType = await getAssetType(images[i]);

        setItemTypes((val) => {
          val[i] = assetType;
          return val;
        });
      }
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
      style={style}
      onClick={onClick}
    >
      <div className={styles.Preview + " " + styles.CollectionItem}>
        {itemTypes.length > 0 &&
          (() => {
            const previous =
              spotlightIndex === 0 ? images.length - 1 : spotlightIndex - 1;
            const next =
              spotlightIndex === images.length - 1 ? 0 : spotlightIndex + 1;

            return (
              <>
                {itemTypes[previous] && (
                  <Image type={itemTypes[previous]} src={images[previous]} />
                )}
                {itemTypes[spotlightIndex] && (
                  <Image
                    type={itemTypes[spotlightIndex]}
                    src={images[spotlightIndex]}
                    spotlight
                  />
                )}
                {itemTypes[next] && (
                  <Image type={itemTypes[next]} src={images[next]} />
                )}
              </>
            );
          })()}
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
        <div className={styles.Price + " " + styles.CollectionItems}>
          {images.length} items
          <div className={styles.SwitchStatus}>
            <span
              className={styles.Progress}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props extends BaseProps {
  name: string;
  images: string[];
  userData?: UserData;
}

const SwitchAnimation = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
  exit: { opacity: 0.4 }
};
const Image = ({
  type: { type, contentType },
  src,
  spotlight = false
}: {
  type: AssetTypeInfo;
  src: string;
  spotlight?: boolean;
}) => (
  <AnimatePresence>
    {(type === "image" && (
      <motion.img
        src={src}
        alt=""
        draggable={false}
        className={spotlight ? styles.SpotLight : styles.SideItem}
        {...SwitchAnimation}
        key={src}
      />
    )) ||
      (type === "video" && (
        <motion.video
          controls={false}
          // @ts-ignore
          onMouseEnter={(e) => e.target.play()}
          // @ts-ignore
          onMouseLeave={(e) => e.target.pause()}
          muted
          className={spotlight ? styles.SpotLight : styles.SideItem}
          {...SwitchAnimation}
          key={src}
        >
          <source src={src} type={contentType} />
        </motion.video>
      )) ||
      (type === "audio" && (
        <MusicIcon className={spotlight ? styles.SpotLight : styles.SideItem} />
      )) ||
      (type === "other" && (
        <FileIcon className={spotlight ? styles.SpotLight : styles.SideItem} />
      ))}
  </AnimatePresence>
);
