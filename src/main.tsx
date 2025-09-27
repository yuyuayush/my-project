import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "@tanstack/react-router";
import { router } from './pages/routes.tsx';
import { Toaster } from "sonner";

import { ErrorBoundary } from './pages/errorBoundary/ErrorBoundary.tsx';
import Loading from './components/Loader/Loading.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary  >
      <Suspense
        fallback={<Loading/>}
      >

        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </Suspense>
    </ErrorBoundary>
  </StrictMode >,
)
