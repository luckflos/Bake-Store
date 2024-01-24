import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const whiteAPI = useSignal('http://localhost:3005/api_v1/white/')
    const whiteTitle = useSignal(undefined);
    const displayWhiteTitle = typeof whiteTitle.value === 'string' ? JSON.stringify(whiteTitle.value) : whiteTitle.value;
    const displaywhiteTitleClean = displayWhiteTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayWhiteTitle);
        const res = await fetch(whiteAPI.value);
        const data = await res.json();
        whiteTitle.value = data.Title;
    });
    return (
        <div>{displaywhiteTitleClean}</div>
    );
});