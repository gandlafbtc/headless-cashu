import { Mint } from "../types";
import { getMints as get } from "../storage/mintStorage";

export const getMints = (): Array<Mint> => {
    return get()
};