import type { ReactNode } from "react";

type Kind = "do" | "care" | "dont";

const label: Record<Kind, string> = {
  do: "Do this",
  care: "Be careful",
  dont: "Do not",
};

/**
 * The only place semantic colour is allowed outside the health check.
 * Green = correct action. Amber = caution. Red = a real mistake.
 * Never used for emphasis or decoration.
 */
export default function Callout({
  kind,
  children,
}: {
  kind: Kind;
  children: ReactNode;
}) {
  return (
    <div className={`callout callout-${kind} mt-3`}>
      <p>
        <strong>{label[kind]} — </strong>
        {children}
      </p>
    </div>
  );
}
