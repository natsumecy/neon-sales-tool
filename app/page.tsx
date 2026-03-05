import Link from "next/link";
import { getAllPublishers } from "@/lib/publishers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, Settings } from "lucide-react";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const publishers = getAllPublishers();

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Neon Sales Demo Tool
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage publisher demos for sales presentations
          </p>
        </div>
        <Button asChild>
          <Link href="/publishers/new">
            <Plus className="mr-2 h-4 w-4" />
            New publisher
          </Link>
        </Button>
      </div>

      {publishers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground mb-4">
              No publishers yet. Create your first one to get started.
            </p>
            <Button asChild variant="outline">
              <Link href="/publishers/new">
                <Plus className="mr-2 h-4 w-4" />
                Create publisher
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publishers.map((pub) => {
            const logoExists = fs.existsSync(
              path.join(process.cwd(), "public", "img", pub.slug, "logo.png")
            );
            return (
              <Card key={pub.slug} className="group">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    {logoExists ? (
                      <img
                        src={`/img/${pub.slug}/logo.png`}
                        alt={pub.name}
                        className="w-10 h-10 rounded-lg object-contain bg-muted"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {pub.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">
                        {pub.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground truncate">
                        {pub.gameName}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pub.products.webshop && (
                      <Badge variant="secondary" className="text-xs">
                        Webshop
                      </Badge>
                    )}
                    {pub.products.directCheckout && (
                      <Badge variant="secondary" className="text-xs">
                        Direct
                      </Badge>
                    )}
                    {pub.products.webCheckout && (
                      <Badge variant="secondary" className="text-xs">
                        Web
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link href={`/builder/${pub.slug}`}>
                        <Settings className="mr-1.5 h-3.5 w-3.5" />
                        Builder
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/demo/${pub.slug}`}>
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Updated{" "}
                    {new Date(pub.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
