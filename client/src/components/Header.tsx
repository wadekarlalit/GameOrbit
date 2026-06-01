import "../styles/header.scss";

type Props = {
  onMenuClick: () => void;
  onSettingsClick: () => void;
};

function Header({ onMenuClick, onSettingsClick }: Props) {
  return (
    <>
      <div className="header">
        <div className="left">
          <button className="hamburger" onClick={onMenuClick}>
            ☰
          </button>
        </div>

        <div className="right">
          <span className="icon">🔔</span>
          <span className="icon" onClick={onSettingsClick}>⚙️</span>
        </div>
      </div>
    </>
  );
}

export default Header;