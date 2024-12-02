import { Suspense } from "react";
import VideoComponent from "./video-component";
import { Loader } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";

export default function DemoVideo() {
  return (
    <Suspense
      fallback={
        <div>
          <AspectRatio
            ratio={16 / 9}
            className="flex items-center justify-center"
          >
            <Loader className="animate-spin" />
          </AspectRatio>
        </div>
      }
    >
      <div>
        <AspectRatio ratio={16 / 9}>
          <VideoComponent fileName={process.env.DEMO_FILE_NAME!} />
        </AspectRatio>
      </div>
    </Suspense>
  );
}
