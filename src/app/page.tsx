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
import Logo from "@/assets/logo.png";
import Link from "next/link";

export default async function Home() {
  const verse : any = await getVerse();
  console.log(verse);
  return (
    <main className="min-h-screen p-3 flex items-center flex-col justify-center">
      <div>{verse.webhook}</div>
      <div className="fixed w-full top-3 px-3 justify-between flex">
        <Link href="/">
          <Image src={Logo} alt="logo" height={60} width={60} />
        </Link>
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
        &copy; {new Date().getFullYear()} verse of the day
      </div>
    </main>
  );
}
