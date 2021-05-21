import Card, { Props as BaseProps, UserData } from "./index";
import { formatTime } from "../../utils";
import { ShareIcon } from "@iconicicons/react";
import Link from "next/link";
import Popover from "../Popover";
import Avatar from "../Avatar";
import styles from "./Card.module.sass";

export default function ArtActivity({
  className,
  onClick,
  style,
  type,
  user,
  timestamp,
  price,
  orderID
}: Props) {
  return (
    <Card
      className={[styles.Item, className ?? ""]
        .filter((val) => val !== "")
        .join(" ")}
      style={style}
      onClick={onClick}
    >
      <div className={styles.ItemData}>
        <Popover
          mode="hover"
          className={styles.UserPopover}
          content={
            <Avatar
              avatar={user.avatar}
              usertag={user.usertag}
              displaytag={user.displaytag}
              name={user.name}
              size="large"
            />
          }
        >
          <Link href={`/@${user.usertag}`}>
            <a className={styles.Avatar} onClick={(e) => e.stopPropagation()}>
              <img src={user.avatar} alt="user-avatar" draggable={false} />
            </a>
          </Link>
        </Popover>
        <div className={styles.Data}>
          <h1 className={styles.Action}>
            {(type === "list" && (
              <>
                Collectable listed by{" "}
                <Popover
                  mode="hover"
                  className={styles.UserPopover}
                  content={
                    <Avatar
                      avatar={user.avatar}
                      usertag={user.usertag}
                      displaytag={user.displaytag}
                      name={user.name}
                      size="large"
                    />
                  }
                >
                  <Link href={`/@${user.usertag}`}>
                    <a
                      className={styles.Usertag}
                      onClick={(e) => e.stopPropagation()}
                    >
                      @{user.displaytag || user.usertag}
                    </a>
                  </Link>
                </Popover>
              </>
            )) || (
              <>
                A bit {(type === "buy" && "bought") || "sold"} by{" "}
                <Popover
                  mode="hover"
                  className={styles.UserPopover}
                  content={
                    <Avatar
                      avatar={user.avatar}
                      usertag={user.usertag}
                      displaytag={user.displaytag}
                      name={user.name}
                      size="large"
                    />
                  }
                >
                  <Link href={`/@${user.usertag}`}>
                    <a
                      className={styles.Usertag}
                      onClick={(e) => e.stopPropagation()}
                    >
                      @{user.displaytag || user.usertag}
                    </a>
                  </Link>
                </Popover>
              </>
            )}
          </h1>
          <p>{formatTime(timestamp)}</p>
        </div>
      </div>
      <div className={styles.ItemInfo}>
        <div className={styles.Time}>
          <p>${price.usd.toLocaleString()} USD</p>
          <h1>{price.ar.toLocaleString()} AR</h1>
        </div>
        <Link href={`/orbit/order/${orderID}`}>
          <a className={styles.Icon}>
            <ShareIcon />
          </a>
        </Link>
      </div>
    </Card>
  );
}

interface Props extends BaseProps {
  type: "buy" | "sell" | "list";
  user: UserData;
  timestamp: Date;
  price: {
    usd: number;
    ar: number;
  };
  orderID: string;
}
