import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "@/public/images/logo.png";

function Header() {
  return (
    <header className="p-2 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-4">
          <Image
            src={Logo}
            quality={100}
            width={40}
            height={40}
            alt="JobFlow logo png"
          />
          <span className="text-xl font-semibold tracking-tight">JobFlow</span>
        </Link>

        <Button asChild>
          <Link href="/jobs/new">Post a Job</Link>
        </Button>
      </nav>
    </header>
  );
}

export default Header;
