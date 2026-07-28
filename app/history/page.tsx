import type { Metadata } from "next";
import { HistoryView } from "@/components/history-view";

export const metadata: Metadata = { title: "الوصفات اللي خلّصتها" };

export default function HistoryPage() {
  return <HistoryView />;
}
