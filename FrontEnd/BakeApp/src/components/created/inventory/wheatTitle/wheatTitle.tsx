import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const wheatAPI = useSignal('http://localhost:3005/api_v1/wheat/')
    const wheatTitle = useSignal(undefined);
    const displayWheatTitle = typeof wheatTitle.value === 'string' ? JSON.stringify(wheatTitle.value) : wheatTitle.value;
    const displayWheatTitleClean = displayWheatTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayWheatTitle);
        const res = await fetch(wheatAPI.value);
        const data = await res.json();
        wheatTitle.value = data.Title;
    });
    return (
        <div>{displayWheatTitleClean}</div>
    );
});