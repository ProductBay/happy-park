"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChefHat,
  CircleDollarSign,
  Droplets,
  Leaf,
  Minus,
  PackageCheck,
  Pizza,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Truck,
  Wheat,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  formatPizzaStudioMoney,
  getPizzaStudioExtrasByCategory,
  getPizzaStudioToppingsByCategory,
  pizzaStudioCategoryLabels,
  pizzaStudioCheeses,
  pizzaStudioCrusts,
  pizzaStudioExtraCategoryLabels,
  pizzaStudioExtras,
  pizzaStudioPresets,
  pizzaStudioSauces,
  pizzaStudioSizes,
  pizzaStudioToppings,
  PIZZA_STUDIO_CONFIG,
  type PizzaStudioCategory,
  type PizzaStudioExtraCategory,
} from "@/lib/food/pizza-studio-catalogue";

type StudioStep =
  | "size"
  | "base"
  | "toppings"
  | "extras"
  | "review";

const steps: Array<{
  id: StudioStep;
  label: string;
  short: string;
}> = [
  { id: "size", label: "Choose your size", short: "Size" },
  { id: "base", label: "Build your base", short: "Base" },
  { id: "toppings", label: "Make it yours", short: "Toppings" },
  { id: "extras", label: "Complete the meal", short: "Extras" },
  { id: "review", label: "Your creation", short: "Review" },
];

const toppingCategories: PizzaStudioCategory[] = [
  "classic",
  "garden",
  "caribbean",
  "premium",
  "plant-based",
];

const extraCategories: PizzaStudioExtraCategory[] = [
  "savory-side",
  "park-treat",
  "soft-drink",
  "refreshment",
  "natural-juice",
];

const toppingVisuals: Record<
  string,
  { symbol: string; className: string }
> = {
  cheese: { symbol: "●", className: "text-amber-200" },
  pepperoni: { symbol: "●", className: "text-red-700" },
  "smoked-turkey-sausage": {
    symbol: "●",
    className: "text-amber-900",
  },
  arugula: { symbol: "◆", className: "text-emerald-700" },
  olives: { symbol: "○", className: "text-slate-800" },
  pineapple: { symbol: "◆", className: "text-yellow-300" },
  "sweet-corn": { symbol: "•", className: "text-yellow-400" },
  moringa: { symbol: "✦", className: "text-green-700" },
  ackee: { symbol: "●", className: "text-yellow-500" },
  "moringa-blossom": { symbol: "✿", className: "text-lime-700" },
  anchovies: { symbol: "≈", className: "text-slate-500" },
  shrimp: { symbol: "C", className: "text-orange-400" },
  tuna: { symbol: "◆", className: "text-rose-300" },
  "vegan-cheese": { symbol: "●", className: "text-yellow-100" },
};

const toppingPositions = [
  "left-[21%] top-[22%]",
  "left-[48%] top-[18%]",
  "right-[20%] top-[28%]",
  "left-[31%] top-[45%]",
  "right-[31%] top-[47%]",
  "left-[20%] bottom-[23%]",
  "left-[48%] bottom-[17%]",
  "right-[18%] bottom-[28%]",
];

function joinNames(ids: string[], source: Array<{ id: string; name: string }>) {
  return ids
    .map((id) => source.find((item) => item.id === id)?.name)
    .filter(Boolean)
    .join(", ");
}

export function PizzaStudio() {
  const [step, setStep] = useState<StudioStep>("size");
  const [sizeId, setSizeId] = useState("large");
  const [crustId, setCrustId] = useState("classic");
  const [sauceId, setSauceId] = useState("signature-tomato");
  const [cheeseId, setCheeseId] = useState("cheese");
  const [presetId, setPresetId] = useState("build-your-own");
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [toppingCategory, setToppingCategory] =
    useState<PizzaStudioCategory>("classic");
  const [extraCategory, setExtraCategory] =
    useState<PizzaStudioExtraCategory>("savory-side");

  const stepIndex = steps.findIndex((item) => item.id === step);
  const selectedSize = pizzaStudioSizes.find((item) => item.id === sizeId);
  const selectedCrust = pizzaStudioCrusts.find((item) => item.id === crustId);
  const selectedSauce = pizzaStudioSauces.find((item) => item.id === sauceId);
  const selectedCheese = pizzaStudioCheeses.find(
    (item) => item.id === cheeseId,
  );
  const selectedPreset = pizzaStudioPresets.find(
    (item) => item.id === presetId,
  );

  const priceParts = useMemo(() => {
    const values = [
      selectedSize?.priceMinor,
      selectedCrust?.priceMinor,
      selectedSauce?.priceMinor,
      selectedCheese?.priceMinor,
      ...toppingIds.map(
        (id) =>
          pizzaStudioToppings.find((item) => item.id === id)?.priceMinor,
      ),
      ...extraIds.map(
        (id) =>
          pizzaStudioExtras.find((item) => item.id === id)?.priceMinor,
      ),
    ];

    return values;
  }, [
    selectedSize,
    selectedCrust,
    selectedSauce,
    selectedCheese,
    toppingIds,
    extraIds,
  ]);

  const hasUnconfirmedPrice = priceParts.some(
    (value) => value === null || value === undefined,
  );

  const confirmedTotal = priceParts.reduce<number>(
    (total, value) => total + (value ?? 0),
    0,
  );

  const displayTotal = hasUnconfirmedPrice
    ? "Price pending"
    : formatPizzaStudioMoney(confirmedTotal * quantity);

  function goNext() {
    const next = Math.min(stepIndex + 1, steps.length - 1);
    setStep(steps[next].id);
  }

  function goBack() {
    const previous = Math.max(stepIndex - 1, 0);
    setStep(steps[previous].id);
  }

  function toggleTopping(id: string) {
    setToppingIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      const limit =
        selectedPreset?.maxToppings ??
        PIZZA_STUDIO_CONFIG.maxCustomToppings;

      if (current.length >= limit) {
        return current;
      }

      return [...current, id];
    });
  }

  function toggleExtra(id: string) {
    setExtraIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function applyPreset(id: string) {
    const preset = pizzaStudioPresets.find((item) => item.id === id);

    if (!preset) {
      return;
    }

    setPresetId(id);
    setToppingIds(preset.toppingIds);

    if (id === "vegan") {
      setCrustId("broccoli-vegan-base");
      setCheeseId("vegan-cheese");
      setToppingCategory("plant-based");
    }
  }

  function resetStudio() {
    setStep("size");
    setSizeId("large");
    setCrustId("classic");
    setSauceId("signature-tomato");
    setCheeseId("cheese");
    setPresetId("build-your-own");
    setToppingIds([]);
    setExtraIds([]);
    setQuantity(1);
    setToppingCategory("classic");
    setExtraCategory("savory-side");
  }

  return (
    <section className="relative overflow-hidden bg-[#fffaf3] py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,#ffedd5_0,transparent_68%)]" />

      <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-600 shadow-sm">
            <ChefHat className="h-4 w-4" />
            Happy-Park Pizza Studio
          </div>

          <h1 className="text-balance text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
            Build it.
            <span className="block text-orange-500">
              Watch it come alive.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Choose your size, create your base, layer on Happy-Park
            favourites and finish the experience with sides, park treats
            and natural juices.
          </p>
        </header>

        <div className="mb-7 overflow-x-auto pb-2">
          <div className="mx-auto flex min-w-[650px] max-w-4xl items-center justify-between rounded-2xl border border-orange-100 bg-white p-2 shadow-sm">
            {steps.map((item, index) => {
              const active = item.id === step;
              const complete = index < stepIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={[
                    "flex min-w-[110px] items-center gap-2 rounded-xl px-3 py-3 text-left transition",
                    active
                      ? "bg-slate-950 text-white shadow-lg"
                      : "text-slate-500 hover:bg-orange-50",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black",
                      active
                        ? "bg-orange-500 text-white"
                        : complete
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {complete ? <Check className="h-4 w-4" /> : index + 1}
                  </span>

                  <span className="text-xs font-bold">{item.short}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-[0_24px_80px_rgba(120,53,15,0.10)]">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
                Step {stepIndex + 1} of {steps.length}
              </p>
 
              <div className="mt-2 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  {steps[stepIndex].label}
                </h2>

                <button
                  type="button"
                  onClick={resetStudio}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              {step === "size" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {pizzaStudioSizes.map((size) => {
                    const active = size.id === sizeId;

                    return (
                      <button
                        type="button"
                        key={size.id}
                        onClick={() => setSizeId(size.id)}
                        className={[
                          "relative overflow-hidden rounded-[1.5rem] border p-6 text-left transition-all duration-300",
                          active
                            ? "border-orange-500 bg-orange-50 shadow-[0_15px_45px_rgba(249,115,22,0.14)]"
                            : "border-slate-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg",
                        ].join(" ")}
                      >
                        {size.featured && (
                          <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                            Favourite
                          </span>
                        )}

                        <div
                          className="flex items-center justify-center rounded-full border-[10px] border-amber-500 bg-amber-200 shadow-inner"
                          style={{
                            width: `${Math.max(82, size.inches * 7)}px`,
                            height: `${Math.max(82, size.inches * 7)}px`,
                          }}
                        >
                          <Pizza className="h-8 w-8 text-orange-700" />
                        </div>

                        <div className="mt-5">
                          <div className="flex items-end justify-between gap-3">
                            <div>
                              <p className="text-xl font-black text-slate-950">
                                {size.name}
                              </p>
                              <p className="text-sm font-bold text-orange-600">
                                {size.inches}&quot;
                              </p>
                            </div>

                            <p className="text-sm font-black text-slate-950">
                              {formatPizzaStudioMoney(size.priceMinor)}
                            </p>
                          </div>

                          <p className="mt-3 text-sm leading-6 text-slate-500">
                            {size.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === "base" && (
                <div className="space-y-8">
                  <ChoiceSection
                    icon={<Wheat className="h-5 w-5" />}
                    title="Crust"
                    items={pizzaStudioCrusts}
                    selectedId={crustId}
                    onSelect={setCrustId}
                  />

                  <ChoiceSection
                    icon={<Droplets className="h-5 w-5" />}
                    title="Sauce"
                    items={pizzaStudioSauces}
                    selectedId={sauceId}
                    onSelect={setSauceId}
                  />

                  <ChoiceSection
                    icon={<Sparkles className="h-5 w-5" />}
                    title="Cheese"
                    items={pizzaStudioCheeses}
                    selectedId={cheeseId}
                    onSelect={setCheeseId}
                  />
                </div>
              )}

              {step === "toppings" && (
                <div>
                  <div className="mb-6 grid gap-3 md:grid-cols-2">
                    {pizzaStudioPresets.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset.id)}
                        className={[
                          "rounded-2xl border p-4 text-left transition",
                          preset.id === presetId
                            ? "border-orange-500 bg-orange-50"
                            : "border-slate-200 hover:border-orange-200",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-black text-slate-950">
                              {preset.name}
                            </p>
                            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-orange-600">
                              {preset.eyebrow}
                            </p>
                          </div>

                          {preset.badge && (
                            <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                              {preset.badge}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {preset.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
                    {toppingCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setToppingCategory(category)}
                        className={[
                          "whitespace-nowrap rounded-full px-4 py-2 text-xs font-black transition",
                          toppingCategory === category
                            ? "bg-slate-950 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-orange-50",
                        ].join(" ")}
                      >
                        {pizzaStudioCategoryLabels[category]}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {getPizzaStudioToppingsByCategory(
                      toppingCategory,
                    ).map((topping) => {
                      const active = toppingIds.includes(topping.id);

                      return (
                        <button
                          type="button"
                          key={topping.id}
                          onClick={() => toggleTopping(topping.id)}
                          className={[
                            "group rounded-2xl border p-4 text-left transition-all",
                            active
                              ? "border-orange-500 bg-orange-50 shadow-md"
                              : "border-slate-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-lg">
                              {toppingVisuals[topping.id]?.symbol ?? "•"}
                            </span>

                            <span
                              className={[
                                "flex h-7 w-7 items-center justify-center rounded-full",
                                active
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-100 text-slate-400",
                              ].join(" ")}
                            >
                              {active ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Plus className="h-4 w-4" />
                              )}
                            </span>
                          </div>

                          <p className="mt-3 font-black text-slate-950">
                            {topping.name}
                          </p>

                          <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                            {topping.description}
                          </p>

                          <p className="mt-3 text-xs font-black text-orange-600">
                            {formatPizzaStudioMoney(topping.priceMinor)}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold">
                        {toppingIds.length} ingredient
                        {toppingIds.length === 1 ? "" : "s"} selected
                      </p>

                      <p className="text-xs text-white/60">
                        Limit{" "}
                        {selectedPreset?.maxToppings ??
                          PIZZA_STUDIO_CONFIG.maxCustomToppings}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {step === "extras" && (
                <div>
                  <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
                    {extraCategories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setExtraCategory(category)}
                        className={[
                          "whitespace-nowrap rounded-full px-4 py-2 text-xs font-black transition",
                          extraCategory === category
                            ? "bg-slate-950 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-orange-50",
                        ].join(" ")}
                      >
                        {pizzaStudioExtraCategoryLabels[category]}
                      </button>
                    ))}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {getPizzaStudioExtrasByCategory(extraCategory).map(
                      (item) => {
                        const active = extraIds.includes(item.id);

                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => toggleExtra(item.id)}
                            className={[
                              "rounded-2xl border p-4 text-left transition-all",
                              active
                                ? "border-orange-500 bg-orange-50 shadow-md"
                                : "border-slate-200 hover:border-orange-200 hover:shadow-md",
                            ].join(" ")}
                          >
                            <div className="flex items-center justify-between">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                {item.category === "natural-juice" ? (
                                  <Leaf className="h-5 w-5" />
                                ) : item.category === "park-treat" ? (
                                  <Sparkles className="h-5 w-5" />
                                ) : (
                                  <ShoppingBag className="h-5 w-5" />
                                )}
                              </span>

                              <span
                                className={[
                                  "flex h-7 w-7 items-center justify-center rounded-full",
                                  active
                                    ? "bg-orange-500 text-white"
                                    : "bg-slate-100 text-slate-400",
                                ].join(" ")}
                              >
                                {active ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Plus className="h-4 w-4" />
                                )}
                              </span>
                            </div>

                            <p className="mt-3 font-black text-slate-950">
                              {item.name}
                            </p>

                            <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                              {item.description}
                            </p>

                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-xs font-black text-orange-600">
                                {formatPizzaStudioMoney(item.priceMinor)}
                              </p>

                              {item.seasonal && (
                                <span className="text-[9px] font-black uppercase tracking-wider text-emerald-700">
                                  Seasonal
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              {step === "review" && (
                <div className="space-y-5">
                  <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-400">
                          Your Happy-Park creation
                        </p>

                        <h3 className="mt-2 text-2xl font-black">
                          {selectedSize?.name} Custom Pizza
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-white/60">
                          {selectedCrust?.name} · {selectedSauce?.name} ·{" "}
                          {selectedCheese?.name}
                        </p>
                      </div>

                      <Sparkles className="h-7 w-7 text-orange-400" />
                    </div>
                  </div>

                  <ReviewRow
                    label="Toppings"
                    value={
                      toppingIds.length
                        ? joinNames(toppingIds, pizzaStudioToppings)
                        : "No additional toppings"
                    }
                  />

                  <ReviewRow
                    label="Sides & drinks"
                    value={
                      extraIds.length
                        ? joinNames(extraIds, pizzaStudioExtras)
                        : "No extras selected"
                    }
                  />

                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Quantity
                      </p>
                      <p className="mt-1 font-bold text-slate-950">
                        How many pizzas?
                      </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-full bg-slate-100 p-1">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) => Math.max(1, current - 1))
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-7 text-center font-black">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((current) => current + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {hasUnconfirmedPrice && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <div className="flex gap-3">
                        <CircleDollarSign className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

                        <div>
                          <p className="font-black text-amber-950">
                            Final menu pricing pending
                          </p>

                          <p className="mt-1 text-sm leading-6 text-amber-800">
                            Your pizza can be designed and previewed now.
                            Ordering will activate when Happy-Park confirms
                            the final menu prices.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-5 sm:px-8">
              <button
                type="button"
                disabled={stepIndex === 0}
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {step !== "review" ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-orange-600"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={hasUnconfirmedPrice}
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Happy Cart
                </button>
              )}
            </div>
          </div>

          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="overflow-hidden rounded-[2rem] bg-[#07101f] text-white shadow-[0_30px_80px_rgba(15,23,42,0.24)]">
              <div className="relative overflow-hidden px-6 pb-8 pt-7">
                <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
                      Live Pizza Canvas
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Your pizza is coming alive.
                    </h2>
                  </div>

                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-white/70">
                    LIVE
                  </span>
                </div>

                <div className="relative mx-auto mt-8 aspect-square max-w-[330px]">
                  <div className="absolute inset-[3%] rounded-full bg-black/30 blur-xl" />

                  <div className="absolute inset-[7%] rounded-full border-[15px] border-[#b85d21] bg-[#e99a42] shadow-[inset_0_0_0_5px_rgba(255,255,255,0.10),0_24px_50px_rgba(0,0,0,0.35)]">
                    <div className="absolute inset-[5%] rounded-full bg-[#d94d2f]" />

                    <div className="absolute inset-[9%] rounded-full bg-[#f4d06f] shadow-inner" />

                    {toppingIds.map((id, index) => {
                      const visual = toppingVisuals[id] ?? {
                        symbol: "•",
                        className: "text-orange-800",
                      };

                      const position =
                        toppingPositions[index % toppingPositions.length];

                      return (
                        <span
                          key={id}
                          className={[
                            "absolute z-10 flex h-9 w-9 items-center justify-center text-2xl font-black drop-shadow-sm",
                            position,
                            visual.className,
                          ].join(" ")}
                        >
                          {visual.symbol}
                        </span>
                      );
                    })}
                  </div>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 shadow-xl">
                    {selectedSize?.inches}&quot; {selectedSize?.name}
                  </div>
                </div>

                <div className="relative mt-7 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg">
                      <ChefHat className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-orange-400">
                        Parky says
                      </p>

                      <p className="mt-1 text-sm leading-6 text-white/75">
                        {step === "size" &&
                          "Start with the size that matches your appetite."}

                        {step === "base" &&
                          "Every great pizza starts with a great foundation."}

                        {step === "toppings" &&
                          (toppingIds.length
                            ? `Nice! You have ${toppingIds.length} ingredient${
                                toppingIds.length === 1 ? "" : "s"
                              } on your creation.`
                            : "Now give your pizza some personality.")}

                        {step === "extras" &&
                          "Don't stop at pizza — make it a full Happy-Park meal."}

                        {step === "review" &&
                          "That looks good! Check everything before you finish."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-black/20 p-6">
                <div className="space-y-3 text-sm">
                  <SummaryLine
                    label="Pizza"
                    value={`${selectedSize?.name ?? "—"} · ${
                      selectedCrust?.name ?? "—"
                    }`}
                  />

                  <SummaryLine
                    label="Toppings"
                    value={`${toppingIds.length} selected`}
                  />

                  <SummaryLine
                    label="Extras"
                    value={`${extraIds.length} selected`}
                  />

                  <div className="border-t border-white/10 pt-3">
                    <SummaryLine
                      label="Studio total"
                      value={displayTotal}
                      strong
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white/[0.06] p-3">
                    <PackageCheck className="h-4 w-4 text-orange-400" />
                    <p className="mt-2 text-xs font-bold">Pickup</p>
                  </div>

                  <div className="rounded-xl bg-white/[0.06] p-3">
                    <Truck className="h-4 w-4 text-orange-400" />
                    <p className="mt-2 text-xs font-bold">
                      SLYDE Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ChoiceSection({
  icon,
  title,
  items,
  selectedId,
  onSelect,
}: {
  icon: React.ReactNode;
  title: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
    priceMinor: number | null;
  }>;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          {icon}
        </span>

        <h3 className="text-lg font-black text-slate-950">{title}</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const active = selectedId === item.id;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={[
                "rounded-2xl border p-4 text-left transition",
                active
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-slate-200 hover:border-orange-200",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-slate-950">{item.name}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <span
                  className={[
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    active
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-400",
                  ].join(" ")}
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                </span>
              </div>

              <p className="mt-3 text-xs font-black text-orange-600">
                {formatPizzaStudioMoney(item.priceMinor)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
        {value}
      </p>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "font-black" : "text-white/50"}>
        {label}
      </span>

      <span
        className={[
          "text-right",
          strong
            ? "text-base font-black text-orange-400"
            : "font-semibold text-white",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
