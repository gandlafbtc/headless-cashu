import type { MintKeys, Proof } from "@cashu/cashu-ts"

type Message = {
	code: string
	message: string
	detail: string
}

type TopUpReqMessage = Message & {
	params: {
		hash: string
		invoice: string
	}
} 

type TopUpMessage = Message & {
	params: {
		proofs: Array<Proof>
		newKeys?: MintKeys 
	}
} 

type Mint = {
	url: string
	keys: MintKeys
	keysets: Array<string>
}

export type {Message, TopUpReqMessage, TopUpMessage , Mint}