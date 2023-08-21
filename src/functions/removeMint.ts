import { Message, Mint } from "../types";
import { getMints as get } from "../storage/mintStorage";
import { set } from "../storage/storage";

export const removeMint = (mintUrl: string): Message => {
    const mints  = get()
    const newMints =  mints.filter(m=> {m.url!=mintUrl})
    set('cashu-mints', newMints)
    return {
        code: "I000",
        message: 'Mint removed',
        detail: 'mint: '+ mintUrl
    }
};