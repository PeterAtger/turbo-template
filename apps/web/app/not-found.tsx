import { Button } from '@repo/ui/components/button';
import Image from 'next/image';
import Link from 'next/link';
import NotFoundImage from '@/assets/not-found.jpg';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center pb-40 h-[calc(100vh-74px)]">
      <Image
        src={NotFoundImage.src}
        alt="Not Found"
        width={500}
        height={500}
      />

      <h2>OOH - OOH</h2>
      <p>Could not find requested page</p>
      <Link href="/">
        <Button className="mt-4">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
