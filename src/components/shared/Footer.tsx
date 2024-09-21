import { cn } from "@/lib/utils";

function Footer() {
  return (
    <footer className={cn("bg-gray-800 py-4 text-white")}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
