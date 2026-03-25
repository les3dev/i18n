<script lang="ts">
    import {set_i18n_context} from "$lib/i18n/context.svelte";

    let {data, children} = $props();

    set_i18n_context(() => data.locale);
</script>

{@render children()}
