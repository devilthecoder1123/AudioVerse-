import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/services/cart";

interface CartItemProps {
  item: CartItemType;
  index: number;
  onQuantityChange: (audiobookId: string, newQuantity: number) => void;
  onRemoveItem: (audiobookId: string, title: string) => void;
}

export function CartItem({ item, index, onQuantityChange, onRemoveItem }: CartItemProps) {
  return (
    <div
      className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Book Cover */}
      <div className="w-full sm:w-32 h-40 sm:h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
        <div className="text-center p-2">
          <h4 className="font-medium text-sm line-clamp-2">
            {item.audiobook.title}
          </h4>
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="space-y-2">
            <Link
              href={`/books/${item.audiobook.id}`}
              className="text-lg font-semibold hover:text-primary transition-colors line-clamp-1"
            >
              {item.audiobook.title}
            </Link>
            <p className="text-muted-foreground">by {item.audiobook.author}</p>
            <p className="text-sm text-muted-foreground">
              Narrated by {item.audiobook.narrator}
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {item.audiobook.genre}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {item.audiobook.duration}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-4">
            <p className="text-lg font-bold text-primary">
              ${item.audiobook.price}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onQuantityChange(item.audiobook.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-8 text-center font-medium">{item.quantity}</span>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onQuantityChange(item.audiobook.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveItem(item.audiobook.id, item.audiobook.title)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
