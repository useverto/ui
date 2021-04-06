import Card, { Props as BaseProps } from "./index";
import { LinkExternalIcon } from "@primer/octicons-react";
import Link from "next/link";
import styles from "./Card.module.sass";

export default function OrderStep({
  className,
  style,
  onClick,
  title,
  id,
  link,
  matchID
}: Props) {
  return (
    <Card
      className={styles.Item + " " + (className ?? "")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <div className={styles.Data + " " + styles.SmallLabel}>
          <h1>{title}</h1>
          <p>{id}</p>
        </div>
      </div>
      <div className={styles.ItemInfo}>
        {matchID && (
          <div className={styles.Match}>
            <h1>Match</h1>
            <p>{matchID}</p>
          </div>
        )}
        <Link href={link}>
          <a className={styles.Icon}>
            <LinkExternalIcon />
          </a>
        </Link>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  title: string;
  id: string;
  link: string;
  matchID?: string;
}
