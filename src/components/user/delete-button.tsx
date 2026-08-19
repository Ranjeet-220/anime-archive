"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  url,
  label,
  confirmText,
  onDone,
}: {
  url: string;
  label?: string;
  confirmText?: string;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!window.confirm(confirmText ?? "Delete this record? This cannot be undone.")) return;
    setBusy(true);
    try {
      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        onDone?.();
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={onDelete} disabled={busy} className="text-danger hover:bg-danger/10">
      {busy ? "Deleting…" : (label ?? "Delete")}
    </Button>
  );
}
