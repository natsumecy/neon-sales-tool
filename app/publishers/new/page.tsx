import { createPublisher } from "@/app/actions/publishers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPublisherPage() {
  return (
    <main className="min-h-screen p-8 max-w-xl mx-auto">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>New publisher</CardTitle>
          <CardDescription>
            Create a new publisher profile. After creating, drop screenshot and
            logo assets into the{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded">
              public/img/[slug]/
            </code>{" "}
            directory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPublisher} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Publisher name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. KRAFTON"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gameName">Game name</Label>
              <Input
                id="gameName"
                name="gameName"
                placeholder="e.g. Battlegrounds Mobile"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="e.g. krafton"
                pattern="[a-z0-9-]+"
                title="Lowercase letters, numbers, and hyphens only"
                required
              />
              <p className="text-xs text-muted-foreground">
                Used in URLs and file paths. Lowercase letters, numbers, and
                hyphens only.
              </p>
            </div>
            <Button type="submit" className="w-full">
              Create publisher
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
