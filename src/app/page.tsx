import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";

export default function Home() {
  // read welcome.md:
  const welcome = readFileSync(
    join(process.cwd(), "/src/app/welcome.md"),
    "utf8"
  );

  return (
    <div className="leading-relaxed flex flex-col gap-4">
      <ReactMarkdown>{welcome}</ReactMarkdown>
    </div>
  );
}
