import { LinkExternalIcon } from "@primer/octicons-react";
import { CSSProperties, PropsWithChildren, MouseEventHandler } from "react";
import { formatTime, formatBalance } from "../../utils";
import Tooltip from "../Tooltip";
import styles from "./Card.module.sass";

export default function Card({
  className,
  children,
  onClick,
  style,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <div
      className={"VertoCard " + styles.Card + " " + (className ?? "")}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

interface Props {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

Card.Order = ({
  className,
  style,
  onClick,
  type,
  orderID,
  status,
  timestamp
}: OrderProps) => (
  <Card
    className={styles.Item + " " + (className ?? "")}
    style={style}
    onClick={onClick}
  >
    <div className={styles.ItemData}>
      <span className={styles.OrderType}>{type}</span>
      <div className={styles.Data}>
        <h1>Order ID</h1>
        <p>
          {orderID}
          <Tooltip
            text={<span style={{ textTransform: "capitalize" }}>{status}</span>}
            position="right"
            style={{ borderRadius: "6px" }}
          >
            <span
              className={styles.Status + " " + styles[`Status_${status}`]}
            />
          </Tooltip>
        </p>
      </div>
    </div>
    <div className={styles.ItemInfo}>
      <div className={styles.Time}>
        <p>Timestamp</p>
        <h1>{formatTime(timestamp)}</h1>
      </div>
      <a href={`/orbit/order/${orderID}`} className={styles.Icon}>
        <LinkExternalIcon />
      </a>
    </div>
  </Card>
);

type OrderProps = Props & {
  type: "sell" | "buy";
  orderID: string;
  status: "success" | "pending" | "error" | "neutral";
  timestamp: Date;
};

Card.ArtActivity = ({
  className,
  onClick,
  style,
  type,
  avatar,
  usertag,
  timestamp,
  price,
  orderID
}: ArtActivityProps) => (
  <Card
    className={styles.Item + " " + (className ?? "")}
    style={style}
    onClick={onClick}
  >
    <div className={styles.ItemData}>
      <img
        src={avatar}
        alt="user-avatar"
        className={styles.Avatar}
        draggable={false}
      />
      <div className={styles.Data}>
        <h1 className={styles.Action}>
          {(type === "list" && (
            <>
              Collectable listed by{" "}
              <a href={`/u/${usertag}`} className={styles.Usertag}>
                @{usertag}
              </a>
            </>
          )) || (
            <>
              Share {(type === "buy" && "bought") || "sold"} by{" "}
              <a href={`/u/${usertag}`} className={styles.Usertag}>
                @{usertag}
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

type ArtActivityProps = Props & {
  type: "buy" | "sell" | "list";
  avatar: string;
  usertag: string;
  timestamp: Date;
  price: {
    usd: number;
    ar: number;
  };
  orderID: string;
};
