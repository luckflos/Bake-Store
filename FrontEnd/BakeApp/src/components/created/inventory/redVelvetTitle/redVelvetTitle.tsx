import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const redVelvetAPI = useSignal('http://localhost:3005/api_v1/redvelvet/')
    const redVelvetTitle = useSignal(undefined);
    const displayRedVelvetTitle = typeof redVelvetTitle.value === 'string' ? JSON.stringify(redVelvetTitle.value) : redVelvetTitle.value;
    const displayRedVelvetTitleClean = displayRedVelvetTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayRedVelvetTitle);
        const res = await fetch(redVelvetAPI.value);
        const data = await res.json();
        redVelvetTitle.value = data.Title;
    });
    return (
        <div>{displayRedVelvetTitleClean}</div>
    );
});