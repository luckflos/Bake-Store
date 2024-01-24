import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const lemonAPI = useSignal('http://localhost:3005/api_v1/lemon/')
    const lemonTitle = useSignal(undefined);
    const displayLemonTitle = typeof lemonTitle.value === 'string' ? JSON.stringify(lemonTitle.value) : lemonTitle.value;
    const displayLemonTitleClean = displayLemonTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayLemonTitle);
        const res = await fetch(lemonAPI.value);
        const data = await res.json();
        lemonTitle.value = data.Title;
    });
    return (
        <div>{displayLemonTitleClean}</div>
    );
});