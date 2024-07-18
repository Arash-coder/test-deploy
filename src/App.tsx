/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import Example from "./components/gesture";
import { fabric } from "fabric";

function App() {
  const canvasRef: any = useRef<HTMLDivElement>(null);
  const elRef: any = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas");
    canvasRef.current = canvas;

    fabric.Image.fromURL("./insta.webp", (img: any) => {
      // Replace with your image URL
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);
      canvas.add(img);
      const text = new fabric.Text("Hello, World!", {
        left: 50,
        top: 50,
        fill: "red",
        fontSize: 30
      });
      canvas.add(text);
    });
  }, []);

  const exportToPNG = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1.0
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        ref={elRef}
        className="max-w-[500px] mx-auto relative w-screen h-[100dvh] overflow-hidden"
      >
        <div id="container" className="w-full h-full">
          <img
            src="./insta.webp"
            alt="image"
            className="h-full w-full absolute -z-10"
          />
          <Example />
        </div>
        <button
          onClick={exportToPNG}
          className="absolute bottom-5 right-5 bg-blue-500 text-white p-2 rounded"
        >
          Export to PNG
        </button>
      </div>
      <canvas id="canvas" />
    </>
  );
}

export default App;
