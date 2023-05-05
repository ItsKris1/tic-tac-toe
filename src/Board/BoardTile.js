export default function BoardTile({ row, col, val, onClick }) {
  return (
    <div className="tile" onClick={(e) => onClick(row, col)}>
      {val}
    </div>
  );
}
