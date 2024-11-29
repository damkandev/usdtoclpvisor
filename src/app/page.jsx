import Value from "@/components/Value";
import { Chart } from "@/components/Chart";
export default function Home() {
  return (
    <div className="flex p-6 h-full">
      <Value className="rounded-xl p-6 w-full mr-4" />
      <Chart className="w-full h-full" />
    </div>
  );
}
