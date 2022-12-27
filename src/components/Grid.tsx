import { useState } from "react";
import { Hexagon, HexGrid, Layout } from "react-hexgrid";

// draws a grid of hexagons with a given height, width, and size
type HexGridProps = {
  height: number;
  width: number;
  size: number;
};

type Hex = {
  q: number;
  r: number;
  s: number;
  colour: string;
};

export default function Grid({ height, width, size }: HexGridProps) {
  const [grid, setGrid] = useState<Hex[]>([
    { q: 0, r: 0, s: 0, colour: "red" },
  ]);

  return (
    <div className="h-full w-full bg-white flex items-center justify-center">
      {/* <HexGrid width={width} height={height} className="bg-pink-50">
        <Layout
          size={{ x: size, y: size }}
          flat={true}
          spacing={1.01}
          origin={{ x: 0, y: 0 }}
        >
          <Hexagon q={0} r={0} s={0} style={{ fill: "red" }} />
          {grid.map((hex) => (
            <Hexagon
              q={hex.q}
              r={hex.q}
              s={hex.s}
              style={{ fill: hex.colour }}
            />
          ))}
        </Layout>
      </HexGrid> */}
    </div>
  );
}
