import { CashuMint, deriveKeysetId } from "@gandlaf21/cashu-ts";
import { Message, Mint,TopUpMessage,TopUpReqMessage } from "./types";
import { initStorage } from "./storage/storage";
import { addMint } from "./functions/addMint";
import { getMints } from "./functions/getMints";
import { removeMint } from "./functions/removeMint";
import { getTopupInvoiceForAmount, topup } from "./functions/topup";
import { getWalletForMint } from "./wallets";
import { getBalance } from "./functions/getBalance";
import { receive } from "./functions/receive";


// const topUp = async (paidInvoiceHash: string, mint?: string): Promise<Message> => {
// 	return
// }

// const cashuOut = async (mint?: string, amount?: number): Promise<Message> => {
// 	return
// }

// const send = async (mint?:string, amount?:number): Promise<Message> => {
// 	return
// }




export type * from './types/index.js';
export { addMint, removeMint, getMints, initStorage, topup, getTopupInvoiceForAmount, getWalletForMint, getBalance, receive };
