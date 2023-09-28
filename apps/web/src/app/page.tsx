import { Button } from "ui/components/ui/button";

export default function Page(): JSX.Element {
  return (
    <div className="m-8">
      <h1 className="font-bold text-4xl mb-2">The UI Library works!</h1>
      <Button variant="default">Click me</Button>
    </div>
  );
}
