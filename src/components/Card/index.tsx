import { PropsWithChildren, MouseEventHandler } from "react";
import { DefaultProps } from "../../utils";
import ArtActivity from "./ArtActivity";
import Order from "./Order";
import SwapSell from "./SwapSell";
import Trade from "./Trade";
import Balance from "./Balance";
import OrderStep from "./OrderStep";
import TradingPost from "./TradingPost";
import Asset, { Clear } from "./Asset";
import Bits from "./Bits";
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
      className={["VertoCard", styles.Card, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
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
Card.Balance = Balance;
Card.OrderStep = OrderStep;
Card.TradingPost = TradingPost;
Card.Asset = Asset;
Card.AssetClear = Clear;
Card.Bits = Bits;

export interface Props extends DefaultProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type Status = "success" | "pending" | "error" | "neutral";

export interface UserData {
  avatar: string;
  usertag: string;
  name: string; // full name
}
