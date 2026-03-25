<script lang="ts">
    import {set_i18n_context} from "$lib/i18n/context.svelte";

    let {children} = $props();

    set_i18n_context(() => "fr");
</script>

{@render children()}
