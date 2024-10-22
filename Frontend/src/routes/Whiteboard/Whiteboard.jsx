import { TbRectangle } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import {
  Arrow,
  Circle,
  Layer,
  Line,
  Rect,
  Stage,
} from "react-konva";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "../../constants";

export default function App() {
  const stageRef = useRef();
  const [action, setAction] = useState(ACTIONS.SELECT);
  const [fillColor, setFillColor] = useState("#ff0000");
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setScribbles] = useState([]);

  const strokeColor = "#000";
  const isPaining = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();

  const isDraggable = action === ACTIONS.SELECT;

  function onPointerDown() {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => [
          ...rectangles,
          {
            id,
            x,
            y,
            height: 20,
            width: 20,
            fillColor,
          },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [
          ...circles,
          {
            id,
            x,
            y,
            radius: 20,
            fillColor,
          },
        ]);
        break;

      case ACTIONS.ARROW:
        setArrows((arrows) => [
          ...arrows,
          {
            id,
            points: [x, y, x + 20, y + 20],
            fillColor,
          },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => [
          ...scribbles,
          {
            id,
            points: [x, y],
            fillColor,
          },
        ]);
        break;
      case ACTIONS.ERASER:
        // Eraser functionality is handled in onPointerMove
        break;
    }
  }

  function onPointerMove() {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) =>
          rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle,
                width: x - rectangle.x,
                height: y - rectangle.y,
              };
            }
            return rectangle;
          })
        );
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) =>
          circles.map((circle) => {
            if (circle.id === currentShapeId.current) {
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          })
        );
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) =>
          arrows.map((arrow) => {
            if (arrow.id === currentShapeId.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          })
        );
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) =>
          scribbles.map((scribble) => {
            if (scribble.id === currentShapeId.current) {
              return {
                ...scribble,
                points: [...scribble.points, x, y],
              };
            }
            return scribble;
          })
        );
        break;
      case ACTIONS.ERASER:
        eraseShapes(x, y);
        break;
    }
  }

  function eraseShapes(x, y) {
    setRectangles((rectangles) =>
      rectangles.filter((rect) => {
        return !(
          x >= rect.x &&
          x <= rect.x + rect.width &&
          y >= rect.y &&
          y <= rect.y + rect.height
        );
      })
    );

    setCircles((circles) =>
      circles.filter((circle) => {
        const distance = Math.sqrt(
          (x - circle.x) ** 2 + (y - circle.y) ** 2
        );
        return distance > circle.radius + 5; // 5 pixels buffer
      })
    );

    setArrows((arrows) =>
      arrows.filter((arrow) => {
        const distance = Math.sqrt(
          (x - arrow.points[0]) ** 2 + (y - arrow.points[1]) ** 2
        );
        return distance > 5; // Buffer distance for arrow endpoints
      })
    );

    setScribbles((scribbles) =>
      scribbles.filter((scribble) => {
        return !scribble.points.some((point, index) => {
          if (index % 2 === 0) {
            const nextPoint = scribble.points[index + 1];
            return (
              x >= point - 5 &&
              x <= point + 5 &&
              y >= nextPoint - 5 &&
              y <= nextPoint + 5
            );
          }
          return false;
        });
      })
    );
  }

  function onPointerUp() {
    isPaining.current = false;
  }

  function handleExport() {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function onClick(e) {
    if (action === ACTIONS.ERASER) {
      // Prevent default click action for the eraser
      return;
    }
    if (action === ACTIONS.SELECT) {
      const target = e.currentTarget;
      transformerRef.current.nodes([target]);
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden mt-20"> 
      {/* Controls */}
      <div className="absolute top-0 z-10 w-full py-2 ">
        <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
          <button
            className={action === ACTIONS.SELECT ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.SELECT)}
          >
            <GiArrowCursor size={"2rem"} />
          </button>
          <button
            className={action === ACTIONS.RECTANGLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.RECTANGLE)}
          >
            <TbRectangle size={"2rem"} />
          </button>
          <button
            className={action === ACTIONS.CIRCLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.CIRCLE)}
          >
            <FaRegCircle size={"1.5rem"} />
          </button>
          <button
            className={action === ACTIONS.ARROW ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.ARROW)}
          >
            <FaLongArrowAltRight size={"2rem"} />
          </button>
          <button
            className={action === ACTIONS.SCRIBBLE ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.SCRIBBLE)}
          >
            <LuPencil size={"1.5rem"} />
          </button>
          <button
            className={action === ACTIONS.ERASER ? "bg-violet-300 p-1 rounded" : "p-1 hover:bg-violet-100 rounded"}
            onClick={() => setAction(ACTIONS.ERASER)} // New eraser button
          >
            <span>🗑️</span> {/* You can replace this with an icon if you want */}
          </button>
          <button>
            <input
              className="w-6 h-6"
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
            />
          </button>
          <button onClick={handleExport}>
            <IoMdDownload size={"1.5rem"} />
          </button>
        </div>
      </div>
      {/* Canvas */}
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            height={window.innerHeight}
            width={window.innerWidth}
            fill="#ffffff"
            id="bg"
            onClick={() => {
              transformerRef.current.nodes([]);
            }}
          />

          {rectangles.map((rectangle) => (
            <Rect
              key={rectangle.id}
              x={rectangle.x}
              y={rectangle.y}
              stroke={strokeColor}
              strokeWidth={2}
              fill={rectangle.fillColor}
              height={rectangle.height}
              width={rectangle.width}
              draggable={isDraggable}
              onClick={onClick}
            />
          ))}

          {circles.map((circle) => (
            <Circle
              key={circle.id}
              radius={circle.radius}
              x={circle.x}
              y={circle.y}
              stroke={strokeColor}
              strokeWidth={2}
              fill={circle.fillColor}
              draggable={isDraggable}
              onClick={onClick}
            />
          ))}
          {arrows.map((arrow) => (
            <Arrow
              key={arrow.id}
              points={arrow.points}
              stroke={strokeColor}
              strokeWidth={2}
              fill={arrow.fillColor}
              draggable={isDraggable}
              onClick={onClick}
            />
          ))}

          {scribbles.map((scribble) => (
            <Line
              key={scribble.id}
              points={scribble.points}
              stroke={scribble.fillColor}
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              draggable={isDraggable}
              onClick={onClick}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
