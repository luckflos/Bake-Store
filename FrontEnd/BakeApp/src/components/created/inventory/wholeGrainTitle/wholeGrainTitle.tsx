import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const wholegrainAPI = useSignal('http://localhost:3005/api_v1/wholegrain/')
    const wholegrainTitle = useSignal(undefined);
    const displayWholeGrainTitle = typeof wholegrainTitle.value === 'string' ? JSON.stringify(wholegrainTitle.value) : wholegrainTitle.value;
    const displayWholeGrainTitleClean = displayWholeGrainTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayWholeGrainTitle);
        const res = await fetch(wholegrainAPI.value);
        const data = await res.json();
        wholegrainTitle.value = data.Title;
    });
    return (
        <div>{displayWholeGrainTitleClean}</div>
    );
});