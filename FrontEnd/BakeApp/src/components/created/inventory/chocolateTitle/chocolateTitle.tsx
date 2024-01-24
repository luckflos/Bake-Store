import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const chocolateAPI = useSignal('http://localhost:3005/api_v1/chocolate/')
    const chocolateTitle = useSignal(undefined);
    const displayChocolateTitle = typeof chocolateTitle.value === 'string' ? JSON.stringify(chocolateTitle.value) : chocolateTitle.value;
    const displayChocolateTitleClean = displayChocolateTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayChocolateTitle);
        const res = await fetch(chocolateAPI.value);
        const data = await res.json();
        chocolateTitle.value = data.Title;
    });
    return (
        <div>{displayChocolateTitleClean}</div>
    );
});