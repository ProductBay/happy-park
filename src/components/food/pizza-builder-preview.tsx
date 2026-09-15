"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CupSoda,
  Minus,
  PackageCheck,
  Pizza,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  UtensilsCrossed,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { InteractivePizzaPreview } from "@/components/food/interactive-pizza-preview";
import { MealTablePreview } from "@/components/food/meal-table-preview";
import { FoodItemIllustration } from "@/components/food/food-item-illustration";
import { ParkyPizzaGuide } from "@/components/food/parky-pizza-guide";
import {
  cheeseOptions,
  crustOptions,
  featuredPizzas,
  foodSidesPreview,
  pizzaSizes,
  pizzaToppings,
  sauceOptions,
} from "@/lib/food/pizza-preview-data";

type CartItem = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  priceMinor: number;
};

const builderSteps = [
  {
    id: "size",
    label: "Size",
    short: "Pick your pizza",
  },
  {
    id: "crust",
    label: "Crust",
    short: "Choose the base",
  },
  {
    id: "sauce",
    label: "Sauce & Cheese",
    short: "Make it delicious",
  },
  {
    id: "toppings",
    label: "Toppings",
    short: "Create your masterpiece",
  },
  {
    id: "extras",
    label: "Sides & Drinks",
    short: "Complete the meal",
  },
  {
    id: "review",
    label: "Review",
    short: "Your creation",
  },
] as const;

function money(minor: number) {
  return new Intl.NumberFormat("en-JM", {
    style: "currency",
    currency: "JMD",
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

export function PizzaBuilderPreview() {
  const [builderOpen, setBuilderOpen] = useState(false);
  const [step, setStep] = useState(0);
  const stepScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    stepScrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  const [sizeId, setSizeId] = useState("medium");
  const [crustId, setCrustId] = useState("classic");
  const [sauceId, setSauceId] = useState("signature");
  const [cheeseId, setCheeseId] = useState("regular");

  const [toppings, setToppings] = useState<string[]>([
    "pepperoni",
  ]);

  const [extras, setExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [fulfillment, setFulfillment] =
    useState<"pickup" | "delivery">("pickup");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const size =
    pizzaSizes.find((item) => item.id === sizeId) ??
    pizzaSizes[1];

  const crust =
    crustOptions.find((item) => item.id === crustId) ??
    crustOptions[0];

  const sauce =
    sauceOptions.find((item) => item.id === sauceId) ??
    sauceOptions[0];

  const cheese =
    cheeseOptions.find((item) => item.id === cheeseId) ??
    cheeseOptions[0];

  const selectedToppings = pizzaToppings.filter((item) =>
    toppings.includes(item.id),
  );

  const selectedExtras = foodSidesPreview.filter((item) =>
    extras.includes(item.id),
  );

  const unitPrice = useMemo(() => {
    const toppingTotal = selectedToppings.reduce(
      (total, item) => total + item.priceMinor,
      0,
    );

    return (
      size.priceMinor +
      crust.priceMinor +
      sauce.priceMinor +
      cheese.priceMinor +
      toppingTotal
    );
  }, [
    size.priceMinor,
    crust.priceMinor,
    sauce.priceMinor,
    cheese.priceMinor,
    selectedToppings,
  ]);

  const pizzaTotal = unitPrice * quantity;

  const extrasTotal = selectedExtras.reduce(
    (total, item) => total + item.priceMinor,
    0,
  );

  const builderTotal = pizzaTotal + extrasTotal;

  const cartSubtotal = cart.reduce(
    (total, item) =>
      total + item.priceMinor * item.quantity,
    0,
  );

  const demoDeliveryFee =
    fulfillment === "delivery" ? 65000 : 0;

  const orderTotal =
    cartSubtotal + demoDeliveryFee;

  const progress =
    ((step + 1) / builderSteps.length) * 100;

  function toggleTopping(id: string) {
    setToppings((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleExtra(id: string) {
    setExtras((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function resetBuilder() {
    setStep(0);
    setSizeId("medium");
    setCrustId("classic");
    setSauceId("signature");
    setCheeseId("regular");
    setToppings(["pepperoni"]);
    setExtras([]);
    setQuantity(1);
  }

  function addPizzaToCart() {
    const toppingNames = selectedToppings.length
      ? selectedToppings.map((item) => item.name).join(", ")
      : "No extra toppings";

    setCart((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: "My Happy-Park Pizza",
        description: [
          size.name,
          crust.name,
          sauce.name,
          cheese.name,
          toppingNames,
        ].join(" · "),
        quantity,
        priceMinor: unitPrice,
      },
      ...selectedExtras.map((item) => ({
        id: crypto.randomUUID(),
        title: item.name,
        description:
          item.category === "drink"
            ? "Drink added with your pizza"
            : "Side added with your pizza",
        quantity: 1,
        priceMinor: item.priceMinor,
      })),
    ]);

    setBuilderOpen(false);
    resetBuilder();
  }

  function addFeaturedPizza(
    pizza: (typeof featuredPizzas)[number],
  ) {
    setCart((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title: pizza.name,
        description: pizza.description,
        quantity: 1,
        priceMinor: pizza.priceMinor,
      },
    ]);
  }

  function removeCartItem(id: string) {
    setCart((current) =>
      current.filter((item) => item.id !== id),
    );
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.25rem] border border-emerald-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.12)]">
          <div className="bg-gradient-to-br from-emerald-50 via-white to-orange-50 px-6 py-14 text-center sm:px-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
              Preview order confirmed
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Your Happy-Park feast is in.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
              This is a client demonstration. No real payment,
              kitchen ticket or delivery request has been created.
            </p>

            {fulfillment === "delivery" && (
              <div className="mx-auto mt-8 max-w-xl rounded-3xl bg-slate-950 p-6 text-left text-white">
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-amber-300" />

                  <div>
                    <p className="font-semibold">
                      Delivery powered by SLYDE
                    </p>

                    <p className="mt-1 text-sm text-white/60">
                      Your simulated dispatch journey is ready.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[
                    "Confirmed",
                    "Preparing",
                    "Assigned",
                    "On the way",
                  ].map((item, index) => (
                    <div key={item} className="text-center">
                      <div
                        className={[
                          "mx-auto h-2 w-full rounded-full",
                          index <= 1
                            ? "bg-amber-300"
                            : "bg-white/15",
                        ].join(" ")}
                      />

                      <p className="mt-2 text-[10px] text-white/55">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setCart([]);
                setOrderPlaced(false);
              }}
              className="mt-8 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white"
            >
              Start another order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2.5rem] bg-slate-950 text-white shadow-2xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/75">
                <Sparkles className="h-3.5 w-3.5" />
                Happy-Park Pizza Studio
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
                Build it.
                <span className="block text-amber-300">
                  Watch it come alive.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/60">
                Become the chef. Build your perfect pizza step by
                step, add your favourite sides and drinks, then
                choose pickup or delivery powered by SLYDE.
              </p>

              <button
                type="button"
                onClick={() => {
                  resetBuilder();
                  setBuilderOpen(true);
                }}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                <Pizza className="h-5 w-5" />
                Build My Pizza
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex min-h-[340px] items-center justify-center bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-200 p-8">
              <div className="text-center">
                <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full border-[18px] border-orange-700/15 bg-orange-500/70 shadow-2xl">
                  <Pizza className="h-24 w-24 text-white" />
                </div>

                <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-orange-950/60">
                  Your pizza. Your rules.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_390px]">
          <main>
            <div className="rounded-[2rem] border border-orange-200 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
                    Interactive Pizza Studio
                  </p>

                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                    Ready to become the chef?
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    The pizza stays right beside you while you
                    build, so every topping, cheese choice and
                    upgrade appears instantly.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setBuilderOpen(true)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white"
                >
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <section className="pt-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                Happy favourites
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Or grab a house favourite.
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {featuredPizzas.map((pizza) => (
                  <div
                    key={pizza.id}
                    className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100">
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-orange-400 shadow-xl">
                        <Pizza className="h-12 w-12 text-white" />
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-slate-950">
                        {pizza.name}
                      </h3>

                      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                        {pizza.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between">
                        <p className="font-semibold text-slate-950">
                          {money(pizza.priceMinor)}
                        </p>

                        <button
                          type="button"
                          onClick={() => addFeaturedPizza(pizza)}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          <CartPanel
            cart={cart}
            fulfillment={fulfillment}
            cartSubtotal={cartSubtotal}
            demoDeliveryFee={demoDeliveryFee}
            orderTotal={orderTotal}
            setFulfillment={setFulfillment}
            removeCartItem={removeCartItem}
            setOrderPlaced={setOrderPlaced}
          />
        </div>
      </div>

      {builderOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 p-0 backdrop-blur-md lg:p-3">
          <div className="mx-auto flex h-full max-w-[1500px] flex-col overflow-hidden bg-[#faf9f6] shadow-2xl lg:h-[calc(100vh-24px)] lg:max-h-none lg:rounded-[2rem]">
            <div className="shrink-0 border-b border-slate-200 bg-white">
              <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                    <Pizza className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-950">
                      Happy-Park Pizza Studio
                    </p>

                    <p className="text-xs text-slate-500">
                      Step {step + 1} of {builderSteps.length}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBuilderOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-1.5 bg-slate-100">
                <div
                  className="h-full rounded-r-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <div className="hidden overflow-x-auto border-t border-slate-100 px-5 py-2 md:block">
                <div className="flex min-w-max items-center gap-2">
                  {builderSteps.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setStep(index)}
                      className={[
                        "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition",
                        index === step
                          ? "bg-slate-950 text-white"
                          : index < step
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-400",
                      ].join(" ")}
                    >
                      {index < step ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}

                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[minmax(390px,0.84fr)_minmax(560px,1.16fr)]">
              <div className="min-h-0 shrink-0 overflow-hidden border-b border-slate-200 lg:h-full lg:border-b-0 lg:border-r">
                <div className="relative hidden h-full min-h-0 overflow-hidden lg:block">
                  {step < 4 ? (
                    <InteractivePizzaPreview
                      toppings={toppings}
                      sizeId={sizeId}
                      cheeseId={cheeseId}
                    />
                  ) : (
                    <MealTablePreview
                      toppings={toppings}
                      extras={extras}
                      sizeId={sizeId}
                      cheeseId={cheeseId}
                      totalMinor={builderTotal}
                    />
                  )}

                  <ParkyPizzaGuide
                    step={step}
                    toppingCount={toppings.length}
                    extraCount={extras.length}
                  />
                </div>

                <div className="relative flex h-[215px] items-center justify-center overflow-hidden bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-200 lg:hidden">
                  <div
                    className={[
                      "relative rounded-full border-[12px] border-amber-700/25 bg-orange-300 shadow-2xl transition-all duration-300",
                      sizeId === "small"
                        ? "h-32 w-32"
                        : sizeId === "medium"
                          ? "h-36 w-36"
                          : sizeId === "large"
                            ? "h-40 w-40"
                            : "h-44 w-44",
                    ].join(" ")}
                  >
                    <div className="absolute inset-3 rounded-full bg-red-500" />

                    <div
                      className={[
                        "absolute inset-5 rounded-full",
                        cheeseId === "loaded"
                          ? "bg-yellow-300"
                          : cheeseId === "extra"
                            ? "bg-yellow-200"
                            : "bg-amber-100",
                      ].join(" ")}
                    />

                    {toppings.slice(0, 8).map((topping, index) => (
                      <div
                        key={topping}
                        className="absolute z-10 h-4 w-4 rounded-full bg-red-600 shadow"
                        style={{
                          left: `${28 + ((index * 19) % 52)}%`,
                          top: `${25 + ((index * 23) % 50)}%`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="absolute bottom-3 right-3 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                    {money(builderTotal)}
                  </div>
                </div>
              </div>

              <div className="flex min-h-0 h-full flex-col overflow-hidden bg-white">
                <div ref={stepScrollRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 lg:p-6 xl:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
                    {builderSteps[step].short}
                  </p>

                  {step === 0 && (
                    <BuilderStep
                      title="How big is your pizza adventure?"
                      subtitle="Choose the size that fits your appetite."
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {pizzaSizes.map((item) => (
                          <OptionCard
                            key={item.id}
                            selected={sizeId === item.id}
                            onClick={() => setSizeId(item.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xl font-bold">
                                  {item.name}
                                </p>

                                <p className="mt-1 text-sm opacity-60">
                                  {item.inches}
                                </p>
                              </div>

                              <p className="font-bold text-orange-600">
                                {money(item.priceMinor)}
                              </p>
                            </div>
                          </OptionCard>
                        ))}
                      </div>
                    </BuilderStep>
                  )}

                  {step === 1 && (
                    <BuilderStep
                      title="Choose your perfect crust."
                      subtitle="Every great pizza starts with a great foundation."
                    >
                      <ChoiceOptions
                        options={crustOptions}
                        selectedId={crustId}
                        onSelect={setCrustId}
                      />
                    </BuilderStep>
                  )}

                  {step === 2 && (
                    <BuilderStep
                      title="Sauce it. Cheese it."
                      subtitle="Build the flavour foundation before the toppings arrive."
                    >
                      <h3 className="mb-3 font-bold text-slate-950">
                        Sauce
                      </h3>

                      <ChoiceOptions
                        options={sauceOptions}
                        selectedId={sauceId}
                        onSelect={setSauceId}
                      />

                      <h3 className="mb-3 mt-8 font-bold text-slate-950">
                        Cheese
                      </h3>

                      <ChoiceOptions
                        options={cheeseOptions}
                        selectedId={cheeseId}
                        onSelect={setCheeseId}
                      />
                    </BuilderStep>
                  )}

                  {step === 3 && (
                    <BuilderStep
                      title="Create your pizza masterpiece."
                      subtitle="Tap a topping and watch it land on your pizza instantly."
                    >
                      <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-black text-slate-950">
                            🍕 Junior Chef Challenge
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            How amazing can you make it?
                          </p>
                        </div>

                        <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-orange-600 shadow-sm">
                          {toppings.length} topping
                          {toppings.length === 1 ? "" : "s"}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {pizzaToppings.map((item) => {
                          const selected = toppings.includes(item.id);

                          return (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => toggleTopping(item.id)}
                              className={[
                                "group flex items-center justify-between rounded-2xl border p-4 text-left transition",
                                selected
                                  ? "border-orange-500 bg-orange-50 shadow-sm"
                                  : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40",
                              ].join(" ")}
                            >
                              <div>
                                <p className="font-bold text-slate-950">
                                  {item.name}
                                </p>

                                <p className="mt-1 text-xs capitalize text-slate-400">
                                  {item.category}
                                </p>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-slate-500">
                                  +{money(item.priceMinor)}
                                </span>

                                <div
                                  className={[
                                    "flex h-8 w-8 items-center justify-center rounded-full transition",
                                    selected
                                      ? "bg-orange-500 text-white"
                                      : "bg-slate-100 text-slate-400",
                                  ].join(" ")}
                                >
                                  {selected ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Plus className="h-4 w-4" />
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </BuilderStep>
                  )}

                  {step === 4 && (
                    <BuilderStep
                      title="Complete the Happy meal."
                      subtitle="Add a side, grab a drink, or keep your pizza flying solo."
                    >
                      <FoodExtraSection
                        title="Sides"
                        icon={
                          <UtensilsCrossed className="h-5 w-5" />
                        }
                        items={foodSidesPreview.filter(
                          (item) => item.category === "side",
                        )}
                        selected={extras}
                        onToggle={toggleExtra}
                      />

                      <div className="my-8 border-t border-slate-200" />

                      <FoodExtraSection
                        title="Drinks"
                        icon={<CupSoda className="h-5 w-5" />}
                        items={foodSidesPreview.filter(
                          (item) => item.category === "drink",
                        )}
                        selected={extras}
                        onToggle={toggleExtra}
                      />
                    </BuilderStep>
                  )}

                  {step === 5 && (
                    <BuilderStep
                      title="Meet your masterpiece."
                      subtitle="One final look before your creation joins the Happy Cart."
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <ReviewCard
                          label="Pizza"
                          value={`${size.name} · ${crust.name}`}
                        />

                        <ReviewCard
                          label="Sauce & cheese"
                          value={`${sauce.name} · ${cheese.name}`}
                        />

                        <ReviewCard
                          label="Toppings"
                          value={
                            selectedToppings.length
                              ? selectedToppings
                                  .map((item) => item.name)
                                  .join(", ")
                              : "No extra toppings"
                          }
                        />

                        <ReviewCard
                          label="Sides & drinks"
                          value={
                            selectedExtras.length
                              ? selectedExtras
                                  .map((item) => item.name)
                                  .join(", ")
                              : "Nothing extra"
                          }
                        />
                      </div>

                      <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                            Quantity
                          </p>

                          <p className="mt-1 text-sm text-white/65">
                            Want more than one masterpiece?
                          </p>
                        </div>

                        <div className="flex items-center rounded-full bg-white/10 p-1">
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(
                                Math.max(1, quantity - 1),
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="w-10 text-center font-bold">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setQuantity(quantity + 1)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </BuilderStep>
                  )}
                </div>

                <div className="relative z-50 shrink-0 border-t border-slate-200 bg-white px-5 py-3 shadow-[0_-8px_25px_rgba(15,23,42,0.06)] sm:px-7 sm:py-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="hidden sm:block">
                      <p className="text-xs text-slate-400">
                        Your build
                      </p>

                      <p className="text-xl font-black text-slate-950">
                        {money(builderTotal)}
                      </p>
                    </div>

                    <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                      <button
                        type="button"
                        disabled={step === 0}
                        onClick={() =>
                          setStep((current) =>
                            Math.max(0, current - 1),
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-slate-600 disabled:opacity-30"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>

                      {step < builderSteps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setStep((current) =>
                              Math.min(
                                builderSteps.length - 1,
                                current + 1,
                              ),
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={addPizzaToCart}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Add to Happy Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BuilderStep({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        {subtitle}
      </p>

      <div className="mt-7">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-5 text-left transition",
        selected
          ? "border-orange-500 bg-orange-50 shadow-md"
          : "border-slate-200 bg-white hover:border-orange-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ChoiceOptions({
  options,
  selectedId,
  onSelect,
}: {
  options: {
    id: string;
    name: string;
    priceMinor: number;
  }[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((item) => {
        const selected = selectedId === item.id;

        return (
          <OptionCard
            key={item.id}
            selected={selected}
            onClick={() => onSelect(item.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-bold text-slate-950">
                {item.name}
              </p>

              {selected && (
                <Check className="h-4 w-4 shrink-0 text-orange-500" />
              )}
            </div>

            <p className="mt-3 text-sm text-slate-400">
              {item.priceMinor === 0
                ? "Included"
                : `+${money(item.priceMinor)}`}
            </p>
          </OptionCard>
        );
      })}
    </div>
  );
}

function FoodExtraSection({
  title,
  icon,
  items,
  selected,
  onToggle,
}: {
  title: string;
  icon: ReactNode;
  items: typeof foodSidesPreview;
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-950">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-slate-400">
            {title === "Sides"
              ? "Tasty add-ons to make your meal even happier."
              : "Pick something cool and refreshing."}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const active = selected.includes(item.id);

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={[
                "group relative overflow-hidden rounded-2xl border bg-white text-left transition-all duration-300",
                active
                  ? "border-orange-500 bg-orange-50 shadow-[0_12px_35px_rgba(249,115,22,0.13)]"
                  : "border-slate-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg",
              ].join(" ")}
            >
              <div className="relative flex h-24 items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 xl:h-28">
                <div className="absolute h-24 w-24 rounded-full bg-white/80 shadow-inner" />

                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <FoodItemIllustration id={item.id} />
                </div>

                <div
                  className={[
                    "absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition",
                    active
                      ? "bg-orange-500 text-white"
                      : "bg-white text-slate-400",
                  ].join(" ")}
                >
                  {active ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </div>

              <div className="p-3 xl:p-4">
                <p className="font-bold text-slate-950">
                  {item.name}
                </p>

                <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-black text-orange-600">
                    +{money(item.priceMinor)}
                  </p>

                  {active && (
                    <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-orange-700">
                      Added
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReviewCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">
        {value}
      </p>
    </div>
  );
}

function CartPanel({
  cart,
  fulfillment,
  cartSubtotal,
  demoDeliveryFee,
  orderTotal,
  setFulfillment,
  removeCartItem,
  setOrderPlaced,
}: {
  cart: CartItem[];
  fulfillment: "pickup" | "delivery";
  cartSubtotal: number;
  demoDeliveryFee: number;
  orderTotal: number;
  setFulfillment: (value: "pickup" | "delivery") => void;
  removeCartItem: (id: string) => void;
  setOrderPlaced: (value: boolean) => void;
}) {
  return (
    <aside className="xl:sticky xl:top-28 xl:self-start">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                Your order
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                Happy Cart
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-600">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="max-h-[390px] space-y-3 overflow-y-auto p-5">
          {cart.length === 0 && (
            <div className="py-10 text-center">
              <Pizza className="mx-auto h-10 w-10 text-slate-200" />

              <p className="mt-4 font-medium text-slate-500">
                Your Happy Cart is empty.
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Build a pizza or add a favourite.
              </p>
            </div>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">
                    {item.title}
                  </p>

                  <p className="mt-1 line-clamp-3 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeCartItem(item.id)}
                  className="text-slate-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Qty {item.quantity}
                </span>

                <span className="font-semibold text-slate-950">
                  {money(item.priceMinor * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-slate-100 p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              How would you like it?
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFulfillment("pickup")}
                className={[
                  "rounded-xl border p-3 text-left transition",
                  fulfillment === "pickup"
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200",
                ].join(" ")}
              >
                <PackageCheck className="h-5 w-5" />
                <p className="mt-2 text-sm font-semibold">
                  Pickup
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFulfillment("delivery")}
                className={[
                  "rounded-xl border p-3 text-left transition",
                  fulfillment === "delivery"
                    ? "border-orange-500 bg-orange-50 text-orange-950"
                    : "border-slate-200",
                ].join(" ")}
              >
                <Truck className="h-5 w-5" />
                <p className="mt-2 text-sm font-semibold">
                  SLYDE
                </p>
              </button>
            </div>

            {fulfillment === "delivery" && (
              <div className="mt-3 rounded-xl bg-orange-50 p-3">
                <p className="text-xs font-semibold text-orange-800">
                  Delivery powered by SLYDE
                </p>

                <p className="mt-1 text-xs leading-5 text-orange-700/70">
                  Demo delivery quote: {money(demoDeliveryFee)}
                </p>
              </div>
            )}

            <div className="mt-5 space-y-2 text-sm">
              <PriceRow
                label="Subtotal"
                value={money(cartSubtotal)}
              />

              {fulfillment === "delivery" && (
                <PriceRow
                  label="Demo delivery"
                  value={money(demoDeliveryFee)}
                />
              )}

              <div className="border-t border-slate-200 pt-3">
                <PriceRow
                  label="Preview total"
                  value={money(orderTotal)}
                  strong
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOrderPlaced(true)}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-orange-600"
            >
              Preview order
              <ChevronRight className="h-4 w-4" />
            </button>

            <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
              Client preview only. No payment, kitchen order or
              SLYDE dispatch occurs.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

function PriceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between",
        strong
          ? "text-base font-bold text-slate-950"
          : "text-slate-600",
      ].join(" ")}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
























