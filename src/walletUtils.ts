
// import { deriveKeysetId, type MintKeys, type Proof } from '@cashu/cashu-ts';
// import { Mint } from './types';

import { MintKeys, deriveKeysetId } from "@cashu/cashu-ts";
import { Mint } from "./types";
import { get, set } from "./storage/storage";

// /**
//  * returns a subset of proofs, so that not all proofs are sent to mint for smaller amounts.
//  * @param amount
//  * @param proofs
//  * @returns
//  */
// const getproofsToSend = (amount: number, proofs: Array<Proof>) => {
// 	let proofAmount = 0;
// 	const proofSubset = proofs.filter((proof) => {
// 		if (proofAmount < amount) {
// 			proofAmount += proof.amount;
// 			return true;
// 		}
// 	});
// 	return proofSubset;
// };

// const validateMintKeys = (keys: object): boolean => {
// 	let isValid = true;
// 	try {
// 		const allKeys = Object.keys(keys);

// 		if (!allKeys) {
// 			return false;
// 		}

// 		if (allKeys.length < 1) {
// 			return false;
// 		}
// 		allKeys.forEach((k) => {
// 			//try parse int?
// 			if (isNaN(k)) {
// 				isValid = false;
// 			}
// 			if (!isPow2(k)) {
// 				isValid = false;
// 			}
// 		});
// 		return isValid;
// 	} catch (error) {
// 		return false;
// 	}
// };

// const isPow2 = (number: number) => {
// 	return Math.log2(number) % 1 === 0;
// };

// /**
//  * returns a subset of all proofs that belong to the specified mint
//  * @param mint
//  * @param proofs
//  * @returns
//  */
// const getproofsForMint = (mint: Mint, proofs: Array<Proof>) => {
// 	const proofSubset = proofs.filter((proof) => {
// 		if (mint?.keysets.includes(proof.id)) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	});
// 	return proofSubset;
// };

// const isValidproof = (obj: any) => {
// 	// todo implement
// 	return true;
// };

// /**
//  * removes a set of proofs from another set of proofs, and returns the remaining.
//  * @param proofs
//  * @param proofsToRemove
//  * @returns
//  */
// const getproofSubset = (proofs: Array<Proof>, proofsToRemove: Array<Proof>) => {
// 	return proofs.filter((proof) => !proofsToRemove.includes(proof));
// };

// const getMintForProof = (proof: Proof, mints: Array<Mint>): Mint | undefined => {
// 	let mint: Mint | undefined = undefined;
// 	mints.forEach((m) => {
// 		if (m.keysets.includes(proof.id)) {
// 			mint = m;
// 		}
// 	});
// 	return mint;
// };

export const updateMintKeys = (mint: Mint, newKeys: MintKeys) => {
	const allMints: Array<Mint> = get("cashu-mints");
	const toBeUpdated = allMints.find((m) => mint.url === m.url);
	if (!toBeUpdated) {
		throw new Error('could not update mint keys');
	}
	toBeUpdated.keys = newKeys;
	const newKeyset = deriveKeysetId(newKeys);
	toBeUpdated.keysets = [newKeyset, ...toBeUpdated.keysets];
	set("cashu-mints", allMints);
};

// const getAmountForProofSet = (proofs: Array<Proof>): number => {
// 	return proofs.reduce((acc, t) => {
// 		return acc + t.amount;
// 	}, 0);
// };

// const getKeysetsOfProofs = (proofs: Array<Proof>) => {
// 	return removeDuplicatesFromArray(
// 		proofs.map((t) => {
// 			return t.id;
// 		})
// 	);
// };

// const removeDuplicatesFromArray = <Type>(array: Array<Type>) => {
// 	return array.reduce((acc: Array<Type>, curr: Type) => {
// 		if (acc.includes(curr)) {
// 			return acc;
// 		} else {
// 			return [...acc, curr];
// 		}
// 	}, []);
// };

// export {
// 	getMintForProof,
// 	getproofsToSend,
// 	getproofsForMint,
// 	getproofSubset,
// 	getAmountForProofSet,
// 	getKeysetsOfProofs,
// 	removeDuplicatesFromArray,
// 	isValidproof,
// 	validateMintKeys
// };
