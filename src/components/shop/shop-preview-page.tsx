"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Check,
  ChevronRight,
  Flower2,
  Leaf,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  X,
} from "lucide-react";

import {
  formatShopMoney,
  shopCategories,
  shopProducts,
  type ShopCategory,
  type ShopProduct,
} from "@/lib/shop/shop-preview-data";

type CategoryFilter = "All" | ShopCategory;

type CartLine = {
  product: ShopProduct;
  quantity: number;
};

export function ShopPreviewPage() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const products = useMemo(() => {
    if (category === "All") {
      return shopProducts;
    }

    return shopProducts.filter(
      (product) => product.category === category,
    );
  }, [category]);

  const cartCount = cart.reduce(
    (total, line) => total + line.quantity,
    0,
  );

  const cartTotal = cart.reduce(
    (total, line) =>
      total + line.product.priceMinor * line.quantity,
    0,
  );

  function addToCart(product: ShopProduct) {
    setCart((current) => {
      const existing = current.find(
        (line) => line.product.id === product.id,
      );

      if (existing) {
        return current.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        );
      }

      return [...current, { product, quantity: 1 }];
    });

    setCartOpen(true);
  }

  function changeQuantity(productId: string, amount: number) {
    setCart((current) =>
      current
        .map((line) =>
          line.product.id === productId
            ? {
                ...line,
                quantity: Math.max(0, line.quantity + amount),
              }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  return (
    <main className="overflow-hidden bg-[#f8faf6] text-slate-950">
      <section className="relative overflow-hidden bg-[#153a2d] px-5 pb-20 pt-28 text-white sm:px-8 lg:px-12 lg:pb-28 lg:pt-36">
        <div className="absolute -left-28 top-12 h-96 w-96 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute -right-20 bottom-[-8rem] h-96 w-96 rounded-full bg-yellow-200/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
              <Leaf className="h-4 w-4 text-emerald-300" />
              Happy-Park Natural Shop
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              A little more
              <span className="block text-emerald-300">
                natural.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              Discover Happy-Park&apos;s herbal and natural product
              collection through a modern shopping experience built
              for browsing, ordering and delivery.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#shop-products"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-400 px-6 text-sm font-black text-emerald-950"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-black backdrop-blur"
              >
                <ShoppingBag className="h-4 w-4" />
                Bag
                {cartCount > 0 ? (
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-emerald-950">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-white/55">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                Product information
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                Pickup ready
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                SLYDE delivery ready
              </span>
            </div>
          </div>

          <div className="relative mx-auto h-[470px] w-full max-w-[500px]">
            <div className="absolute left-[5%] top-[8%] h-[82%] w-[82%] rotate-[-5deg] rounded-[3rem] bg-emerald-400" />
            <div className="absolute right-[1%] top-[14%] h-[80%] w-[80%] rotate-[5deg] rounded-[3rem] bg-yellow-200" />

            <div className="absolute inset-[9%] flex flex-col justify-between rounded-[3rem] bg-white p-7 text-slate-950 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                    Happy-Park
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    Natural Collection
                  </p>
                </div>

                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>

              <div className="relative mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-emerald-50">
                <Sprout className="h-24 w-24 text-emerald-600" />
                <Sparkles className="absolute right-5 top-5 h-6 w-6 text-yellow-500" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <HeroMini icon={<Leaf />} label="Herbal" />
                <HeroMini icon={<Flower2 />} label="Natural" />
                <HeroMini icon={<ShoppingBag />} label="Shop" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-3">
            <ShopBenefit
              icon={<Leaf className="h-6 w-6" />}
              title="Clear information"
              copy="Products can display ingredients, sizes, usage directions and important customer information."
            />

            <ShopBenefit
              icon={<PackageCheck className="h-6 w-6" />}
              title="Easy ordering"
              copy="Browse the catalog, add products to your bag and choose the fulfilment experience."
            />

            <ShopBenefit
              icon={<Bike className="h-6 w-6" />}
              title="Delivery ready"
              copy="The storefront is designed to connect Happy-Park orders with SLYDE delivery."
            />
          </div>
        </div>
      </section>

      <section
        id="shop-products"
        className="scroll-mt-24 bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                The collection
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Browse naturally.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                Preview products are being used while Happy-Park&apos;s
                final catalog, formulations and pricing are prepared.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex min-h-12 items-center gap-2 self-start rounded-full bg-slate-950 px-6 text-sm font-black text-white"
            >
              <ShoppingBag className="h-4 w-4" />
              View bag
              {cartCount > 0 ? ` (${cartCount})` : ""}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {(["All", ...shopCategories.map((item) => item.name)] as CategoryFilter[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={[
                    "rounded-full px-5 py-2.5 text-xs font-black transition",
                    category === item
                      ? "bg-emerald-700 text-white"
                      : "border border-slate-200 bg-[#f8faf6] text-slate-600 hover:border-emerald-300",
                  ].join(" ")}
                >
                  {item}
                </button>
              ),
            )}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAdd={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-[#153a2d] p-8 text-white sm:p-10">
            <ShieldCheck className="h-10 w-10 text-emerald-300" />

            <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
              Product transparency
            </p>

            <h2 className="mt-4 text-3xl font-black">
              Know what you are choosing.
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/65">
              Final product pages can provide ingredients, directions,
              sizes, warnings and other relevant information supplied
              and approved by Happy-Park.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-emerald-400 p-8 sm:p-10">
            <Bike className="h-10 w-10 text-emerald-950" />

            <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-emerald-950/60">
              Powered by SLYDE
            </p>

            <h2 className="mt-4 text-3xl font-black text-emerald-950">
              From Happy-Park to your door.
            </h2>

            <p className="mt-4 text-sm leading-7 text-emerald-950/70">
              Eligible shop orders can later move directly into the
              SLYDE quote, dispatch and tracking experience.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-[2.75rem] bg-yellow-200 p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <Star className="h-6 w-6 fill-slate-950" />

              <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                One Happy-Park. More ways to shop.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
                Park experiences, food and natural products can all
                live inside one connected Happy-Park digital platform.
              </p>
            </div>

            <Link
              href="/visit"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 text-sm font-black text-white"
            >
              Explore Happy-Park
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {cartOpen ? (
        <div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/45 backdrop-blur-sm">
          <button
            type="button"
            aria-label="Close shopping bag"
            className="absolute inset-0"
            onClick={() => setCartOpen(false)}
          />

          <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                  Happy-Park Shop
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  Your Bag
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex min-h-80 flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <ShoppingBag className="h-7 w-7 text-emerald-700" />
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    Your bag is empty.
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Add a preview product to see the Happy-Park
                    shopping experience in action.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((line) => (
                    <div
                      key={line.product.id}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-black">
                            {line.product.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {line.product.category}
                          </p>
                        </div>

                        <p className="font-black">
                          {formatShopMoney(
                            line.product.priceMinor * line.quantity,
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(line.product.id, -1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>

                        <span className="min-w-8 text-center text-sm font-black">
                          {line.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(line.product.id, 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">
                  Preview total
                </span>

                <span className="text-2xl font-black">
                  {formatShopMoney(cartTotal)}
                </span>
              </div>

              <button
                type="button"
                disabled={cart.length === 0}
                className="mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue to checkout
                <ChevronRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                Checkout is intentionally in preview mode for the
                client demonstration.
              </p>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}

function ProductCard({
  product,
  index,
  onAdd,
}: {
  product: ShopProduct;
  index: number;
  onAdd: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div
        className={[
          "relative flex h-64 items-center justify-center",
          index % 3 === 0
            ? "bg-emerald-100"
            : index % 3 === 1
              ? "bg-yellow-100"
              : "bg-lime-100",
        ].join(" ")}
      >
        <div className="flex h-36 w-28 flex-col items-center justify-center rounded-[2rem] border border-white bg-white/80 shadow-xl backdrop-blur">
          <Leaf className="h-12 w-12 text-emerald-700" />
          <span className="mt-3 text-[9px] font-black uppercase tracking-[0.15em] text-emerald-800">
            Happy-Park
          </span>
        </div>

        {product.featured ? (
          <span className="absolute left-5 top-5 rounded-full bg-emerald-800 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white">
            Featured
          </span>
        ) : null}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700">
              {product.category}
            </p>

            <h3 className="mt-2 text-xl font-black">
              {product.name}
            </h3>
          </div>

          <span className="whitespace-nowrap text-lg font-black">
            {formatShopMoney(product.priceMinor)}
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
          <div>
            <p className="text-xs font-bold text-slate-500">
              {product.size}
            </p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">
              {product.stock}
            </p>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-xs font-black text-white"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

function HeroMini({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-emerald-50 p-3 text-emerald-800">
      <div className="[&>svg]:h-4 [&>svg]:w-4">{icon}</div>
      <span className="mt-1 text-[9px] font-black uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

function ShopBenefit({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[2rem] border border-emerald-100 bg-white p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {copy}
      </p>
    </div>
  );
}
