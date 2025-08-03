import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
import { Suspense } from "react";

export default function AppRouter() {
  const routes = useRoutes(appRoutes);

  return (
   <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full" />
      </div>
      }>
      {routes}
    </Suspense>
  );
}
