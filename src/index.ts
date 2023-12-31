import { CashuMint, deriveKeysetId } from "@cashu/cashu-ts";
import { Message, Mint,TopUpMessage,TopUpReqMessage } from "./types";
import { addMint } from "./functions/addMint";
import { getMints } from "./functions/getMints";
import { removeMint } from "./functions/removeMint";
import { getTopupInvoiceForAmount, topup } from "./functions/topup";
import { getWalletForMint } from "./wallets";
import { getBalance } from "./functions/getBalance";
import { receive } from "./functions/receive";
import { send } from "./functions/send";
import { pay } from "./functions/pay";
import { parseInvoice } from "./functions/pay";


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
export {pay, parseInvoice, send, addMint, removeMint, getMints, topup, getTopupInvoiceForAmount, getWalletForMint, getBalance, receive };
