// TODO: Make hero page

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 h-[85vh] container">
      <h2 className="sm:text-7xl text-4xl text-center font-extrabold">
        Create Beautiful Code Snippet Images
      </h2>
      <p className="sm:text-xl text-center mt-5 mb-6 w-[90%]">
        code-png is a tool that helps you generate stunning, customizable code
        snippet images for your projects, documentation, and more.
      </p>
      <Link href="/editor" className={buttonVariants({ size: "lg" })}>
        Try it now
      </Link>
    </div>
  );
}
