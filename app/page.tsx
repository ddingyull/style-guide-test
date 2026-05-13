export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Nomos UI Registry</h1>
        <p className="mt-4 text-muted-foreground">
          A shadcn/ui compatible component registry with black borders
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Visit the{' '}
          <a
            href="https://github.com/YOUR_USERNAME/nomos-ui"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>{' '}
          for installation instructions
        </p>
      </div>
    </div>
  );
}
