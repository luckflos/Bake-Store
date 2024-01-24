import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const peanutButterAPI = useSignal('http://localhost:3005/api_v1/peanutButter/')
    const peanutButterTitle = useSignal(undefined);
    const displayPeanutButterTitle = typeof peanutButterTitle.value === 'string' ? JSON.stringify(peanutButterTitle.value) : peanutButterTitle.value;
    const displayPeanutButterTitleClean = displayPeanutButterTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayPeanutButterTitle);
        const res = await fetch(peanutButterAPI.value);
        const data = await res.json();
        peanutButterTitle.value = data.Title;
    });
    return (
        <div>{displayPeanutButterTitleClean}</div>
    );
});