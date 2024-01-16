import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Verse } from "@/types/verse";
import schedule from 'node-schedule'

let verse: Verse | null = null;

let url = "https://labs.bible.org/api/?passage=random&type=json";

const webhook = process.env.SLACK_WEBHOOK_URL!;

const getVerse = async () => {
  if (!verse) {
    verse = await fetchVerse();
  }
  return verse!;
};

const fetchVerse = async () => {
  const response = await fetch(url, {
    cache: "no-store",
  });
  const data = await response.json();
  return data[0];
};

const postVerse = async () => {
  if (!verse) {
    verse = await fetchVerse();
  }
  const payload = {
    text: `<!channel> *Verse of the Day*\n${verse!.bookname} ${
      verse!.chapter
    }:${verse!.verse}\n${verse!.text}`,
  };
  console.log("posting verse");
  const response = await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response;
};

export default async function Home() {
  const verse = await getVerse();

  // schedule for 01:05 every day
  schedule.scheduleJob("12 1 * * *", async () => {
    await postVerse();
  });

  return (
    <main className="min-h-screen p-3 flex items-center flex-col justify-center">
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
