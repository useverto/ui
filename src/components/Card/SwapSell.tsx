import Card, { Props as BaseProps, UserData } from "./index";
import { formatBalance } from "../../utils";
import Spacer from "../Spacer";
import styles from "./Card.module.sass";

export default function SwapSell({
  className,
  style,
  onClick,
  user,
  selling,
  rate,
  filled,
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
}

interface Props extends BaseProps {
  user: UserData;
  selling: {
    quantity: number;
    ticker: string;
  };
  rate: number; // how much AR is one of this token
  filled: number;
  orderID: string;
}

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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.25 3.5V6C7.51965 6.76684 8.03118 7.4253 8.70753 7.87621C9.38388 8.32711 10.1884 8.54603 11 8.5V8.5C11.663 8.5 12.2989 8.76339 12.7678 9.23223C13.2366 9.70107 13.5 10.337 13.5 11C13.5 11.663 13.7634 12.2989 14.2322 12.7678C14.7011 13.2366 15.337 13.5 16 13.5C16.663 13.5 17.2989 13.2366 17.7678 12.7678C18.2366 12.2989 18.5 11.663 18.5 11C18.5 10.337 18.7634 9.70107 19.2322 9.23223C19.7011 8.76339 20.337 8.5 21 8.5H24.75"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.24999 12.25H4.74999C5.41303 12.25 6.04891 12.5134 6.51775 12.9822C6.98659 13.4511 7.24999 14.087 7.24999 14.75V16C7.24999 16.663 7.51338 17.2989 7.98222 17.7678C8.45106 18.2366 9.08694 18.5 9.74999 18.5C10.413 18.5 11.0489 18.7634 11.5178 19.2322C11.9866 19.7011 12.25 20.337 12.25 21V26"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 26C20.4036 26 26 20.4036 26 13.5C26 6.59644 20.4036 1 13.5 1C6.59644 1 1 6.59644 1 13.5C1 20.4036 6.59644 26 13.5 26Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
