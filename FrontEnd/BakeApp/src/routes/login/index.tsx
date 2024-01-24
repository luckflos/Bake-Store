import { component$, $} from '@builder.io/qwik';
import supabase from '../supabase';


export default component$(() => {

    const signUp = $(
        async function signUp() {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: 
                {redirectTo: 'http://localhost:5173'}
            });
            console.log(data);
            console.log(error);

        }
    );

    //const logOut = $(
        //async function logOut() {
            //const { error } = await supabase.auth.signOut();
           // console.log(error);
       // }
  //  );

  
    return (
        <div>
            
            <div>
                <div onClick$={signUp}>Login</div>
            </div>
            
        </div>
    );
});

