import { PropsWithChildren, MouseEventHandler } from "react";
import { DefaultProps } from "../../utils";
import { useTheme } from "../Provider/theme";
import Asset, { Clear } from "./Asset";
import ArtActivity from "./ArtActivity";
import Trade from "./Trade";
import Balance from "./Balance";
import Collection from "./Collection";
import Bits from "./Bits";
import styles from "./Card.module.sass";

export default function Card({
  className,
  children,
  onClick,
  style,
  ...props
}: PropsWithChildren<Props>) {
  const theme = useTheme();

  return (
    <div
      className={[
        "VertoCard",
        styles.Card,
        (theme === "Dark" && styles.Dark) || "",
        className ?? ""
      ]
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
Card.Trade = Trade;
Card.Balance = Balance;
Card.Asset = Asset;
Card.AssetClear = Clear;
Card.Bits = Bits;
Card.Collection = Collection;

export interface Props extends DefaultProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export type Status = "success" | "pending" | "error" | string;
export const StatusTypes = ["success", "pending", "error"];

export interface UserData {
  avatar?: string;
  usertag: string;
  displaytag?: string;
  name: string; // full name
}
