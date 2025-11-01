import "../style/Celula.css";

export default function Celula({ details, position, onLeftClick, onRightClick }) {
    const { x, y } = position;

    const handleLeftClick = () => {
        onLeftClick(x, y);
    };

    const handleRightClick = (event) => {
        event.preventDefault();
        onRightClick(x, y, event);
    };

    return (
        <div
            className={`cell ${details.isOpen ? "open" : ""}`}
            onClick={handleLeftClick}
            onContextMenu={handleRightClick}
        >
            {details.isOpen && details.isBomb ? "💣" : details.hasFlag ? "🚩" : details.hasQuestion ? "❓" : details.isOpen && details.bombsAdjacent > 0 ? details.bombsAdjacent : ""}
        </div>
    );
}