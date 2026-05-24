import "../styles/header.scss";

type Props = {
  onMenuClick: () => void;
};

function Header({ onMenuClick }: Props) {
  return (
    <div className="header">
      <div className="left">
        <button className="hamburger" onClick={onMenuClick}>
          ☰
        </button>
      </div>

      <div className="right">
        <span className="icon">🔔</span>
        <span className="icon">⚙️</span>
      </div>
    </div>
  );
}

export default Header;