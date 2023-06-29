import { Mint } from "../types";

type StorageKey = "cashu-mints" | "cashu-proofs";

const initStorage = () => {
  localStorage.getItem("cashu-mints")
    ? undefined
    : localStorage.setItem("cashu-mints", "[]");
  localStorage.getItem("cashu-proofs")
    ? undefined
    : localStorage.setItem("cashu-proofs", "[]");
};

const add = <T>(key: StorageKey, o: Array<T>) => {
  const parsed: Array<T> = get(key)
  parsed.push(...o);
  const stringToStore = JSON.stringify(parsed);
  localStorage.setItem(key, stringToStore);
};

const remove = <T>(key: StorageKey, o: Array<T>) => {
  const parsed: Array<T> = get(key)
  const removed = parsed.filter((p) => !o.includes(p));
  const stringToStore = JSON.stringify(removed);
  localStorage.setItem(key, stringToStore);
};

const get = <T>(key: StorageKey): Array<T> => {
  const storedString = localStorage.getItem(key);
  if (!storedString) {
    throw new Error('could not get element from local storage with key: '+ key)
  }
  return JSON.parse(storedString);
};

const set = <T>(key: StorageKey, all: Array<T>) => {
  localStorage.setItem(key, JSON.stringify(all));
}

export {get, add, remove, initStorage, set}