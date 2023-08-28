import { add } from "../storage/storage";
import { Message, TopUpMessage, TopUpReqMessage } from "../types";
import { getWalletForMint } from "../wallets";
import { updateMintKeys } from "../walletUtils";
import { getMintByUrl } from "../storage/mintStorage";
import { MessageCode } from "../messages/messages";

export const getTopupInvoiceForAmount = async (
  mintUrl: string,
  amount: number,
): Promise<TopUpReqMessage | Message> => {
  try {
    const wallet = getWalletForMint(mintUrl);
    if (!wallet) {
      return {
        code: MessageCode.E103.code,
        message: MessageCode.E103.message,
        detail: `Error minting ${amount} sats at mint ${mintUrl}.`,
      };
    }
    const { pr: invoice, hash } = await wallet.requestMint(amount);
    return {
      code: MessageCode.I101.code,
      message: MessageCode.I101.message,
      detail: `minting ${amount} sats at mint ${mintUrl}`,
      params: {
        invoice,
        hash,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      code: MessageCode.E101.code,
      message: MessageCode.E101.message,
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
    const wallet = getWalletForMint(mintUrl);
    if (!wallet) {
      return {
        code: MessageCode.E103.code,
        message: MessageCode.E103.message,
        detail: `Error topping up ${amount} sats at mint ${mintUrl}.`,
      };
    }
    const { proofs, newKeys } = await wallet.requestTokens(
      amount,
      hash,
    );
    if (newKeys) {
      updateMintKeys(getMintByUrl(mintUrl), newKeys);
    }
    add("cashu-proofs", proofs);
    return {
      code: MessageCode.I102.code,
      message: MessageCode.I102.message,
      detail: `topped up ${amount} sats from mint ${mintUrl}`,
      params: {
        proofs,
        newKeys,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      code: MessageCode.E102.code,
      message: MessageCode.E102.message,
      detail: `Error topping up ${amount} sats from mint ${mintUrl}`,
    };
  }
};
