import { assets } from "../../config/assets";
import { AssetIcon } from "../AssetIcon/AssetIcon";

interface HeaderProps {
  onHome: () => void;
  onAbout: () => void;
  onHistory: () => void;
}

export function Header({ onHome, onAbout, onHistory }: HeaderProps) {
  return (
    <header className="site-header">
      <button
        className="site-header__mark"
        type="button"
        onClick={onHome}
        aria-label="返回首页"
        title="返回首页"
      >
        <AssetIcon src={assets.icons.dicePair} fallback="◆◆" />
      </button>
      <nav className="site-header__nav" aria-label="主导航">
        <button className="nav-button" type="button" onClick={onAbout}>
          <AssetIcon src={assets.icons.info} fallback="i" />
          关于检定
        </button>
        <button className="nav-button" type="button" onClick={onHistory}>
          <AssetIcon src={assets.icons.history} fallback="↶" />
          检定记录
        </button>
      </nav>
    </header>
  );
}
