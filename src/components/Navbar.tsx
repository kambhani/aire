import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 w-full bg-slate-400 dark:bg-slate-500">
      <span>Aire</span>
      <ModeToggle />
    </div>
  );
}
