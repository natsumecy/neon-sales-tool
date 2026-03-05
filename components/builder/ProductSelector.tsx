"use client";

import { Publisher } from "@/types/publisher";
import { updatePublisherConfig } from "@/app/actions/publishers";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSelectorProps {
  publisher: Publisher;
}

const ITEM_ASSETS = [
  "coins",
  "gems",
  "hearts",
  "stars",
  "crystals",
  "season-pass",
  "chest",
];

export function ProductSelector({ publisher }: ProductSelectorProps) {
  const toggleProduct = async (
    key: "webshop" | "directCheckout" | "webCheckout",
    value: boolean
  ) => {
    await updatePublisherConfig(publisher.slug, {
      products: { ...publisher.products, [key]: value },
    });
  };

  const updateSimulatedItem = async (
    field: string,
    value: string
  ) => {
    await updatePublisherConfig(publisher.slug, {
      simulatedItem: { ...publisher.simulatedItem, [field]: value },
    });
  };

  const updateFreeGift = async (
    field: string,
    value: string
  ) => {
    await updatePublisherConfig(publisher.slug, {
      freeGift: { ...publisher.freeGift, [field]: value },
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Enabled products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="webshop" className="text-sm">
              Webshop
            </Label>
            <Switch
              id="webshop"
              checked={publisher.products.webshop}
              onCheckedChange={(v) => toggleProduct("webshop", v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="directCheckout" className="text-sm">
              Direct checkout
            </Label>
            <Switch
              id="directCheckout"
              checked={publisher.products.directCheckout}
              onCheckedChange={(v) => toggleProduct("directCheckout", v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="webCheckout" className="text-sm">
              Web checkout
            </Label>
            <Switch
              id="webCheckout"
              checked={publisher.products.webCheckout}
              onCheckedChange={(v) => toggleProduct("webCheckout", v)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Simulated item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Item name</Label>
            <Input
              defaultValue={publisher.simulatedItem.name}
              onBlur={(e) => updateSimulatedItem("name", e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Price</Label>
              <Input
                defaultValue={publisher.simulatedItem.price}
                onBlur={(e) => updateSimulatedItem("price", e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Asset</Label>
              <Select
                defaultValue={publisher.simulatedItem.asset}
                onValueChange={(v) => updateSimulatedItem("asset", v)}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_ASSETS.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Discount label</Label>
            <Input
              defaultValue={publisher.simulatedItem.discountLabel}
              onBlur={(e) =>
                updateSimulatedItem("discountLabel", e.target.value)
              }
              className="h-8 text-sm"
              placeholder="e.g. 10% OFF"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Free gift</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Gift name</Label>
            <Input
              defaultValue={publisher.freeGift.name}
              onBlur={(e) => updateFreeGift("name", e.target.value)}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Asset</Label>
            <Select
              defaultValue={publisher.freeGift.asset}
              onValueChange={(v) => updateFreeGift("asset", v)}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ITEM_ASSETS.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
