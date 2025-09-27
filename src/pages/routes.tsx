import { LoaderOne } from "@/components/ui/Loader";
import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// ------------------- Lazy Imports -------------------
const DashboardLayout = lazy(() => import("./layout/DashboardLayout"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const AuthPage = lazy(() => import("./auth/Login").then(m => ({ default: m.AuthPage })));
const Profile = lazy(() => import("./profile/Profile"));
const Settings = lazy(() => import("./settings/Settings"));
const Board = lazy(() => import("./board/Board"));
const TeamDashboard = lazy(() => import("./team/Team").then(m => ({ default: m.TeamDashboard })));
const HeroSectionOne = lazy(() => import("@/components/hero-section-demo-1"));

// ------------------- Suspense Wrapper -------------------
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoaderOne />}>
    <Component />
  </Suspense>
);

// ------------------- Root Route -------------------
const rootRoute = createRootRoute();

// Public auth route
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => withSuspense(AuthPage),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => withSuspense(HeroSectionOne),
});

// Dashboard layout route
const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => withSuspense(DashboardLayout),
});

// Children of DashboardLayout
const dashboardRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/",
  component: () => withSuspense(Dashboard),
});

const profileRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/profile",
  component: () => withSuspense(Profile),
});

const settingsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/settings",
  component: () => withSuspense(Settings),
});

const boardRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/board",
  component: () => withSuspense(Board),
});

const teamRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/team",
  component: () => withSuspense(TeamDashboard),
});

// Route tree
const routeTree = rootRoute.addChildren([
  authRoute,
  homeRoute,
  dashboardLayoutRoute.addChildren([
    dashboardRoute,
    profileRoute,
    settingsRoute,
    boardRoute,
    teamRoute,
  ]),
]);

// Router
export const router = createRouter({ routeTree });

// Extend module
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
