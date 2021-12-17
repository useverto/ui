import Card, { Props as BaseProps } from "./index";
import { ShareIcon } from "@iconicicons/react";
import { useTheme } from "../Provider/theme";
import Link from "next/link";
import cardStyles from "./Card.module.sass";
import styles from "./Balance.module.sass";

export default function Balance({
  className,
  style,
  onClick,
  logo,
  name,
  ticker,
  balance,
  id
}: Props) {
  const theme = useTheme();

  return (
    <Card
      className={[cardStyles.Item, styles.Balance, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={cardStyles.ItemData + " " + styles.ItemData}>
        <div className={cardStyles.Avatar + " " + styles.Avatar}>
          <img
            src={theme === "Light" ? logo.light : logo.dark || logo.light}
            alt="token-logo"
            draggable={false}
          />
        </div>
        <h1 className={styles.TokenName}>{name}</h1>
        <span className={cardStyles.OrderType}>{ticker}</span>
      </div>
      <div className={cardStyles.ItemInfo}>
        <h1>
          {balance.toLocaleString()} {ticker.toUpperCase()}
        </h1>
        <Link href={`/space/${id}`}>
          <a className={cardStyles.Icon}>
            <ShareIcon />
          </a>
        </Link>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  logo: {
    light: string;
    dark?: string;
  };
  name: string;
  ticker: string;
  balance: number;
  id: string;
}
