import { useAppSelector } from '@/store/hooks';

export function useLoadingSelector(sliceKey: keyof ReturnType<typeof import('@/store').store.getState>) {
  return useAppSelector((state) => state[sliceKey]?.loading ?? false);
}
