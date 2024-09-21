import React from "react";

function Badge({ content, color }: { content: string; color: string }) {
  return (
    <span
      className={`text-xs font-semibold text-muted-foreground ${color} text-nowrap rounded-md px-4 py-1`}
    >
      {content}
    </span>
  );
}

export default Badge;
