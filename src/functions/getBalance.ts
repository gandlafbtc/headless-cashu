import { Proof } from "@cashu/cashu-ts"
import { getMintByUrl } from "../storage/mintStorage"
import { get } from "../storage/storage"
import { Mint } from "../types"

export const getBalance = (mintUrls?: Array<string>): number => {
    let balance = 0
    const mintsToCheck: Array<Mint> = []
    if (mintUrls?.length) {
        for (const mintUrl of mintUrls) {
            mintsToCheck.push(getMintByUrl(mintUrl))
        }
    }
    else {
        mintsToCheck.push(...get("cashu-mints")as Array<Mint>)
    }
    const proofs: Array<Proof> = get("cashu-proofs")
    for (const proof of proofs) {
        balance += mintsToCheck.find(m=>m.keysets.includes(proof.id))?proof.amount:0
    }
    return balance
}