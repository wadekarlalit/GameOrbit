import { useNavigate } from "react-router-dom";
import "../styles/gameCard.scss"

type GameCardProps = {
  title: string;
  onClick?: () => void;
  route?: string;
  image?: string
};

function GameCard({ title, onClick, route, image }: GameCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (onClick) {
      onClick();
      return;
    }

    if (route) {
      navigate(route);
    }
  }

  return (
    <div
      className="card"
      onClick={handleClick}
    >
      <div className="card-image">
        <img src={image} alt="" />
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default GameCard;