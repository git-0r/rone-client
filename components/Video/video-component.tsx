"use server";
import { list } from "@vercel/blob";

type VideoComponentProps = {
  fileName: string;
};

export default async function VideoComponent({
  fileName,
}: VideoComponentProps) {
  const { blobs } = await list({
    prefix: fileName,
    limit: 1,
  });
  const { url } = blobs[0];

  return (
    <video autoPlay playsInline muted preload="none" aria-label="Video player">
      <source src={url} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
