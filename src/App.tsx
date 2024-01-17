import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import Logo from "@/assets/logo.png";
import GithubLogo from "@/assets/github-mark-white.svg";
import { Separator } from "./components/ui/separator";
import { useEffect, useState } from "react";
import Loading from "./components/loading";

function App() {
  interface Verse {
    bookname: string;
    chapter: number;
    verse: number;
    text: string;
  }
  const [verse, setVerse] = useState<Verse>();
  useEffect(() => {
    fetch("http://localhost:5000/verse")
      .then((res) => res.json())
      .then((data) => setVerse(data));
  }, []);
  return !verse ? (
    <Loading />
  ) : (
    <div className="min-h-screen p-3 flex items-center flex-col justify-center">
      <div className="fixed w-full top-3 px-3 justify-between flex">
        <img src={Logo} alt="logo" height={60} width={60} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a href="https://github.com/the-coder-kalisa/BibleVerse">
                <img src={GithubLogo} alt="github" width={30} height={30} />
              </a>
            </TooltipTrigger>
            <TooltipContent>Start this repo on Gitbub</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            {verse?.bookname} {verse?.chapter}:{verse?.verse}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <p className="max-w-[23rem]">{verse.text}</p>
        </CardContent>
      </Card>
      <div className="fixed bottom-0 text-center w-full">
        &copy; {new Date().getFullYear()} verse of the day
      </div>
    </div>
  );
}

export default App;
