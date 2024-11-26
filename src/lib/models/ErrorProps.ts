interface ErrorProps<E extends Error = Error> {
  error: E & { digest?: string };
  reset: () => void;
}
