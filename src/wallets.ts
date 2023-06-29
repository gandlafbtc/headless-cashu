import { CashuMint, CashuWallet } from "@cashu/cashu-ts";
import { get } from "./storage/storage";
import { Mint } from "./types";

const wallets: Array<CashuWallet> = [] 


export const getWallet = (mintUrl: string): CashuWallet => {
 let wallet = wallets.find(w=> w.mint.mintUrl===mintUrl)
 if(!wallet){
    const cashuMint = new CashuMint(mintUrl);
    const mints:  Array<Mint> = get("cashu-mints")
    const mint = mints.find(m=> m.url===mintUrl)
    wallet = new CashuWallet(cashuMint, mint?.keys)
    wallets.push(wallet)
 }
 return wallet
}