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
  // require minimum 3 items in a collection
  const [itemIndexes, setItemIndexes] = useState<[number, number, number]>([
    1,
    0,
    2
  ]);
  const [itemTypes, setItemTypes] = useState<AssetTypeInfo[]>([]);
  const theme = useTheme();

  useEffect(() => {
    const updateImages = setInterval(
      () =>
        setItemIndexes((val) => {
          const newPrimary = val[1] + 1 >= images.length ? 0 : val[1] + 1;
          const pickRandom = (curr: number): number => {
            const random = Math.floor(Math.random() * images.length);

            if (random === curr || random === newPrimary)
              return pickRandom(curr);
            return random;
          };

          return [pickRandom(val[0]), newPrimary, pickRandom(val[2])];
        }),
      2000
    );

    return () => clearInterval(updateImages);
  }, [images]);

  useEffect(() => {
    (async () => {
      for (let i = 0; i < itemIndexes.length; i++) {
        const assetType = await getAssetType(images[i]);

        setItemTypes((val) => {
          val[i] = assetType;
          return val;
        });
      }
    })();
  }, [itemIndexes]);

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
        {itemTypes && (
          <>
            {itemTypes[0] && (
              <Image type={itemTypes[0]} src={images[itemIndexes[0]]} />
            )}
            {itemTypes[1] && (
              <Image
                type={itemTypes[1]}
                src={images[itemIndexes[1]]}
                spotlight
              />
            )}
            {itemTypes[2] && (
              <Image type={itemTypes[2]} src={images[itemIndexes[2]]} />
            )}
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
        <p className={styles.Price}>{images.length} items</p>
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
