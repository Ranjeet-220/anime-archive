export type DiffKind = "same" | "add" | "remove";

export interface DiffLine {
  type: DiffKind;
  line: string;
}

export interface PayloadField {
  field: string;
  value: string;
}

const LINE_DIFF_CAP = 400;

export function parsePayload(payload: unknown): unknown {
  if (payload === null || payload === undefined) return null;
  if (typeof payload === "string") {
    const trimmed = payload.trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed);
    } catch {
      return payload;
    }
  }
  return payload;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.length > 0 ? JSON.stringify(value) : "—";
  return JSON.stringify(value);
}

export function flattenPayload(value: unknown, prefix = ""): PayloadField[] {
  if (!isPlainObject(value)) return [];
  const fields: PayloadField[] = [];
  for (const [key, raw] of Object.entries(value)) {
    const field = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(raw)) {
      fields.push(...flattenPayload(raw, field));
    } else {
      fields.push({ field, value: stringifyValue(raw) });
    }
  }
  return fields;
}

export function parseCorrectionEntry(
  value: unknown
): { current: string | null; proposed: string | null } | null {
  if (!isPlainObject(value)) return null;
  let current: unknown;
  let proposed: unknown;
  if ("current" in value && "proposed" in value) {
    current = value.current;
    proposed = value.proposed;
  } else if ("old" in value && "new" in value) {
    current = value.old;
    proposed = value.new;
  } else if ("from" in value && "to" in value) {
    current = value.from;
    proposed = value.to;
  } else {
    return null;
  }
  return {
    current: current === undefined || current === null ? null : stringifyValue(current),
    proposed: proposed === undefined || proposed === null ? null : stringifyValue(proposed),
  };
}

function splitLines(text: string): string[] {
  if (!text) return [];
  const lines = text.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  return lines;
}

function alignedLineDiff(a: string[], b: string[]): DiffLine[] {
  const out: DiffLine[] = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i += 1) {
    const hasOld = i < a.length;
    const hasNew = i < b.length;
    if (hasOld && hasNew) {
      if (a[i] === b[i]) {
        out.push({ type: "same", line: a[i] });
      } else {
        out.push({ type: "remove", line: a[i] }, { type: "add", line: b[i] });
      }
    } else if (hasOld) {
      out.push({ type: "remove", line: a[i] });
    } else {
      out.push({ type: "add", line: b[i] });
    }
  }
  return out;
}

export function lineDiff(oldText: string, newText: string): DiffLine[] {
  const a = splitLines(oldText);
  const b = splitLines(newText);
  const n = a.length;
  const m = b.length;
  if (n * m > LINE_DIFF_CAP * LINE_DIFF_CAP) return alignedLineDiff(a, b);

  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push({ type: "same", line: a[i] });
      i += 1;
      j += 1;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ type: "remove", line: a[i] });
      i += 1;
    } else {
      out.push({ type: "add", line: b[j] });
      j += 1;
    }
  }
  while (i < n) {
    out.push({ type: "remove", line: a[i] });
    i += 1;
  }
  while (j < m) {
    out.push({ type: "add", line: b[j] });
    j += 1;
  }
  return out;
}

export function prettyJson(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
