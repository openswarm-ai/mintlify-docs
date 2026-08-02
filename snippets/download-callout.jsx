export const DownloadCallout = ({
  children,
  fileId,
  href,
  label = "Download",
  loadingLabel = "Starting download…",
  loadingMs = 2500,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // `drive.usercontent.google.com` skips the virus-scan interstitial that
  // `drive.google.com/uc` shows for larger files.
  const downloadUrl =
    href ??
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;

  // Drive sends no CORS headers, so download progress can't be observed.
  // The spinner is a fixed-duration affordance, not real progress.
  const handleClick = () => {
    clearTimeout(timeoutRef.current);
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => setIsLoading(false), loadingMs);
  };

  const buttonStyle = {
    opacity: isLoading ? 0.7 : 1,
    pointerEvents: isLoading ? "none" : "auto",
  };

  return (
    // Avoid the `callout` class and `data-callout-type` attribute here:
    // Mintlify's MDX pipeline rewrites elements carrying them into its own
    // Callout component, which discards everything except children.
    <div
      role="note"
      className="not-prose my-4 flex items-center gap-3 overflow-hidden rounded-2xl border border-green-200 bg-green-50 px-5 py-4 dark:border-green-900 dark:bg-green-600/20"
    >
      <div className="w-4 shrink-0">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="size-4.5 text-green-800 dark:text-green-300"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>

      <div className="prose dark:prose-invert w-full min-w-0 text-sm [&_p]:my-0">
        {children}
      </div>

      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-busy={isLoading}
        style={buttonStyle}
        className="not-prose inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white no-underline transition-colors hover:bg-green-700"
      >
        {isLoading ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 animate-spin">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.3"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m7 10 5 5 5-5" />
            <path d="M12 15V3" />
          </svg>
        )}
        {isLoading ? loadingLabel : label}
      </a>
    </div>
  );
};
