"use client";

type FoodItemIllustrationProps = {
  id: string;
  className?: string;
};

export function FoodItemIllustration({
  id,
  className = "",
}: FoodItemIllustrationProps) {
  if (id === "happy-fries") {
    return (
      <div className={`relative h-28 w-28 ${className}`}>
        <div className="absolute bottom-1 left-1/2 h-16 w-20 -translate-x-1/2 rounded-b-2xl rounded-t-md bg-red-600 shadow-lg">
          <div className="absolute inset-x-0 top-3 text-center text-xl text-white">
            ☺
          </div>
          <div className="absolute bottom-2 inset-x-0 text-center text-[8px] font-black text-yellow-200">
            HAPPY-PARK
          </div>
        </div>

        {[
          [18, 5, -10],
          [30, 0, 6],
          [43, 4, -4],
          [55, 1, 8],
          [67, 7, -7],
          [40, 15, 12],
        ].map(([left, top, rotate], index) => (
          <div
            key={index}
            className="absolute h-16 w-3 rounded-full bg-gradient-to-b from-yellow-200 to-amber-400 shadow"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              rotate: `${rotate}deg`,
            }}
          />
        ))}
      </div>
    );
  }

  if (id === "garlic-bread") {
    return (
      <div className={`relative h-28 w-32 ${className}`}>
        <div className="absolute bottom-3 left-3 h-14 w-24 rotate-[-8deg] rounded-[45%_45%_35%_35%] border-4 border-amber-600 bg-gradient-to-br from-yellow-200 via-amber-200 to-orange-300 shadow-lg">
          <div className="absolute left-4 top-3 h-1.5 w-1.5 rounded-full bg-green-600" />
          <div className="absolute left-10 top-7 h-1.5 w-1.5 rounded-full bg-green-600" />
          <div className="absolute right-5 top-4 h-1.5 w-1.5 rounded-full bg-green-600" />
          <div className="absolute inset-x-3 top-1/2 h-1 rounded-full bg-yellow-100/80" />
        </div>

        <div className="absolute right-1 top-5 h-12 w-20 rotate-[8deg] rounded-[45%_45%_35%_35%] border-4 border-amber-600 bg-gradient-to-br from-yellow-200 to-orange-300 shadow-md">
          <div className="absolute left-4 top-3 h-1.5 w-1.5 rounded-full bg-green-600" />
          <div className="absolute right-4 top-6 h-1.5 w-1.5 rounded-full bg-green-600" />
        </div>
      </div>
    );
  }

  if (id === "chicken-bites") {
    return (
      <div className={`relative h-28 w-32 ${className}`}>
        <div className="absolute bottom-3 left-4 h-16 w-24 rounded-[50%] bg-white shadow-lg" />

        {[
          [28, 31, -8],
          [46, 21, 9],
          [62, 34, -4],
          [38, 48, 7],
          [55, 52, -10],
        ].map(([left, top, rotate], index) => (
          <div
            key={index}
            className="absolute h-8 w-9 rounded-[45%_55%_50%_45%] border-2 border-orange-600 bg-gradient-to-br from-amber-300 to-orange-500 shadow"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              rotate: `${rotate}deg`,
            }}
          />
        ))}

        <div className="absolute bottom-4 right-3 h-8 w-8 rounded-full border-4 border-white bg-red-500 shadow" />
      </div>
    );
  }

  if (id === "fruit-cup") {
    return (
      <div className={`relative h-28 w-24 ${className}`}>
        <div className="absolute bottom-1 left-1/2 h-20 w-20 -translate-x-1/2 rounded-b-3xl border-2 border-white/80 bg-cyan-100/50 shadow-lg backdrop-blur">
          <div className="absolute left-2 top-2 h-6 w-6 rounded-md bg-yellow-300" />
          <div className="absolute left-8 top-1 h-6 w-6 rounded-full bg-red-500" />
          <div className="absolute right-1 top-4 h-6 w-6 rounded-md bg-orange-400" />
          <div className="absolute left-4 top-9 h-6 w-6 rounded-full bg-lime-500" />
          <div className="absolute right-4 top-10 h-5 w-5 rounded-full bg-purple-700" />

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-2 py-1 text-[8px] font-black text-white">
            HAPPY
          </div>
        </div>
      </div>
    );
  }

  if (id === "fruit-punch") {
    return (
      <div className={`relative h-32 w-20 ${className}`}>
        <div className="absolute left-1/2 top-0 h-11 w-2 -translate-x-1/2 rotate-[7deg] rounded-full bg-gradient-to-b from-white via-red-500 to-white" />

        <div className="absolute bottom-1 left-1/2 h-24 w-16 -translate-x-1/2 rounded-b-2xl rounded-t-xl border-2 border-white/70 bg-gradient-to-b from-red-400 to-red-600 shadow-xl">
          <div className="absolute inset-x-0 top-1 h-5 rounded-t-xl bg-white/25" />

          <div className="absolute bottom-7 inset-x-0 text-center text-xl text-white">
            ☺
          </div>

          <div className="absolute bottom-3 inset-x-0 text-center text-[7px] font-black text-white">
            HAPPY-PARK
          </div>
        </div>
      </div>
    );
  }

  if (id === "water") {
    return (
      <div className={`relative h-32 w-16 ${className}`}>
        <div className="absolute left-1/2 top-0 h-5 w-8 -translate-x-1/2 rounded-t-lg bg-blue-600" />

        <div className="absolute bottom-1 left-1/2 h-27 w-14 -translate-x-1/2 rounded-[35%_35%_20%_20%] border-2 border-blue-200 bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg">
          <div className="absolute left-1/2 top-9 -translate-x-1/2 rounded-full bg-blue-600 px-2 py-1 text-[8px] font-black text-white">
            HP
          </div>
        </div>
      </div>
    );
  }

  if (id === "soda") {
    return (
      <div className={`relative h-32 w-20 ${className}`}>
        <div className="absolute left-1/2 top-0 h-9 w-2 -translate-x-1/2 rotate-[6deg] bg-red-500" />

        <div className="absolute bottom-1 left-1/2 h-24 w-16 -translate-x-1/2 rounded-b-xl rounded-t-lg border-2 border-white/60 bg-gradient-to-b from-red-700 to-red-900 shadow-lg">
          <div className="absolute inset-x-0 top-0 h-3 rounded-t-lg bg-white/85" />

          <div className="absolute top-9 inset-x-0 text-center text-xs font-black italic text-white">
            FIZZ
          </div>

          <div className="absolute bottom-3 inset-x-0 text-center text-[7px] font-bold text-white/80">
            HAPPY-PARK
          </div>
        </div>
      </div>
    );
  }

  if (id === "juice") {
    return (
      <div className={`relative h-28 w-20 ${className}`}>
        <div className="absolute bottom-1 left-1/2 h-22 w-16 -translate-x-1/2 rounded-lg bg-gradient-to-b from-yellow-300 to-orange-400 shadow-lg">
          <div className="absolute -top-6 right-3 h-10 w-2 rotate-[8deg] rounded-full bg-red-500" />

          <div className="absolute left-1/2 top-5 -translate-x-1/2 text-2xl">
            🍊
          </div>

          <div className="absolute bottom-2 inset-x-0 text-center text-[7px] font-black text-red-700">
            HAPPY JUICE
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-4xl ${className}`}>
      🍴
    </div>
  );
}
