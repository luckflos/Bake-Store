import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const whiteChocolateAPI = useSignal('http://localhost:3005/api_v1/whiteChocolate/')
    const whiteChocolateTitle = useSignal(undefined);
    const displayWhiteChocolateTitle = typeof whiteChocolateTitle.value === 'string' ? JSON.stringify(whiteChocolateTitle.value) : whiteChocolateTitle.value;
    const displayWhiteChocolateTitleClean = displayWhiteChocolateTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayWhiteChocolateTitle);
        const res = await fetch(whiteChocolateAPI.value);
        const data = await res.json();
        whiteChocolateTitle.value = data.Title;
    });
    return (
        <div>{displayWhiteChocolateTitleClean}</div>
    );
});