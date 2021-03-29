import { LinkExternalIcon } from "@primer/octicons-react";
import { CSSProperties, PropsWithChildren, MouseEventHandler } from "react";
import { formatTime, formatBalance } from "../../utils";
import Spacer from "../Spacer";
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
  user,
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

type ArtActivityProps = Props & {
  type: "buy" | "sell" | "list";
  user: {
    avatar: string;
    usertag: string;
  };
  timestamp: Date;
  price: {
    usd: number;
    ar: number;
  };
  orderID: string;
};

Card.SwapSell = ({
  className,
  style,
  onClick,
  user,
  selling,
  rate,
  filled,
  orderID
}: SwapSellProps) => (
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
      <span className={styles.OrderType}>Sell</span>
      <div className={styles.Data + " " + styles.SmallLabel}>
        <p>Selling</p>
        <h1>
          {selling.quantity} {selling.ticker.toUpperCase()}
        </h1>
      </div>
      <Spacer x={3.65} />
      <div className={styles.Data + " " + styles.SmallLabel}>
        <p>At the rate of</p>
        <h1>
          {formatBalance(rate)} {"AR/" + selling.ticker.toUpperCase()}
        </h1>
      </div>
    </div>
    <div className={styles.ItemInfo}>
      <div className={styles.Time}>
        <p>Filled</p>
        <h1>{formatBalance(filled)} AR</h1>
      </div>
      <a href={`/orbit/order/${orderID}`} className={styles.Icon}>
        <OrbitIcon />
      </a>
    </div>
  </Card>
);

type SwapSellProps = Props & {
  user: {
    avatar: string;
    usertag: string;
  };
  selling: {
    quantity: number;
    ticker: string;
  };
  rate: number; // how much AR is one of this token
  filled: number;
  orderID: string;
};

const OrbitIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.25 24.75V19.75C17.25 19.087 17.5134 18.4511 17.9823 17.9822C18.4511 17.5134 19.087 17.25 19.75 17.25H24.75"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.25 3.5V6C7.51965 6.76684 8.03118 7.4253 8.70753 7.87621C9.38388 8.32711 10.1884 8.54603 11 8.5V8.5C11.663 8.5 12.2989 8.76339 12.7678 9.23223C13.2366 9.70107 13.5 10.337 13.5 11C13.5 11.663 13.7634 12.2989 14.2322 12.7678C14.7011 13.2366 15.337 13.5 16 13.5C16.663 13.5 17.2989 13.2366 17.7678 12.7678C18.2366 12.2989 18.5 11.663 18.5 11C18.5 10.337 18.7634 9.70107 19.2322 9.23223C19.7011 8.76339 20.337 8.5 21 8.5H24.75"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.24999 12.25H4.74999C5.41303 12.25 6.04891 12.5134 6.51775 12.9822C6.98659 13.4511 7.24999 14.087 7.24999 14.75V16C7.24999 16.663 7.51338 17.2989 7.98222 17.7678C8.45106 18.2366 9.08694 18.5 9.74999 18.5C10.413 18.5 11.0489 18.7634 11.5178 19.2322C11.9866 19.7011 12.25 20.337 12.25 21V26"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.5 26C20.4036 26 26 20.4036 26 13.5C26 6.59644 20.4036 1 13.5 1C6.59644 1 1 6.59644 1 13.5C1 20.4036 6.59644 26 13.5 26Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
