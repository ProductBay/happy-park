"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Navigation,
  Pizza,
  Truck,
} from "lucide-react";

type DeliveryCommunity = {
  id: string;
  name: string;
  description: string;
  position: {
    left: string;
    top: string;
  };
};

const communities: DeliveryCommunity[] = [
  {
    id: "treasure-beach",
    name: "Treasure Beach",
    description: "Happy-Park food delivery coverage toward the Treasure Beach corridor.",
    position: { left: "16%", top: "61%" },
  },
  {
    id: "malvern",
    name: "Malvern",
    description: "Serving the Malvern area within our planned southern St. Elizabeth zone.",
    position: { left: "33%", top: "28%" },
  },
  {
    id: "munro",
    name: "Munro",
    description: "Food delivery coverage around the Munro and surrounding communities.",
    position: { left: "30%", top: "44%" },
  },
  {
    id: "southfield",
    name: "Southfield",
    description: "Home of Happy-Park and the central hub for our local food delivery service.",
    position: { left: "44%", top: "57%" },
  },
  {
    id: "nain",
    name: "Nain",
    description: "Serving customers toward Nain within the Happy-Park delivery area.",
    position: { left: "57%", top: "37%" },
  },
  {
    id: "junction",
    name: "Junction",
    description: "Happy-Park delivery coverage extending through the Junction area.",
    position: { left: "58%", top: "53%" },
  },
  {
    id: "lititz",
    name: "Lititz",
    description: "Serving Lititz and nearby communities within our planned delivery zone.",
    position: { left: "72%", top: "57%" },
  },
  {
    id: "alligator-pond",
    name: "Alligator Pond",
    description: "Coverage extending east toward the Alligator Pond corridor.",
    position: { left: "81%", top: "72%" },
  },
];

export function FoodDeliveryZone() {
  const [activeCommunity, setActiveCommunity] =
    useState<DeliveryCommunity>(communities[3]);

  return (
    <section
      id="food-delivery-zone"
      className="relative overflow-hidden bg-[#071f19] py-16 text-white sm:py-20 lg:py-24"
    >
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
            <Truck className="h-4 w-4" />
            Happy-Park Food Delivery
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            From our kitchen
            <span className="block text-amber-300">
              to your community.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Explore the communities within our planned southern St. Elizabeth
            food delivery area, powered from our Happy-Park hub in Southfield.
          </p>
        </div>

        {/* Community selector */}
        <div className="mt-9 flex flex-wrap justify-center gap-2">
          {communities.map((community) => {
            const active = activeCommunity.id === community.id;

            return (
              <button
                key={community.id}
                type="button"
                onClick={() => setActiveCommunity(community)}
                onMouseEnter={() => setActiveCommunity(community)}
                onFocus={() => setActiveCommunity(community)}
                aria-pressed={active}
                className={[
                  "min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition",
                  "focus:outline-none focus:ring-4 focus:ring-amber-300/20",
                  active
                    ? "border-amber-300 bg-amber-300 text-[#08231b] shadow-lg shadow-amber-300/10"
                    : "border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {community.name}
              </button>
            );
          })}
        </div>

        {/* Main map card */}
        <div className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/30">
          <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.7fr)]">
            {/* Interactive map */}
            <div className="relative min-h-[390px] overflow-hidden bg-[#123f2d] sm:min-h-[500px] lg:min-h-[610px]">
              {/* Stylized terrain */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(circle at 32% 45%, rgba(126,180,74,.55), transparent 25%), radial-gradient(circle at 68% 38%, rgba(95,155,69,.5), transparent 28%), linear-gradient(145deg, #204e35 0%, #46733d 45%, #274d32 72%, #173828 100%)",
                }}
              />

              {/* Coast / Caribbean Sea */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-[24%] bg-gradient-to-b from-cyan-800/80 to-sky-950"
              />

              {/* Approximate delivery-zone outline */}
              <div
                aria-hidden="true"
                className="absolute left-[8%] right-[8%] top-[18%] bottom-[16%] rounded-[44%_36%_30%_38%] border-2 border-dashed border-amber-300/80 bg-amber-200/[0.07] shadow-[0_0_45px_rgba(252,211,77,0.12)]"
              />

              {/* decorative road paths */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full opacity-35"
              >
                <path
                  d="M120 380 C220 330 290 320 410 345 S610 300 820 420"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                />
                <path
                  d="M300 180 C350 240 390 280 440 345"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />
                <path
                  d="M570 220 C560 270 560 310 580 340"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />
                <path
                  d="M580 340 C670 350 730 360 820 420"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                />
              </svg>

              <div className="absolute left-5 top-5 z-20 rounded-2xl border border-white/10 bg-[#071f19]/85 px-4 py-3 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                  <Navigation className="h-4 w-4" />
                  Southern St. Elizabeth
                </div>
                <p className="mt-1 text-xs text-white/55">
                  Approximate delivery coverage
                </p>
              </div>

              {/* markers */}
              {communities.map((community) => {
                const active = activeCommunity.id === community.id;
                const isHub = community.id === "southfield";

                return (
                  <button
                    key={community.id}
                    type="button"
                    onMouseEnter={() => setActiveCommunity(community)}
                    onFocus={() => setActiveCommunity(community)}
                    onClick={() => setActiveCommunity(community)}
                    aria-label={`View ${community.name} delivery information`}
                    style={{
                      left: community.position.left,
                      top: community.position.top,
                    }}
                    className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  >
                    <span
                      className={[
                        "relative flex items-center justify-center rounded-full border-4 shadow-xl transition-all duration-300",
                        active
                          ? "h-12 w-12 scale-110 border-white bg-amber-400 text-[#08231b]"
                          : isHub
                            ? "h-11 w-11 border-white bg-orange-500 text-white"
                            : "h-8 w-8 border-white bg-amber-400 text-[#08231b]",
                      ].join(" ")}
                    >
                      {isHub ? (
                        <Pizza className="h-5 w-5" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                    </span>

                    <span
                      className={[
                        "absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-lg backdrop-blur-md transition",
                        active
                          ? "border-amber-300/40 bg-amber-300 text-[#08231b]"
                          : "border-white/10 bg-[#071f19]/90 text-white",
                      ].join(" ")}
                    >
                      {community.name}
                      {isHub ? " • HUB" : ""}
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-5 left-5 z-20 rounded-xl border border-white/10 bg-[#071f19]/80 px-3 py-2 text-[10px] font-semibold text-white/60 backdrop-blur-md">
                Illustrated service area • Final availability confirmed when ordering
              </div>
            </div>

            {/* Active community detail */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-9">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
                  Selected Community
                </p>

                <div className="mt-4 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-300 text-[#08231b]">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black">
                      {activeCommunity.name}
                    </h3>

                    {activeCommunity.id === "southfield" && (
                      <span className="mt-2 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                        Happy-Park Food Hub
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-5 leading-7 text-white/65">
                  {activeCommunity.description}
                </p>

                <div className="mt-7 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    Pizza & Happy-Park food favourites
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Truck className="h-5 w-5 shrink-0 text-emerald-400" />
                    Local delivery from Southfield
                  </div>

                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <Clock3 className="h-5 w-5 shrink-0 text-emerald-400" />
                    Availability confirmed during ordering
                  </div>
                </div>
              </div>

              <div className="mt-9">
                <Link
                  href="/food"
                  className="group flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-6 font-black text-[#08231b] shadow-lg shadow-amber-300/10 transition hover:-translate-y-0.5 hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300/20"
                >
                  Order Food
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="mt-3 text-center text-xs leading-5 text-white/40">
                  Delivery coverage shown is approximate. Your exact location
                  will be confirmed before an order is accepted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom service strip */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <Truck className="h-5 w-5 text-amber-300" />
            <p className="mt-2 font-black">Local Delivery</p>
            <p className="mt-1 text-sm text-white/50">
              Serving selected southern St. Elizabeth communities.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <Pizza className="h-5 w-5 text-amber-300" />
            <p className="mt-2 font-black">Happy-Park Food</p>
            <p className="mt-1 text-sm text-white/50">
              Build your order and explore Happy-Park favourites.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <MapPin className="h-5 w-5 text-amber-300" />
            <p className="mt-2 font-black">Southfield Hub</p>
            <p className="mt-1 text-sm text-white/50">
              Our home base at the heart of the delivery experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
