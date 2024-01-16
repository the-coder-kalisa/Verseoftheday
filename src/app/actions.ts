"use server";

import { Verse } from "@/types/verse";
import cron from "node-cron";

let verse: Verse | null = null;

let url = "https://labs.bible.org/api/?passage=random&type=json";

const webhook = process.env.SLACK_WEBHOOK_URL!;

export const getVerse = async () => {
  if (!verse) {
    verse = await fetchVerse();
  }
  return verse!;
};

export const fetchVerse = async () => {
  const response = await fetch(url, {
    cache: "no-store",
  });
  const data = await response.json();
  return data[0];
};

export const postVerse = async () => {
  if (!verse) {
    verse = await fetchVerse();
  }
  const payload = {
    text: `*${verse!.bookname} ${verse!.chapter}:${verse!.verse}*\n${
      verse!.text
    }`,
  };
  const response = await fetch(webhook, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response;
};

// schedule for every 8:00 AM
cron.schedule("22 8 * * *", async () => {
  verse = await fetchVerse();
  await postVerse();
});
