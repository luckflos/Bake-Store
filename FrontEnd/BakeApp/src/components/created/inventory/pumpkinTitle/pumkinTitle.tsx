import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const pumpkinAPI = useSignal('http://localhost:3005/api_v1/pumpkin/')
    const pumpkinTitle = useSignal(undefined);
    const displayPumpkinTitle = typeof pumpkinTitle.value === 'string' ? JSON.stringify(pumpkinTitle.value) : pumpkinTitle.value;
    const displayPumpkinTitleClean = displayPumpkinTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayPumpkinTitle);
        const res = await fetch(pumpkinAPI.value);
        const data = await res.json();
        pumpkinTitle.value = data.Title;
    });
    return (
        <div>{displayPumpkinTitleClean}</div>
    );
});