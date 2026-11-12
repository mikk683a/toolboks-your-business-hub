import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LegalPage from "./pages/LegalPage";
import TradesIndex from "./pages/TradesIndex";
import TradePage from "./pages/TradePage";
import FeaturePage from "./pages/FeaturePage";
import ToolsIndex from "./pages/ToolsIndex";
import TimeprisTool from "./pages/tools/TimeprisTool";
import DaekningsgradTool from "./pages/tools/DaekningsgradTool";
import AdminTidTool from "./pages/tools/AdminTidTool";
import { FEATURE_PAGES } from "./lib/features";

const queryClient = new QueryClient();

/** Scroll to top on client side navigation, unless the link points at an anchor. */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

/** All routes. Shared by the browser app and the build time prerender. */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/brancher" element={<TradesIndex />} />
    <Route path="/brancher/:slug" element={<TradePage />} />
    {FEATURE_PAGES.map((f) => (
      <Route key={f.slug} path={`/funktioner/${f.slug}`} element={<FeaturePage slug={f.slug} />} />
    ))}
    <Route path="/vaerktoej" element={<ToolsIndex />} />
    <Route path="/vaerktoej/timepris" element={<TimeprisTool />} />
    <Route path="/vaerktoej/daekningsgrad" element={<DaekningsgradTool />} />
    <Route path="/vaerktoej/admin-tid" element={<AdminTidTool />} />
    <Route path="/privatliv" element={<LegalPage title="Privatlivspolitik" path="/privatliv" />} />
    <Route path="/vilkaar" element={<LegalPage title="Vilkår" path="/vilkaar" />} />
    <Route path="/databehandleraftale" element={<LegalPage title="Databehandleraftale" path="/databehandleraftale" />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
