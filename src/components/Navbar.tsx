const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="container flex h-16 items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm font-mono">M</span>
        </div>
        <span className="text-lg font-semibold text-foreground">Matter</span>
        <span className="text-xs text-muted-foreground ml-1 hidden sm:inline">by JetBrains</span>
      </div>
      <a
        href="#waitlist"
        className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
      >
        Join Waitlist
      </a>
    </div>
  </nav>
);

export default Navbar;
