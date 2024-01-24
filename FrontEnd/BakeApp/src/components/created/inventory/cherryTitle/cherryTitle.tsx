import { component$, useTask$, useSignal } from '@builder.io/qwik'

export default component$(() => {
    const cherryAPI = useSignal('http://localhost:3005/api_v1/cherry/')
    const cherryTitle = useSignal(undefined);
    const displayCherryTitle = typeof cherryTitle.value === 'string' ? JSON.stringify(cherryTitle.value) : cherryTitle.value;
    const displayCherryTitleClean = displayCherryTitle?.replace(/^"|"$/g, '');

    useTask$(async ({track}) => {
        track(() => displayCherryTitle);
        const res = await fetch(cherryAPI.value);
        const data = await res.json();
        cherryTitle.value = data.Title;
    });
    return (
        <div>{displayCherryTitleClean}</div>
    );
});