export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="flex flex-col items-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Agent<span className="text-primary">Forge</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Design, configure, and deploy autonomous multi-agent AI systems with real code execution
            capabilities.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/pipeline"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View on GitHub
          </a>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="mb-2 font-semibold">Visual Pipeline Builder</h3>
            <p className="text-sm text-muted-foreground">
              Drag-and-drop interface for designing multi-agent workflows
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="mb-2 font-semibold">Code Execution</h3>
            <p className="text-sm text-muted-foreground">
              Native Python sandbox with autonomous debug cycles
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-card-foreground">
            <h3 className="mb-2 font-semibold">One-Click Deploy</h3>
            <p className="text-sm text-muted-foreground">
              Deploy pipelines to Cloud Run with minimal configuration
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
