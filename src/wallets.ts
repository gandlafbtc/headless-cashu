import { CashuMint, CashuWallet } from "@cashu/cashu-ts";
import { get } from "./storage/storage";
import { Mint } from "./types";

const wallets: Array<CashuWallet> = [] 


export const getWalletForMint = (mintUrl: string): CashuWallet | undefined => {
 let wallet = wallets.find(w=> w.mint.mintUrl===mintUrl)
 if(!wallet){
    const cashuMint = new CashuMint(mintUrl);
    const mints:  Array<Mint> = get("cashu-mints")
    const mint = mints.find(m=> m.url===mintUrl)
    if (mint) {
      
       wallet = new CashuWallet(cashuMint, mint?.keys)
       wallets.push(wallet)
      }
 }
 return wallet
}