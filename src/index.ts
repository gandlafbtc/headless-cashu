import { CashuMint, deriveKeysetId } from "@cashu/cashu-ts";
import { Message, Mint } from "./types";
import { add, initStorage } from "./storage/storage";
import { addMint } from "./functions/addMint";


// const topUp = async (paidInvoiceHash: string, mint?: string): Promise<Message> => {
// 	return
// }

// const cashuOut = async (mint?: string, amount?: number): Promise<Message> => {
// 	return
// }

// const send = async (mint?:string, amount?:number): Promise<Message> => {
// 	return
// }

// const receive = async (token:string): Promise<Message> => {
// 	return
// }

// const balance = async (mint?:string): Promise<Message> => {
// 	return
// }



// const getMints = (): Array<Mint> => {
// 	return
// }

// const getMintByUrl = (): Mint | undefined => {
// 	return
// }

export { addMint, initStorage };
