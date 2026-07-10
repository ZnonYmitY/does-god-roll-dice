import { resultLevelLabels, skillById } from "../../data";
import type { CheckHistoryItem } from "../../types";
import { assets } from "../../config/assets";
import { AssetIcon } from "../AssetIcon/AssetIcon";

interface HistoryDrawerProps {
  open: boolean;
  items: CheckHistoryItem[];
  onClose: () => void;
  onRestore: (item: CheckHistoryItem) => void;
  onClear: () => void;
}

function formatTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "时间不详"
    : new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
}

export function HistoryDrawer({
  open,
  items,
  onClose,
  onRestore,
  onClear,
}: HistoryDrawerProps) {
  return (
    <div className={`drawer-layer ${open ? "drawer-layer--open" : ""}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" onClick={onClose} aria-label="关闭检定记录" />
      <aside className="history-drawer" aria-label="检定记录">
        <div className="history-drawer__header">
          <div>
            <p>LOCAL ARCHIVE</p>
            <h2>检定记录</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="关闭">
            <AssetIcon src={assets.icons.close} fallback="×" />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="history-empty">还没有记录。骰子正在假装自己从未见过你。</p>
        ) : (
          <ol className="history-list">
            {items.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => onRestore(item)}>
                  <span className="history-list__meta">
                    {formatTime(item.createdAt)} · {item.dice[0]} + {item.dice[1]} ·{" "}
                    {resultLevelLabels[item.resultLevel]}
                  </span>
                  <strong>{item.question}</strong>
                  <span>{skillById.get(item.mainSkill)?.name.toLocaleUpperCase()}</span>
                </button>
              </li>
            ))}
          </ol>
        )}

        <button className="history-clear" type="button" onClick={onClear} disabled={!items.length}>
          清空记录
        </button>
      </aside>
    </div>
  );
}
