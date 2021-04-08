import { Props as BaseProps, UserData } from "./index";
import Link from "next/link";
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
  return (
    <div
      className={[
        "VertoAssetCard",
        styles.Asset,
        reverse ? styles.ReverseAsset : "",
        className ?? ""
      ]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.Preview + " " + (ticker ? styles.Logo : "")}>
        <img src={image} alt={name} draggable={false} />
      </div>
      <div className={styles.AssetInfo}>
        <h1 style={ticker ? { margin: 0 } : {}}>{name}</h1>
        {ticker && <span className={styles.AssetTicker}>{ticker}</span>}
        {userData && (
          <Link href={`/u/${userData.usertag}`}>
            <a className={styles.UserData}>
              <img
                src={userData.avatar}
                alt={userData.name}
                draggable={false}
              />
              <span>@{userData.usertag}</span>
            </a>
          </Link>
        )}
        <p className={styles.Price + " " + (ticker ? styles.WithTicker : "")}>
          ${price}
          {!ticker && <span>/bit</span>}
        </p>
      </div>
    </div>
  );
}

export const Clear = ({ image, className, style, onClick }: ClearProps) => (
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
      <img src={image} alt="clear-asset" draggable={false} />
    </div>
  </div>
);

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
