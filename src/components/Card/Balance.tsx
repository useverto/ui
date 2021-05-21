import Card, { Props as BaseProps } from "./index";
import { ShareIcon } from "@iconicicons/react";
import { useTheme } from "../Provider/theme";
import Link from "next/link";
import styles from "./Card.module.sass";

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
      className={[styles.Item, styles.Balance, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <div className={styles.Avatar}>
          <img
            src={theme === "Light" ? logo.light : logo.dark || logo.light}
            alt="token-logo"
            draggable={false}
          />
        </div>
        <h1 className={styles.TokenName}>{name}</h1>
        <span className={styles.OrderType}>{ticker}</span>
      </div>
      <div className={styles.ItemInfo}>
        <h1>
          {balance.toLocaleString()} {ticker.toUpperCase()}
        </h1>
        <Link href={`/space/${id}`}>
          <a className={styles.Icon}>
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
