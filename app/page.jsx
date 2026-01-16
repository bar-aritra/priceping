import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Bell, Rabbit, Shield, TrendingDown } from "lucide-react";
import Image from "next/image";
import { getProducts } from "./actions";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = user ? await getProducts() : [];

  const FEATURES = [
    {
      icon: Rabbit,
      title: "Fast Performance",
      description:
        "Price Ping extracts product prices quickly and efficiently, ensuring you get the data you need without delay.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "We prioritize your security with robust measures to protect your data while providing reliable price extraction services.",
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description:
        "Stay informed with instant notifications about price changes, ensuring you never miss a deal.",
    },
  ];
  return (
    <main className="min-h-screen bg-[#DAF1DE] text-[#051F20]">
      <header
        className="
          sticky top-0 z-50
          bg-[#051F20]
          border-b border-[#8EB69B]/30
          shadow-md
        "
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/priceping-logo.png"
              alt="Price Ping Logo"
              width={600}
              height={200}
              className="h-16 w-auto"
            />
          </div>

          {/* Auth Button */}
          <AuthButton user={user} />
        </div>
      </header>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#8EB69B] text-[#051F20] px-6 py-2 rounded-full text-sm font-medium mb-6">
            {" "}
            Made with ❤️ by Aritra
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Never Miss a Price Drop
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Track and monitor product prices effortlessly with Price Ping.
          </p>

          <AddProductForm user={user} />

          {products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="p-6 rounded-xl bg-[#8EB69B]/20 shadow-md border border-[#8EB69B]/30"
                >
                  <div className="w-12 h-12 bg-[#8EB69B]/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-[#163832]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {user && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Tracked Products
            </h3>
            <span className="text-sm text-gray-500">
              {products.length}
              {products.length === 1 ? "product" : "products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {user && products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="rounded-xl border-2 border-dashed  bg-[#8EB69B]/20 shadow-md border-gray-500 p-12">
            <TrendingDown className="w-16 h-16 text-[#163832] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Products yet.</h3>
            <p className="text-gray-600">
              Add your first product to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
