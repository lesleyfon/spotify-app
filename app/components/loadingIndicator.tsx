function LoadingIndicator() {
  return (
    <div className="tw-flex tw-items-center tw-bg-red-200">
      <div aria-label="Loading..." role="status" className="tw-flex tw-items-center tw-space-x-2">
        <svg
          className="tw-h-20 tw-w-20 tw-stroke-gray-900 tw-animate-spin-slow"
          viewBox="0 0 256 256"
          stroke="black"
        >
          <line
            x1={128}
            y1={32}
            x2={128}
            y2={64}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={224}
            y1={128}
            x2={192}
            y2={128}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={128}
            y1={224}
            x2={128}
            y2={192}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1={32}
            y1={128}
            x2={64}
            y2={128}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={24}
          />
        </svg>
      </div>
    </div>
  );
}

export default LoadingIndicator;
