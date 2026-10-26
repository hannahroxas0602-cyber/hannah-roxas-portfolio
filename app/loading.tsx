export default function Loading() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-background">
      <div className="loading-hop" role="status">
        <span aria-hidden className="sit" />
        <span aria-hidden className="leap" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
