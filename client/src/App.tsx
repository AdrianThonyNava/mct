import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

// Base path for GitHub Pages
const basePath = import.meta.env.DEV ? "" : "/menstrual-cycle-tracker";

function AppRouter() {
  return (
    <WouterRouter base={basePath}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;