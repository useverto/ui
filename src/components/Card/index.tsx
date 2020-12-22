import { PropsWithChildren } from "react";
import { useTheme } from "../Provider/Theme";
import styles from "./Card.module.sass";

export default function Card({
  children,
  design = "Verto",
  hoverable,
  shadow,
  className,
  ...props
}: PropsWithChildren<CardProps>) {
  const theme = useTheme();

  return (
    <div
      className={
        [
          design === "Geist" ? "zi-card" : styles.Card,
          hoverable ? "" : "pin " + styles.Pin,
          shadow ? styles.Shadow : "",
          theme === "Dark" ? styles.Dark : ""
        ]
          .filter((val) => val !== "")
          .join(" ") + ` ${className}`
      }
      {...props}
    >
      {children}
    </div>
  );
}

interface CardProps {
  design?: "Verto" | "Geist";
  hoverable?: boolean;
  shadow?: boolean;
  className?: string;
}
