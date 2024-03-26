export type MutationTypes<T, K = unknown> = (
  onSuccess: (data: T) => void,
  onError: (data: string) => void,
) => (inputs?: K) => Promise<void>;
