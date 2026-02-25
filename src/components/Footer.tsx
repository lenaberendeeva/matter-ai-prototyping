const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs font-mono">M</span>
        </div>
        <span>Matter by JetBrains</span>
      </div>
      <span>© 2026 JetBrains. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
