import { getContentLibrary } from "@/lib/content-library";
import { HomePage } from "@/components/home-page";

export default function Page() {
  const contentLibrary = getContentLibrary();

  return <HomePage contentLibrary={contentLibrary} />;
}