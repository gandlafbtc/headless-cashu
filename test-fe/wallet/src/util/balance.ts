import { writable } from "svelte/store";
import { getBalance, getMints } from "../../../../dist/lib/es6";
import { get } from "../../../../dist/lib/es6/storage/storage";

export const balance = writable<number>(getBalance())
export const mintBalance = writable<number>(getBalance([getMints()[0].url]))
