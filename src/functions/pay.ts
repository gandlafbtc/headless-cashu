import {
  AmountPreference,
  CashuMint,
  getDecodedLnInvoice,
  Proof,
} from "@cashu/cashu-ts";
import { getWalletForMint } from "../wallets";
import { add, get, set } from "../storage/storage";
import { getMintByUrl } from "../storage/mintStorage";
import { updateMintKeys } from "../walletUtils";
import { Message } from "../types";
import { MessageCode } from "../messages/messages";

export const parseInvoice = async (
  mintUrl: string,
  invoice: string,
): Promise<{ amount: number; fee: number }> => {
  try {
    const { fee } = await CashuMint.checkFees(mintUrl, { pr: invoice });
    const amount = getDecodedLnInvoice(invoice).sections[2].value / 1000;

    return {
      amount,
      fee,
    };
  } catch {
    throw new Error("");
  }
};

export const pay = async (
  mintUrl: string,
  invoice: string,
  amount: number,
  fee: number,
  splitPreference?: Array<AmountPreference>,
): Promise<Message> => {
  try {
    const wallet = await getWalletForMint(mintUrl);
    if (!wallet) {
      throw new Error("no wallet for mint");
    }
    const mint = getMintByUrl(mintUrl);
    const { returnChange, send, newKeys } = await wallet.send(
      amount + fee,
      get<Proof>("cashu-proofs").filter((p) => mint.keysets.includes(p.id)),
      splitPreference,
    );

    set("cashu-proofs", [
      ...returnChange,
      ...get<Proof>("cashu-proofs").filter((p) => !mint.keysets.includes(p.id)),
    ]);

    if (newKeys) {
      updateMintKeys(getMintByUrl(mintUrl), newKeys);
    }
    const { isPaid, change, newKeys: nk } = await wallet.payLnInvoice(
      invoice,
      send,
    );
    if (nk) {
      updateMintKeys(getMintByUrl(mintUrl), nk);
    }

    if (isPaid) {
      add("cashu-proofs", [change]);
      return {
        code: MessageCode.I105.code,
        message: MessageCode.I105.message,
        detail: `Invoice paid with mint ${mintUrl}`,
      };
    }

    add("cashu-proofs", [...send, ...change]);
    return {
      code: MessageCode.E105.code,
      message: MessageCode.E105.message,
      detail: `Invoice could not be paid with mint ${mintUrl}`,
    };
  } catch {
    throw new Error("");
  }
};
