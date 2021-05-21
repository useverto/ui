import Card, { Props as BaseProps } from "./index";
import styles from "./Card.module.sass";

export default function TradingPost({
  className,
  style,
  onClick,
  address,
  balance,
  vrtStake,
  status = "neutral"
}: Props) {
  return (
    <Card
      className={[styles.Item, styles.TradingPost, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <span
          className={
            styles.TradingPostStatus +
            " " +
            styles[`TradingPostStatus_${status}`]
          }
        />
        <div className={styles.Data + " " + styles.SmallLabel}>
          <p>Trading Post Address</p>
          <p className={styles.TradingPostAddress}>{address}</p>
        </div>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.RightSection}>
          <p>Balance</p>
          <h1>{balance.toLocaleString()} AR</h1>
        </div>
        <div className={styles.RightSection}>
          <p>Stake</p>
          <h1>{vrtStake.toLocaleString()} VRT</h1>
        </div>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  status: "online" | "offline" | "neutral";
  address: string;
  balance: number;
  vrtStake: number;
}
