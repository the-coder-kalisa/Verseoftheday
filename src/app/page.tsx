import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVerse } from "./actions";
import Image from "next/image";
import GithubLogo from "@/assets/github-mark-white.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const verse = await getVerse();

  return (
    <main className="min-h-screen p-2 flex items-center flex-col justify-center">
      <div className="fixed top-2 right-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a href="https://github.com/the-coder-kalisa/BibleVerse">
                <Image src={GithubLogo} alt="github" width={30} height={30} />
              </a>
            </TooltipTrigger>
            <TooltipContent>Start this repo on Gitbub</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            {verse.bookname} {verse.chapter}:{verse.verse}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <p className="max-w-[23rem]">{verse.text}</p>
        </CardContent>
      </Card>
      <div className="fixed bottom-0 text-center w-full">
        &copy; {new Date().getFullYear()} bible verse
      </div>
    </main>
  );
}
