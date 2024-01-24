import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const vanillaAPI = useSignal('http://localhost:3005/api_v1/vanilla/')
    const vanillaTitle = useSignal(undefined);
    const displayVanillaTitle = typeof vanillaTitle.value === 'string' ? JSON.stringify(vanillaTitle.value) : vanillaTitle.value;
    const displayVanillaTitleClean = displayVanillaTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayVanillaTitle);
        const res = await fetch(vanillaAPI.value);
        const data = await res.json();
        vanillaTitle.value = data.Title;
    });
    return (
        <div>{displayVanillaTitleClean}</div>
    );
});