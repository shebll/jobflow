import { Loader } from "lucide-react";

export default function loading() {
  return (
    <div className="h-screen w-screen">
      <Loader size={50} className="mx-auto mt-10 h-10 w-10 animate-spin" />
    </div>
  );
}
