import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const milkAPI = useSignal('http://localhost:3005/api_v1/milk/')
    const milkTitle = useSignal(undefined);
    const displayMilkTitle = typeof milkTitle.value === 'string' ? JSON.stringify(milkTitle.value) : milkTitle.value;
    const displayMilkTitleClean = displayMilkTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayMilkTitle);
        const res = await fetch(milkAPI.value);
        const data = await res.json();
        milkTitle.value = data.Title;
    });
    return (
        <div>{displayMilkTitleClean}</div>
    );
});