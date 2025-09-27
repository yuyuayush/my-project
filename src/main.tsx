import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "@tanstack/react-router";
import { router } from './pages/routes.tsx';
import { Toaster } from "sonner";

import { ErrorBoundary } from './pages/errorBoundary/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary  >
      <Suspense
        fallback={<div className='w-full h-screen flex justify-center items-center' ><p className='text-3xl font-bold'>Loading...</p></div>}
      >

        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </Suspense>
    </ErrorBoundary>
  </StrictMode >,
)
