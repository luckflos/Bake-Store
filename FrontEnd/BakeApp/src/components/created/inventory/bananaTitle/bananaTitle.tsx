import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const bananaAPI = useSignal('http://localhost:3005/api_v1/banana/')
    const bananaTitle = useSignal(undefined);
    const displayBananaTitle = typeof bananaTitle.value === 'string' ? JSON.stringify(bananaTitle.value) : bananaTitle.value;
    const displayBananaTitleClean = displayBananaTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayBananaTitle);
        const res = await fetch(bananaAPI.value);
        const data = await res.json();
        bananaTitle.value = data.Title;
    });
    return (
        <div>{displayBananaTitleClean}</div>
    );
});