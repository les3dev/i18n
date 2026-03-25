<script lang="ts">
    import {get_i18n_context} from "$lib/i18n/context.svelte";

    let {data} = $props();

    const i18n = get_i18n_context();
</script>

<select bind:value={i18n.locale}>
    <option value="fr">Français</option>
    <option value="en">English</option>
</select>

<h1>{i18n.t("Bienvenue !")}</h1>
<p>{i18n.t("Bonjour {name}", "Alice")}</p>
<p>Server: {data.server_greeting}</p>
<button>{i18n.t("Commencer")}</button>
