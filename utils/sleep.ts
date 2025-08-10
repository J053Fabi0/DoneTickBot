export default function sleep(s: number): Promise<undefined> {
  return new Promise<undefined>((resolve) => setTimeout(resolve, s * 1000));
}
