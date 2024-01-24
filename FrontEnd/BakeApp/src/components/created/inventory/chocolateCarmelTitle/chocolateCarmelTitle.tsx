import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const chocolateCarmelAPI = useSignal('http://localhost:3005/api_v1/chocolatecarmel/')
    const chocolateCarmelTitle = useSignal(undefined);
    const displayChocolateCarmelTitle = typeof chocolateCarmelTitle.value === 'string' ? JSON.stringify(chocolateCarmelTitle.value) : chocolateCarmelTitle.value;
    const displayChocolateCarmelTitleClean = displayChocolateCarmelTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayChocolateCarmelTitle);
        const res = await fetch(chocolateCarmelAPI.value);
        const data = await res.json();
        chocolateCarmelTitle.value = data.Title;
    });
    return (
        <div>{displayChocolateCarmelTitleClean}</div>
    );
});