import { Message, MessageCodeFormat, MessageCore } from "../types";

class MessageCode {
  static E100: MessageCore = {
    code: "E100",
    message: "mint could not be added",
  };
  static I100: MessageCore = {
    code: "I100",
    message: "mint added",
  };
  static I101: MessageCore = {
    code: "I101",
    message: "invoice fetched from mint",
  };

  static E101: MessageCore = {
    code: "E101",
    message: "invoice could not be fetched from mint",
  };
  static I102: MessageCore = { code: "I102", message: "top up successful" };
  static E102: MessageCore = { code: "E102", message: "top up failed" };
  static I103: MessageCore = { code: "I103", message: "Ecash received" };
  static I104: MessageCore = { code: "I104", message: "Ecash sent" };
  static E103: MessageCore = { code: "E103", message: "Could not receive" };
}

export { MessageCode };
