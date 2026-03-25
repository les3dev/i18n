// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type {TranslateFn} from "@les3dev/i18n";
import type {i18n} from "$lib/i18n";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            locale: "fr" | "en";
            translate: TranslateFn<typeof i18n>;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
