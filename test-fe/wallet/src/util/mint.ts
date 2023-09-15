import { writable } from "svelte/store";
import { getMints, type Mint } from "../../../../dist/lib/es6";

export const activeMint = writable<Mint>(getMints()[0])