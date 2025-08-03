import { useLoadingSelector } from "@/hooks/useLoadingSelector";
import Spinner from "./Spinner";

interface WithLoadingProps {
  sliceKey: keyof ReturnType<typeof import("@/store").store.getState>;
  children: React.ReactNode;
}

export default function WithLoading({ sliceKey, children }: WithLoadingProps) {
  const isLoading = useLoadingSelector(sliceKey);

  return (
    <>
      <Spinner open={isLoading} />
      {children}
    </>
  );
}
