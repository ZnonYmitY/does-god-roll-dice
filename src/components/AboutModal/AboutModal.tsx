import { Modal } from "../Modal/Modal";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export function AboutModal({ open, onClose }: AboutModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="关于检定" className="about-modal">
      <div className="about-copy">
        <p>把一件不值得惊动上帝的小事，包装成一次郑重其事的精神检定。</p>
        <p>
          这不是严肃建议工具。结果来自两枚六面骰、预设文案和若干互不服气的脑内技能。
        </p>
        <p>本工具仅供娱乐。骰子不会承担现实责任。</p>
        <small>
          非官方个人粉丝致敬 Demo，与 ZA/UM 或《极乐迪斯科》版权方无关联。
        </small>
      </div>
    </Modal>
  );
}
