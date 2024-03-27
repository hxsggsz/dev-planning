export type MutationTypes<T, K = undefined> = (
  onSuccess: (data: T) => void,
  onError: (data: string) => void,
) => K extends undefined
  ? (inputs?: K) => Promise<void>
  : (inputs: K) => Promise<void>;
