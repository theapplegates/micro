import React from "react";

const Rating = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map(item => {
        const fillPercentage =
          count >= item ? 100 : count >= item - 1 ? (count % 1) * 100 : 0;

        return (
          <svg
            key={item}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFAF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon
              fill=""
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />

            <polygon
              fill="#FFAF00"
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default Rating;
