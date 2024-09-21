import { filterSchemaType } from "./vaildation";

export function generateTitle(filterSchemaType: filterSchemaType): string {
  const { q, jobType, remote, location } = filterSchemaType;
  let title = "";
  if (q) {
    title += `${q} Jobs`;
  } else {
    title += "All Developer Jobs";
  }
  if (jobType) {
    title += ` - [${jobType}] Developer Jobs`;
  }
  if (remote) {
    title += " (Remote)";
  }
  if (location) {
    title += ` in ${location}`;
  } else if (!remote) {
    title += " (Worldwide)";
  }

  return title.trim();
}
