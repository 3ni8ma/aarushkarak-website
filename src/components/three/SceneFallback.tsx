export default function SceneFallback() {
  return (
    <div className="absolute inset-0 bg-dark" aria-hidden="true">
      <div className="absolute inset-0 bg-grain" />
    </div>
  );
}
