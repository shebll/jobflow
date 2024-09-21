import { filterSchemaType } from "@/lib/vaildation";
import FilterForm from "./FilterForm";

function Filter({ filterValues }: { filterValues: filterSchemaType }) {
  return (
    <aside className="h-fit min-w-[260px] rounded-md border p-4 lg:sticky lg:top-4">
      <h3 className="mb-6 text-xl">Filter Jobs</h3>
      <FilterForm filterValues={filterValues} />
    </aside>
  );
}

export default Filter;
