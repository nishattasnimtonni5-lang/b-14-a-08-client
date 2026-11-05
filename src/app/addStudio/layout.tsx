import type { ReactNode } from "react";
import SessionGuard from "../components/SessionGuard";

export default function AddStudioLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionGuard>{children}</SessionGuard>;
}
