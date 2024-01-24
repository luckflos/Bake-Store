import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const appleAPI = useSignal('http://localhost:3005/api_v1/blueberry/')
    const blueberryTitle = useSignal(undefined);
    const displayBlueberryTitle = typeof blueberryTitle.value === 'string' ? JSON.stringify(blueberryTitle.value) : blueberryTitle.value;
    const displayBlueberryTitleClean = displayBlueberryTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayBlueberryTitle);
        const res = await fetch(appleAPI.value);
        const data = await res.json();
        blueberryTitle.value = data.Title;
    });
    return (
        <div>{displayBlueberryTitleClean}</div>
    );
});