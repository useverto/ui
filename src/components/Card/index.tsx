import { LinkExternalIcon } from "@primer/octicons-react";
import { CSSProperties, PropsWithChildren, MouseEventHandler } from "react";
import { formatTime } from "../../utils";
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
    className={
      [styles.Order].filter((val) => val !== "").join(" ") +
      " " +
      (className ?? "")
    }
    style={style}
    onClick={onClick}
  >
    <div className={styles.OrderData}>
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
    <div className={styles.OrderInfo}>
      <div className={styles.Time}>
        <p>Timestamp</p>
        <h1>{formatTime(timestamp)}</h1>
      </div>
      <div className={styles.Icon}>
        <LinkExternalIcon />
      </div>
    </div>
  </Card>
);

type OrderProps = Props & {
  type: "sell" | "buy";
  orderID: string;
  status: "success" | "pending" | "error" | "neutral";
  timestamp: Date;
};
