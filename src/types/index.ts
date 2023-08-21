import type { MintKeys, Proof } from "@gandlaf21/cashu-ts"

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 

export type MessageCodeFormat = `${'E'| 'I'}${Digit}${Digit}${Digit}`

export type MessageCore = {
	code: MessageCodeFormat
	message: string
	
}

export type Message = MessageCore & {
	detail: string
	params?: unknown
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
