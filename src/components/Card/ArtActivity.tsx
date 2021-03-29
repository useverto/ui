import Card, { Props as BaseProps, UserData } from "./index";
import { formatTime, formatBalance } from "../../utils";
import { LinkExternalIcon } from "@primer/octicons-react";
import styles from "./Card.module.sass";

export default function ArtActivity({
  className,
  onClick,
  style,
  type,
  user,
  timestamp,
  price,
  orderID
}: Props) {
  return (
    <Card
      className={styles.Item + " " + (className ?? "")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <a
          href={`/u/${user.usertag}`}
          className={styles.Avatar}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={user.avatar} alt="user-avatar" draggable={false} />
        </a>
        <div className={styles.Data}>
          <h1 className={styles.Action}>
            {(type === "list" && (
              <>
                Collectable listed by{" "}
                <a
                  href={`/u/${user.usertag}`}
                  className={styles.Usertag}
                  onClick={(e) => e.stopPropagation()}
                >
                  @{user.usertag}
                </a>
              </>
            )) || (
              <>
                Share {(type === "buy" && "bought") || "sold"} by{" "}
                <a
                  href={`/u/${user.usertag}`}
                  className={styles.Usertag}
                  onClick={(e) => e.stopPropagation()}
                >
                  @{user.usertag}
                </a>
              </>
            )}
          </h1>
          <p>{formatTime(timestamp)}</p>
        </div>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.Time}>
          <p>${formatBalance(price.usd)} USD</p>
          <h1>{formatBalance(price.ar)} AR</h1>
        </div>
        <a href={`/orbit/order/${orderID}`} className={styles.Icon}>
          <LinkExternalIcon />
        </a>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  type: "buy" | "sell" | "list";
  user: UserData;
  timestamp: Date;
  price: {
    usd: number;
    ar: number;
  };
  orderID: string;
}
