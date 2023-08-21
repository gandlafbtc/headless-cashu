import { CashuMint, deriveKeysetId } from "@gandlaf21/cashu-ts";
import { Message, Mint } from "../types";
import { add } from "../storage/storage";
import { MessageCode } from "../messages/messages";

export const addMint = async (url: string): Promise<Message> => {
    const cashuMint = new CashuMint(url);
    try {
      const keys = await cashuMint.getKeys();
      const keyset = deriveKeysetId(keys);
      const mint: Mint = {
        url,
        keys,
        keysets: [keyset],
      };
      add("cashu-mints", [mint]);
      return {
        code: MessageCode.I100.code,
        message:  MessageCode.I100.message,
        detail: "Mint url: " + url,
      }
    } catch (error) {
      console.error(error);
      return {
        code: MessageCode.E100.code,
        message: MessageCode.E100.message,
        detail: "Mint url: " + url,
      };
    }
  };