"use client";

import { Publisher } from "@/types/publisher";
import { updatePublisherConfig } from "@/app/actions/publishers";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PromoCodeConfigProps {
  publisher: Publisher;
}

export function PromoCodeConfig({ publisher }: PromoCodeConfigProps) {
  const updatePromo = async (updates: Partial<Publisher["promo"]>) => {
    await updatePublisherConfig(publisher.slug, {
      promo: { ...publisher.promo, ...updates },
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Promo code</CardTitle>
          <Switch
            checked={publisher.promo.enabled}
            onCheckedChange={(v) => updatePromo({ enabled: v })}
          />
        </div>
      </CardHeader>
      {publisher.promo.enabled && (
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Code</Label>
            <Input
              defaultValue={publisher.promo.code}
              onBlur={(e) => updatePromo({ code: e.target.value })}
              className="h-8 text-sm font-mono"
              placeholder="e.g. DISCOUNT10"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Discount percent</Label>
            <Input
              type="number"
              defaultValue={publisher.promo.discountPercent}
              onBlur={(e) =>
                updatePromo({ discountPercent: parseInt(e.target.value) || 0 })
              }
              className="h-8 text-sm"
              min={0}
              max={100}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
