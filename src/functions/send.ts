import { getWalletForMint } from "../wallets";
import { Message } from "../types";
import { MessageCode } from "../messages/messages";
import { get, set } from "../storage/storage";
import { updateMintKeys } from "../walletUtils";
import { getMintByUrl } from "../storage/mintStorage";
import { getAmountForTokenSet } from "../utils";
import { getEncodedToken, type AmountPreference, Proof } from "@cashu/cashu-ts";

export const send = async (
  mintUrl: string,
  amount: number,
  splitPreference?: Array<AmountPreference>
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
    const mint = getMintByUrl(mintUrl)
    const { returnChange, send, newKeys } = await wallet.send(amount, get<Proof>("cashu-proofs").filter(p=> mint.keysets.includes(p.id)), splitPreference);
    if (newKeys) {
      updateMintKeys(getMintByUrl(mintUrl), newKeys);
    }

    set("cashu-proofs", [...returnChange, get<Proof>("cashu-proofs").filter(p=> !mint.keysets.includes(p.id))]);

    return {
      code: MessageCode.I104.code,
      message: MessageCode.I104.message,
      detail: `created sendable proofs ${getAmountForTokenSet(send)} sat`,
      params: {token: getEncodedToken({token:[{proofs: send, mint: mintUrl}]})}
    };
  } catch (error) {
    return Promise.resolve({
      code: MessageCode.E104.code,
      message: MessageCode.E104.message,
      detail: `error when creating sendable token`,
    });
  }
};
