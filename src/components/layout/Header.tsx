import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Knowledge Quest</span>
        </Link>
        <nav className="flex gap-4">
          <a
            href="#features"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
