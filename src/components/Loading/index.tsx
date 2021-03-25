import { PropsWithChildren } from "react";
import styles from "./Loading.module.sass";

export function Spinner({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <div className={styles.Spinner + " " + (className ?? "")} {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 12C22 6.47701 17.523 2.00001 12 2.00001C10.54 2.00001 9.157 2.31201 7.91 2.87201C7.66799 2.98075 7.39269 2.9889 7.14468 2.89466C6.89666 2.80042 6.69624 2.61152 6.5875 2.36951C6.47876 2.1275 6.47061 1.85221 6.56485 1.60419C6.65909 1.35617 6.84799 1.15575 7.09 1.04701C8.63417 0.354593 10.3077 -0.00226619 12 1.02981e-05C18.627 1.05878e-05 24 5.37301 24 12C24 18.627 18.627 24 12 24C5.373 24 -8.14212e-07 18.627 -5.24537e-07 12C-3.98211e-07 9.11001 1.023 6.45501 2.727 4.38301C2.80899 4.27741 2.91132 4.18933 3.02794 4.12396C3.14456 4.0586 3.2731 4.01728 3.40597 4.00246C3.53883 3.98763 3.67332 3.9996 3.80148 4.03765C3.92964 4.0757 4.04887 4.13906 4.15212 4.22398C4.25537 4.30891 4.34054 4.41368 4.4026 4.53209C4.46466 4.6505 4.50234 4.78016 4.51342 4.91338C4.52451 5.04661 4.50876 5.18071 4.46712 5.30775C4.42549 5.43479 4.3588 5.55219 4.271 5.65301C2.79892 7.4402 1.99585 9.68462 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function Skeleton({ className, ...props }: PropsWithChildren<Props>) {
  return (
    <div className={styles.Skeleton + " " + (className ?? "")} {...props} />
  );
}

interface Props {
  className?: string;
}
