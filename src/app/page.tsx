import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVerse } from "./actions";

export default async function Home() {
  
  const verse = await getVerse();

  return (
    <main className="min-h-screen flex items-center flex-col justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            {verse.bookname} {verse.chapter}:{verse.verse}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="max-w-[23rem]">{verse.text}</p>
        </CardContent>
      </Card>
    </main>
  );
}
