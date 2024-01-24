import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const appleAPI = useSignal('http://localhost:3005/api_v1/apple/')
    const appleTitle = useSignal(undefined);
    const displayAppleTitle = typeof appleTitle.value === 'string' ? JSON.stringify(appleTitle.value) : appleTitle.value;
    const displayAppleTitleClean = displayAppleTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayAppleTitle);
        const res = await fetch(appleAPI.value);
        const data = await res.json();
        appleTitle.value = data.Title;
    });
    return (
        <div>{displayAppleTitleClean}</div>
    );
});