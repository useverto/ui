import { Props as BaseProps, UserData } from "./index";
import styles from "./Card.module.sass";

export default function Asset({
  name,
  price,
  image,
  ticker,
  userData,
  className,
  style,
  onClick
}: Props) {
  return (
    <div
      className={"VertoAssetCard " + styles.Asset + " " + (className ?? "")}
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
          <a href={`/u/${userData.usertag}`} className={styles.UserData}>
            <img src={userData.avatar} alt={userData.name} draggable={false} />
            <span>@{userData.usertag}</span>
          </a>
        )}
        <p className={styles.Price + " " + (ticker ? styles.WithTicker : "")}>
          ${price}
          {!ticker && <span>/share</span>}
        </p>
      </div>
    </div>
  );
}

interface Props extends BaseProps {
  name: string;
  price: number;
  image: string;
  ticker?: string;
  userData?: UserData;
}
