import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const cupcakeAPI = useSignal('http://localhost:3005/api_v1/cupcake/')
    const cupcakeTitle = useSignal(undefined);
    const displayCupcakeTitle = typeof cupcakeTitle.value === 'string' ? JSON.stringify(cupcakeTitle.value) : cupcakeTitle.value;
    const displayCupcakeTitleClean = displayCupcakeTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayCupcakeTitle);
        const res = await fetch(cupcakeAPI.value);
        const data = await res.json();
        cupcakeTitle.value = data.Title;
    });
    return (
        <div>{displayCupcakeTitleClean}</div>
    );
});