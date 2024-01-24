import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const sugarAPI = useSignal('http://localhost:3005/api_v1/sugar/')
    const sugarTitle = useSignal(undefined);
    const displaySugarTitle = typeof sugarTitle.value === 'string' ? JSON.stringify(sugarTitle.value) : sugarTitle.value;
    const displaySugarTitleClean = displaySugarTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displaySugarTitle);
        const res = await fetch(sugarAPI.value);
        const data = await res.json();
        sugarTitle.value = data.Title;
    });
    return (
        <div>{displaySugarTitleClean}</div>
    );
});