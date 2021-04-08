import Card, { Props as BaseProps } from "./index";
import { formatBalance } from "../../utils";
import styles from "./Card.module.sass";

export default function TokenPortion({
  className,
  style,
  onClick,
  quantity,
  priceAr,
  priceUSD
}: Props) {
  return (
    <Card
      className={[styles.Item, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <span className={styles.BitCount}>{quantity}</span>
        <h1 className={styles.TokenPortionTitle}>Bits</h1>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.RightSection}>
          <p>${priceUSD} USD</p>
          <h1>{formatBalance(priceAr)} AR</h1>
        </div>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  quantity: number;
  priceAr: number;
  priceUSD: number;
}
