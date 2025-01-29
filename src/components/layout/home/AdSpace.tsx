export default function AdSpace() {
    return (
      <>
        <section className="bg-muted/30 py-2">
          <div className="container px-4">
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center h-24">
              <p className="text-muted-foreground">Ad Space</p>
            </div>
          </div>
        </section>
        <div className="hidden lg:block">
          <div className="bg-muted p-4 rounded-lg h-full flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space</p>
          </div>
        </div>
      </>
    );
  }