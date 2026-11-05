import type { ReactNode } from "react";
import SessionGuard from "../components/SessionGuard";

export default function MyListingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionGuard>{children}</SessionGuard>;
}
