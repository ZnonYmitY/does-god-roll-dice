import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { CheckResult } from "../../types";
import { Modal } from "../Modal/Modal";
import { ShareCard } from "../ShareCard/ShareCard";

interface ShareModalProps {
  open: boolean;
  result: CheckResult;
  onClose: () => void;
}

export function ShareModal({ open, result, onClose }: ShareModalProps) {
  const captureRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const createImage = async (): Promise<string | null> => {
    if (!captureRef.current) return null;
    setBusy(true);
    setError("");
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(captureRef.current, {
        width: 1080,
        height: 1350,
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#171918",
      });
      setPreview(dataUrl);
      return dataUrl;
    } catch {
      setError("分享图生成失败。可以使用系统截图保留当前结果。 ");
      return null;
    } finally {
      setBusy(false);
    }
  };

  const saveImage = async () => {
    const dataUrl = preview ?? (await createImage());
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = `上帝掷骰子吗-${result.id.slice(0, 8)}.png`;
    link.href = dataUrl;
    link.click();
  };

  const close = () => {
    setPreview(null);
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={close} title="生成分享图" className="share-modal">
      <div className="share-preview" aria-live="polite">
        {preview ? (
          <img src={preview} alt="1080 × 1350 分享图预览" />
        ) : (
          <div className="share-preview__scaled">
            <ShareCard result={result} />
          </div>
        )}
      </div>

      {error && <p className="share-error">{error}</p>}
      <div className="share-modal__actions">
        <button className="secondary-button" type="button" onClick={createImage} disabled={busy}>
          {busy ? "生成中……" : "预览"}
        </button>
        <button className="primary-button" type="button" onClick={saveImage} disabled={busy}>
          保存 PNG
        </button>
        <button className="secondary-button" type="button" onClick={close}>
          关闭
        </button>
      </div>

      {open && (
        <div className="share-capture" aria-hidden="true">
          <ShareCard ref={captureRef} result={result} />
        </div>
      )}
    </Modal>
  );
}
