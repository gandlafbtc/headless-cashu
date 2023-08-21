import { Mint } from "../types";
import { get } from "./storage";

const getMintByUrl = (url: string): Mint => {
  const mints: Array<Mint> = get("cashu-mints")
  const mint = mints.find(m=> m.url===url)
  if (!mint) {
      throw new Error('could not get mint by url: '+ url)
  }
  return mint
};
const getMints = (): Array<Mint>  => {
  let mints: Array<Mint> = get("cashu-mints")
  if (!mints) {
    mints = []
  }
  return mints
};

export {getMintByUrl, getMints}