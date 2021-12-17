import Card, { Props as BaseProps, Status, StatusTypes } from "./index";
import { formatTime } from "../../utils";
import { ArrowRightIcon, CloseIcon, ShareIcon } from "@iconicicons/react";
import Link from "next/link";
import Tooltip from "../Tooltip";
import styles from "./Card.module.sass";

export default function Trade({
  className,
  style,
  onClick,
  from,
  to,
  timestamp,
  cancel,
  status,
  orderID
}: Props) {
  return (
    <Card
      className={["VertoTradeCard", styles.Item, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <span className={styles.OrderType}>
          {from.ticker} / {to}
        </span>
        <div className={styles.Data}>
          <h1 className={styles.FromTo}>
            {from.amount.toLocaleString()} {from.ticker.toUpperCase()}
            <ArrowRightIcon />
            {to}
            <Tooltip
              text={
                <span style={{ textTransform: "capitalize" }}>{status}</span>
              }
              position="right"
              className={styles.FromToStatusTooltip}
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
          </h1>
          <p>{formatTime(timestamp)}</p>
        </div>
      </div>
      <div className={styles.ItemInfo}>
        {cancel && (
          <Tooltip text="Cancel">
            <a
              onClick={(e) => {
                e.stopPropagation();
                cancel();
              }}
              className={styles.Icon}
            >
              <CloseIcon />
            </a>
          </Tooltip>
        )}
        <Link href={`/orbit/order/${orderID}`}>
          <a className={styles.Icon + " " + styles.SmallerSpace}>
            <ShareIcon />
          </a>
        </Link>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  orderID: string;
  from: {
    amount: number;
    ticker: string;
  };
  to: string; // ticker
  timestamp: Date;
  status: Status;
  cancel?: () => void; // optionally cancel trade
}
