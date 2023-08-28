import { CashuWallet, getDecodedToken,  } from "@cashu/cashu-ts";
import { getWalletForMint } from "../wallets";
import { Message } from "../types";
import { MessageCode } from "../messages/messages";
import { add, get, set } from "../storage/storage";
import { updateMintKeys } from "../walletUtils";
import { getMintByUrl } from "../storage/mintStorage";
import { getAmountForTokenSet } from "../utils";

export const send = async (
  mintUrl: string,
  amount: number,
): Promise<Message> => {
  const wallet = getWalletForMint(mintUrl);
  if (!wallet) {
    return Promise.resolve({
      code: MessageCode.E103.code,
      message: MessageCode.E103.message,
      detail: `Mint ${mintUrl} is not addedd`,
    });
  }
  try {
    const { returnChange, send, newKeys } = await wallet.send(amount, get("cashu-proofs"));
    if (newKeys) {
      updateMintKeys(getMintByUrl(mintUrl), newKeys);
    }
    
    set("cashu-proofs", returnChange);

    return {
      code: MessageCode.I104.code,
      message: MessageCode.I104.message,
      detail: `created sendable proofs ${getAmountForTokenSet(send)} sat`,
      params: {proofs: send}
    };
  } catch (error) {
    return Promise.resolve({
      code: MessageCode.E103.code,
      message: MessageCode.E103.message,
      detail: `Mint ${mintUrl} is not addedd`,
    });
  }
};
