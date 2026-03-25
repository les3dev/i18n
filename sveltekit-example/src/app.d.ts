// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {translate} from "$lib/i18n";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            locale: "fr" | "en";
            translate: typeof translate;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
