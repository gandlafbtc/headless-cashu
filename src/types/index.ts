import type { MintKeys, Proof } from "@cashu/cashu-ts"

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 

export type MessageCodeFormat = `${'E'| 'I'}${Digit}${Digit}${Digit}`

export type MessageCore = {
	code: MessageCodeFormat
	message: string
	
}

export type Message = MessageCore & {
	detail: string
	params?: {token?: string}
}

export type TopUpReqMessage = Message & {
	params: {
		hash: string
		invoice: string
	}
} 

export type TopUpMessage = Message & {
	params: {
		proofs: Array<Proof>
		newKeys?: MintKeys 
	}
} 

export type Mint = {
	url: string
	keys: MintKeys
	keysets: Array<string>
}
