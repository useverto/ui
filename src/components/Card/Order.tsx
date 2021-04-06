import Card, { Props as BaseProps, Status } from "./index";
import { formatTime } from "../../utils";
import { LinkExternalIcon } from "@primer/octicons-react";
import Tooltip from "../Tooltip";
import Link from "next/link";
import styles from "./Card.module.sass";

export default function Order({
  className,
  style,
  onClick,
  type,
  orderID,
  status,
  timestamp
}: Props) {
  return (
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
              text={
                <span style={{ textTransform: "capitalize" }}>{status}</span>
              }
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
        <Link href={`/orbit/order/${orderID}`}>
          <a className={styles.Icon}>
            <LinkExternalIcon />
          </a>
        </Link>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  type: "sell" | "buy";
  orderID: string;
  status: Status;
  timestamp: Date;
}
