import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const doubleChocolateAPI = useSignal('http://localhost:3005/api_v1/doubleChocolate/')
    const doubleChocolateTitle = useSignal(undefined);

    const displayDoubleChocolateTitle = typeof doubleChocolateTitle.value === 'string' ? JSON.stringify(doubleChocolateTitle.value) : doubleChocolateTitle.value;
    const displayDoubleChocolateTitleClean = displayDoubleChocolateTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayDoubleChocolateTitle);
        const res = await fetch(doubleChocolateAPI.value);
        const data = await res.json();
        doubleChocolateTitle.value = data.Title;
    });
    return (
        <div>{displayDoubleChocolateTitleClean}</div>
    );
});