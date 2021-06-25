import Card, { Props as BaseProps, Status, StatusTypes } from "./index";
import { formatTime } from "../../utils";
import { ShareIcon } from "@iconicicons/react";
import { useMediaPredicate } from "react-media-hook";
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
  const notMobile = useMediaPredicate("(min-width: 720px)");

  function shortOnMobile(addr: string) {
    if (notMobile) return addr;
    else
      return (
        addr.substring(0, 6) +
        "..." +
        addr.substring(addr.length - 6, addr.length)
      );
  }

  return (
    <Card
      className={[styles.Item, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <span className={styles.OrderType}>{type}</span>
        <div className={styles.Data}>
          <h1>Order ID</h1>
          <p>
            {shortOnMobile(orderID)}
            <Tooltip
              text={
                <span style={{ textTransform: "capitalize" }}>{status}</span>
              }
              position="right"
              style={{ borderRadius: "6px" }}
            >
              <span
                className={
                  styles.Status +
                  " " +
                  (StatusTypes.includes(status)
                    ? styles[`Status_${status}`]
                    : "")
                }
              />
            </Tooltip>
          </p>
        </div>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.Time}>
          <p>Timestamp</p>
          <h1>{formatTime(timestamp, !notMobile)}</h1>
        </div>
        <Link href={`/orbit/order/${orderID}`}>
          <a className={styles.Icon}>
            <ShareIcon />
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
