import { useContext } from "react";
import { TodoContext } from "./../context/TodoContext";

export default function ProgressBar() {
  const { completionPercentage } = useContext(TodoContext);
  return (
    <div className="">
      <div className="progress-container">
        {/* Тут магія: ширина змінюється динамічно */}
        <div
          className="progress-fill"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      <p>Виконано: {completionPercentage}%</p>
    </div>
  );
}
