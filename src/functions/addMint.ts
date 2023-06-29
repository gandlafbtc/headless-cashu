import { CashuMint, deriveKeysetId } from "@cashu/cashu-ts";
import { Message, Mint } from "../types";
import { add } from "../storage/storage";

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
        code: "I100",
        message: "mint added",
        detail: "Mint url: " + url,
      }
    } catch (error) {
      console.error(error);
      return {
        code: "E100",
        message: "mint could not be added",
        detail: "Mint url: " + url,
      };
    }
  };