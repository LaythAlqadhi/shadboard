import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function CardOverlay() {
  return (
    <Card className="relative">
      <Image
        src="/images/bluetooth-speaker.jpeg"
        alt="Bluetooth Speaker"
        fill
        className="absolute h-full w-full rounded-md object-cover"
      />
      <div className="h-full w-full relative flex flex-col justify-between z-20">
        <CardHeader>
          <CardTitle>Wireless Bluetooth Speaker</CardTitle>
          <CardDescription>
            High-quality sound, deep bass, and long battery life.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col items-start space-y-3">
          <div className="flex space-x-2">
            <Button>Buy Now</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
