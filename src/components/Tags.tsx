import React from "react";

const Tags = ({
  list,
  className = "",
}: {
  list: string[];
  className?: string;
}) => {
  return (
    <div className={`not-prose flex w-full flex-wrap gap-2 ${className}`}>
      {list.map(tag => (
        <span className="tag" key={tag}>
          # {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
