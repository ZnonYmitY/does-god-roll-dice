import { assets } from "../../config/assets";
import { AssetIcon } from "../AssetIcon/AssetIcon";

interface HeaderProps {
  onAbout: () => void;
  onHistory: () => void;
}

export function Header({ onAbout, onHistory }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__mark" aria-label="双骰图标">
        <AssetIcon src={assets.icons.dicePair} fallback="◆◆" />
      </div>
      <nav className="site-header__nav" aria-label="主导航">
        <button className="nav-button" type="button" onClick={onAbout}>
          关于检定
        </button>
        <button className="nav-button" type="button" onClick={onHistory}>
          检定记录
        </button>
      </nav>
    </header>
  );
}
