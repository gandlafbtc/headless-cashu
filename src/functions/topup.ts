import { add } from "../storage/storage";
import { Message, TopUpMessage, TopUpReqMessage } from "../types";
import { getWallet } from "../wallets";
import { updateMintKeys } from "../walletUtils";
import { getMintByUrl } from "../storage/mintStorage";

export const getTopupInvoiceForAmount = async (
  mintUrl: string,
  amount: number,
): Promise<TopUpReqMessage | Message> => {
  try {
    const wallet = getWallet(mintUrl);
    const { pr: invoice, hash } = await wallet.requestMint(amount);
    return {
      code: "I101",
      message: "invoice fetched from mint",
      detail: `minting ${amount} sats at mint ${mintUrl}`,
      params: {
        invoice,
        hash,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      code: "E101",
      message: "invoice could not be fetched from mint",
      detail: `Error minting ${amount} sats at mint ${mintUrl}`,
    };
  }
};

export const topup = async (
  mintUrl: string,
  amount: number,
  hash: string,
): Promise<TopUpMessage | Message> => {
  try {
    const wallet = getWallet(mintUrl);
    const { proofs, newKeys } = await wallet.requestTokens(
      amount,
      hash,
    );
    if (newKeys) {
      updateMintKeys(getMintByUrl(mintUrl), newKeys);
    }
    add("cashu-proofs", proofs);
    return {
      code: "I102",
      message: "top up successful",
      detail: `topped up ${amount} sats from mint ${mintUrl}`,
      params: {
        proofs,
        newKeys,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      code: "E102",
      message: "top up failed",
      detail: `Error topping up ${amount} sats from mint ${mintUrl}`,
    };
  }
};
