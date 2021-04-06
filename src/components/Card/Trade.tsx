import Card, { Props as BaseProps, Status } from "./index";
import { formatBalance, formatTime } from "../../utils";
import { ArrowRightIcon, XIcon } from "@primer/octicons-react";
import Tooltip from "../Tooltip";
import { useRouter } from "next/router";
import styles from "./Card.module.sass";

export default function Trade({
  className,
  style,
  onClick,
  type,
  from,
  to,
  timestamp,
  cancel,
  status,
  orderID
}: Props) {
  const router = useRouter();

  return (
    <Card
      className={styles.Item + " " + (className ?? "")}
      style={style}
      onClick={(e) => {
        router.push(`/orbit/order/${orderID}`);
        onClick(e);
      }}
    >
      <div className={styles.ItemData}>
        <span className={styles.OrderType}>{type}</span>
        <div className={styles.Data}>
          <h1 className={styles.FromTo}>
            {((from.ticker.toUpperCase() === "AR" ||
              from.ticker.toUpperCase() === "ETH") &&
              formatBalance(from.amount)) ||
              from.amount}{" "}
            {from.ticker.toUpperCase()}
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
                className={styles.Status + " " + styles[`Status_${status}`]}
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
              <XIcon />
            </a>
          </Tooltip>
        )}
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  type: "sell" | "buy";
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
