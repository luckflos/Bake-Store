import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const chipAPI = useSignal('http://localhost:3005/api_v1/chip/')
    const chipTitle = useSignal(undefined);
    const displayChipTitle = typeof chipTitle.value === 'string' ? JSON.stringify(chipTitle.value) : chipTitle.value;
    const displayChipTitleClean = displayChipTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayChipTitle);
        const res = await fetch(chipAPI.value);
        const data = await res.json();
        chipTitle.value = data.Title;
        
    });
    return (
        <div>{displayChipTitleClean}</div>
    );
});
    