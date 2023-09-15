import { writable } from "svelte/store";
import { getBalance } from "../../../../dist/lib/es6";

export const balance = writable<number>(getBalance())

