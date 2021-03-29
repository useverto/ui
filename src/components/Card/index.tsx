import { PropsWithChildren, MouseEventHandler } from "react";
import { DefaultProps } from "../../utils";
import ArtActivity from "./ArtActivity";
import Order from "./Order";
import SwapSell from "./SwapSell";
import Trade from "./Trade";
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

Card.ArtActivity = ArtActivity;
Card.Order = Order;
Card.SwapSell = SwapSell;
Card.Trade = Trade;

export interface Props extends DefaultProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type Status = "success" | "pending" | "error" | "neutral";

export interface UserData {
  avatar: string;
  usertag: string;
  name: string; // full name
}
