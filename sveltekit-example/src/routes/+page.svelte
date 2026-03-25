<script lang="ts">
    import {invalidateAll} from "$app/navigation";
    import {get_i18n_context} from "$lib/i18n/context.svelte";
    import type {Locale} from "$lib/i18n";

    let {data} = $props();

    const i18n = get_i18n_context();
</script>

<select
    name="locale"
    value={i18n.locale}
    onchange={async (e) => {
        const locale = e.currentTarget.value as Locale;
        i18n.locale = locale;
        await fetch(`/locale`, {
            body: JSON.stringify({locale}),
            method: "POST",
            headers: {
                "Context-Type": "application/json",
            },
        });
        await invalidateAll();
    }}
>
    <option value="fr" selected={i18n.locale === "fr"}>Français</option>
    <option value="en" selected={i18n.locale === "en"}>English</option>
</select>

<h1>{i18n.t("Bienvenue !")}</h1>
<p>{i18n.t("Bonjour {name}", "Alice")}</p>
<p>Server: {data.server_greeting}</p>
<button onclick={() => alert(i18n.t("Ça marche aussi en JS !"))}>{i18n.t("Commencer")}</button>
