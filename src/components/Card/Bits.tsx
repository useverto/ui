import Card, { Props as BaseProps } from "./index";
import styles from "./Card.module.sass";

export default function TokenPortion({
  className,
  style,
  onClick,
  quantity,
  price
}: Props) {
  return (
    <Card
      className={[styles.Item, styles.Bit, className ?? ""]
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
          <p>${price?.usd?.toLocaleString() || "--"} USD</p>
          <h1>
            {price.qty.toLocaleString()} {price.ticker}
          </h1>
        </div>
      </div>
      <div className={styles.HoverEffect}>Buy</div>
    </Card>
  );
}

interface Props extends BaseProps {
  quantity: number;
  price: {
    qty: number;
    ticker: string;
    usd?: number;
  };
}
