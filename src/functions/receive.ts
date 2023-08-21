import { CashuWallet, getDecodedToken,  } from "@gandlaf21/cashu-ts";
import { getWalletForMint } from "../wallets";
import { Message } from "../types";
import { MessageCode } from "../messages/messages";
import { add } from "../storage/storage";
import { updateMintKeys } from "../walletUtils";
import { getMintByUrl } from "../storage/mintStorage";
import { getAmountForTokenSet } from "../utils";

export const receive = async (
  tokenString: string,
  mintUrl?: string,
): Promise<Message> => {
  if (!mintUrl) {
    mintUrl= getDecodedToken(tokenString).token[0].mint
  }
  const wallet = getWalletForMint(mintUrl);
  if (!wallet) {
    return Promise.resolve({
      code: MessageCode.E103.code,
      message: MessageCode.E103.message,
      detail: `Mint ${mintUrl} is not addedd`,
    });
  }
  try {
    const { token, tokensWithErrors, newKeys } = await wallet.receive(
      tokenString,
    );
    if (tokensWithErrors) {
      console.error(tokensWithErrors.token);
    }
    if (newKeys) {
      updateMintKeys(getMintByUrl(mintUrl), newKeys);
    }
    const received = token.token.map((t) => t.proofs).flat();
    add("cashu-proofs", received);

    return {
      code: MessageCode.I103.code,
      message: MessageCode.I103.message,
      detail: `received ${getAmountForTokenSet(received)} sat`,
    };
  } catch (error) {
    return Promise.resolve({
      code: MessageCode.E103.code,
      message: MessageCode.E103.message,
      detail: `Mint ${mintUrl} is not addedd`,
    });
  }
};
