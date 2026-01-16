"use client";

import { deleteProduct } from "@/app/actions";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  TrendingDown,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import PriceChart from "./PriceChart";

const ProductCard = ({ product }) => {
  const [showChart, setShowChart] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this product from tracking?"))
      return;
    setDeleting(true);
    const result = await deleteProduct(product.id);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message || "Product deleted successfully!");
      setUrl("");
    }

    setDeleting(false);
  };

  return (
    <Card
      className="
    bg-[#EAF7EE]
    border border-[#0f766e]/15
    rounded-2xl
    shadow-sm
    hover:shadow-md
    transition-shadow
  "
    >
      <CardHeader className="pb-3">
        <div className="flex gap-4">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md border"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#163832] line-clamp-2 mb-2">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#163832]">
                {product.currency} {product.current_price}
              </span>

              <Badge
                variant="secondary"
                className="gap-1 bg-white/70 text-[#0f766e]"
              >
                <TrendingDown className="w-3 h-3" />
                Tracking
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Chart
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Chart
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" asChild className="gap-1">
            <Link href={product.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View Product
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="gap-1 ml-auto text-red-600 hover:text-red-700 hover:bg-red-100"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        </div>
      </CardContent>
      {showChart && (
        <CardFooter className="pt-0">
          <PriceChart productId={product.id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
