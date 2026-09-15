"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  clientTourSteps,
  type ClientTourStep,
} from "@/lib/client-tour/client-tour-steps";

const STORAGE_KEY = "happy-park-client-tour-v1";

type StoredTourState = {
  active: boolean;
  currentStep: number;
  completedSteps: string[];
  minimized: boolean;
  welcomeSeen: boolean;
};

type ClientTourContextValue = {
  ready: boolean;
  active: boolean;
  currentStepIndex: number;
  currentStep: ClientTourStep;
  completedSteps: string[];
  minimized: boolean;
  progress: number;
  startTour: () => void;
  exitTour: () => void;
  nextStep: () => void;
  previousStep: () => void;
  openCurrentExperience: () => void;
  continueAfterTesting: () => void;
  minimize: () => void;
  expand: () => void;
  restartTour: () => void;
};

const defaultState: StoredTourState = {
  active: false,
  currentStep: 0,
  completedSteps: [],
  minimized: false,
  welcomeSeen: false,
};

const ClientTourContext =
  createContext<ClientTourContextValue | null>(null);

function readStoredTourState(): StoredTourState {
  let initialState: StoredTourState = {
    ...defaultState,
  };

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(
        saved,
      ) as Partial<StoredTourState>;

      initialState = {
        ...defaultState,
        ...parsed,
        currentStep: Math.min(
          Math.max(parsed.currentStep ?? 0, 0),
          clientTourSteps.length - 1,
        ),
      };
    }
  } catch {
    initialState = {
      ...defaultState,
    };
  }

  const params = new URLSearchParams(
    window.location.search,
  );

  if (
    params.get("preview") === "client" &&
    !initialState.active
  ) {
    initialState = {
      ...initialState,
      active: true,
      currentStep:
        initialState.welcomeSeen
          ? initialState.currentStep
          : 0,
      minimized: false,
      welcomeSeen: true,
    };
  }

  return initialState;
}

export function ClientTourProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [state, setState] =
    useState<StoredTourState>(defaultState);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState(readStoredTourState());
      setReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state),
      );
    } catch {
      // Tour remains usable without persistent storage.
    }
  }, [ready, state]);

  const currentStep =
    clientTourSteps[state.currentStep] ??
    clientTourSteps[0];

  const markCurrentComplete = useCallback(() => {
    setState((current) => {
      const step =
        clientTourSteps[current.currentStep] ??
        clientTourSteps[0];

      if (current.completedSteps.includes(step.id)) {
        return current;
      }

      return {
        ...current,
        completedSteps: [
          ...current.completedSteps,
          step.id,
        ],
      };
    });
  }, []);

  const goToStep = useCallback(
    (index: number) => {
      const safeIndex = Math.min(
        Math.max(index, 0),
        clientTourSteps.length - 1,
      );

      const destination =
        clientTourSteps[safeIndex];

      setState((current) => ({
        ...current,
        currentStep: safeIndex,
        minimized: false,
      }));

      const destinationPath =
        destination.route.split("#")[0];

      if (
        destination.route &&
        destinationPath !== pathname
      ) {
        router.push(destination.route);
        return;
      }

      if (
        destination.route.includes("#")
      ) {
        const hash =
          destination.route.split("#")[1];

        window.requestAnimationFrame(() => {
          document
            .getElementById(hash)
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        });
      }
    },
    [pathname, router],
  );

  const startTour = useCallback(() => {
    setState((current) => ({
      ...current,
      active: true,
      currentStep: 0,
      minimized: false,
      welcomeSeen: true,
    }));
  }, []);

  const exitTour = useCallback(() => {
    setState((current) => ({
      ...current,
      active: false,
      minimized: false,
    }));
  }, []);

  const restartTour = useCallback(() => {
    setState({
      active: true,
      currentStep: 0,
      completedSteps: [],
      minimized: false,
      welcomeSeen: true,
    });

    router.push("/");
  }, [router]);

  const nextStep = useCallback(() => {
    markCurrentComplete();

    if (
      state.currentStep >=
      clientTourSteps.length - 1
    ) {
      setState((current) => ({
        ...current,
        active: false,
        minimized: false,
        completedSteps: Array.from(
          new Set([
            ...current.completedSteps,
            clientTourSteps[
              clientTourSteps.length - 1
            ].id,
          ]),
        ),
      }));

      router.push("/");
      return;
    }

    goToStep(state.currentStep + 1);
  }, [
    goToStep,
    markCurrentComplete,
    router,
    state.currentStep,
  ]);

  const previousStep = useCallback(() => {
    goToStep(state.currentStep - 1);
  }, [goToStep, state.currentStep]);

  const openCurrentExperience =
    useCallback(() => {
      markCurrentComplete();

      const route = currentStep.route;

      if (route) {
        const destinationPath =
          route.split("#")[0];

        if (destinationPath !== pathname) {
          router.push(route);
        } else if (route.includes("#")) {
          const hash = route.split("#")[1];

          window.requestAnimationFrame(() => {
            document
              .getElementById(hash)
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          });
        }
      }

      if (currentStep.mode === "workflow") {
        setState((current) => ({
          ...current,
          minimized: true,
        }));
      }
    }, [
      currentStep.mode,
      currentStep.route,
      markCurrentComplete,
      pathname,
      router,
    ]);

  const continueAfterTesting =
    useCallback(() => {
      markCurrentComplete();

      if (
        state.currentStep >=
        clientTourSteps.length - 1
      ) {
        setState((current) => ({
          ...current,
          active: false,
          minimized: false,
        }));

        router.push("/");
        return;
      }

      goToStep(state.currentStep + 1);
    }, [
      goToStep,
      markCurrentComplete,
      router,
      state.currentStep,
    ]);

  const minimize = useCallback(() => {
    setState((current) => ({
      ...current,
      minimized: true,
    }));
  }, []);

  const expand = useCallback(() => {
    setState((current) => ({
      ...current,
      minimized: false,
    }));
  }, []);

  const progress = Math.round(
    ((state.currentStep + 1) /
      clientTourSteps.length) *
      100,
  );

  const value = useMemo<ClientTourContextValue>(
    () => ({
      ready,
      active: ready && state.active,
      currentStepIndex: state.currentStep,
      currentStep,
      completedSteps: state.completedSteps,
      minimized: state.minimized,
      progress,
      startTour,
      exitTour,
      nextStep,
      previousStep,
      openCurrentExperience,
      continueAfterTesting,
      minimize,
      expand,
      restartTour,
    }),
    [
      ready,
      state,
      currentStep,
      progress,
      startTour,
      exitTour,
      nextStep,
      previousStep,
      openCurrentExperience,
      continueAfterTesting,
      minimize,
      expand,
      restartTour,
    ],
  );

  return (
    <ClientTourContext.Provider value={value}>
      {children}
    </ClientTourContext.Provider>
  );
}

export function useClientTour() {
  const context = useContext(ClientTourContext);

  if (!context) {
    throw new Error(
      "useClientTour must be used inside ClientTourProvider",
    );
  }

  return context;
}
