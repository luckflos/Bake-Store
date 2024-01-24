import { component$, useSignal, $ } from "@builder.io/qwik";
import Modal from "~/components/created/contactUs/contactUs";
import styles from "./navBar.module.css";
import StripeContainer from "../stripe/stripeContainer";
import Login from '../../../routes/login/index'
import supabase from '../../../routes/supabase'


export default component$(() => {
    
    const contactVisible = useSignal(false);
    const checkoutModal = useSignal(false);
    const loginModal = useSignal(false);

    const closeContact = $(() => {
        contactVisible.value = false;
    });

    const closeCheckout = $(() => {
        checkoutModal.value = false;
    });

    const checkCount = $(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: chip } = await supabase.from('Cookies').select('chip').eq('user', user?.id);
        const { data: peanutbutter } = await supabase.from('Cookies').select('peanutButter').eq('user', user?.id);
        const { data: doublechocolate} = await supabase.from('Cookies').select('doubleChocolate').eq('user', user?.id);
        const { data: whitechocolate } = await supabase.from('Cookies').select('whiteChocolate').eq('user', user?.id);
        const { data: sugar } = await supabase.from('Cookies').select('sugar').eq('user', user?.id);


        const { data: pumpkin } = await supabase.from('pie').select('pumpkin').eq('user', user?.id);
        const { data: apple } = await supabase.from('pie').select('apple').eq('user', user?.id);
        const { data: blueberry } = await supabase.from('pie').select('blueberry').eq('user', user?.id);
        const { data: cherry } = await supabase.from('pie').select('cherry').eq('user', user?.id);
        const { data: lemon } = await supabase.from('pie').select('lemon').eq('user', user?.id);


        const { data: white } = await supabase.from('bread').select('white').eq('user', user?.id);
        const { data: wheat } = await supabase.from('bread').select('wheat').eq('user', user?.id);
        const { data: milk } = await supabase.from('bread').select('milk').eq('user', user?.id);
        const { data: banana } = await supabase.from('bread').select('banana').eq('user', user?.id);
        const { data: whole } = await supabase.from('bread').select('whole').eq('user', user?.id);


        const { data: chocolate } = await supabase.from('cake').select('chocolate').eq('user', user?.id);
        const { data: redvelvet } = await supabase.from('cake').select('redvelvet').eq('user', user?.id);
        const { data: vanilla } = await supabase.from('cake').select('vanilla').eq('user', user?.id);
        const { data: chocolatecarmel } = await supabase.from('cake').select('chocolatecarmel').eq('user', user?.id);
        const { data: cupcake } = await supabase.from('cake').select('cupcake').eq('user', user?.id);

        const chipAsInteger = chip && chip.length > 0 ? parseInt(chip[0].chip, 10) : null;
        const sugarAsInteger = sugar && sugar.length > 0 ? parseInt(sugar[0].sugar, 10) : null;
        const doublechocolateAsInteger = doublechocolate && doublechocolate.length > 0 ? parseInt(doublechocolate[0].doubleChocolate, 10) : null;
        const peanutbutterAsInteger = peanutbutter && peanutbutter.length > 0 ? parseInt(peanutbutter[0].peanutButter, 10) : null;
        const whitechocolateAsInteger = whitechocolate && whitechocolate.length > 0 ? parseInt(whitechocolate[0].whiteChocolate, 10) : null;

        const pumpkinAsInteger = pumpkin && pumpkin.length > 0 ? parseInt(pumpkin[0].pumpkin, 10) : null;
        const appleAsInteger = apple && apple.length > 0 ? parseInt(apple[0].apple, 10) : null;
        const blueberryAsInteger = blueberry && blueberry.length > 0 ? parseInt(blueberry[0].blueberry, 10) : null;
        const cherryAsInteger = cherry && cherry.length > 0 ? parseInt(cherry[0].cherry, 10) : null;
        const lemonAsInteger = lemon && lemon.length > 0 ? parseInt(lemon[0].lemon, 10) : null;

        const whiteAsInteger = white && white.length > 0 ? parseInt(white[0].white, 10) : null;
        const wheatAsInteger = wheat && wheat.length > 0 ? parseInt(wheat[0].wheat, 10) : null;
        const milkAsInteger = milk && milk.length > 0 ? parseInt(milk[0].milk, 10) : null;
        const bananaAsInteger = banana && banana.length > 0 ? parseInt(banana[0].banana, 10) : null;
        const wholeAsInteger = whole && whole.length > 0 ? parseInt(whole[0].whole, 10) : null;

        const chocolateAsInteger = chocolate && chocolate.length > 0 ? parseInt(chocolate[0].chocolate, 10) : null;
        const redvelvetAsInteger = redvelvet && redvelvet.length > 0 ? parseInt(redvelvet[0].redvelvet, 10) : null;
        const vanillaAsInteger = vanilla && vanilla.length > 0 ? parseInt(vanilla[0].vanilla, 10) : null;
        const chocolatecarmelAsInteger = chocolatecarmel && chocolatecarmel.length > 0 ? parseInt(chocolatecarmel[0].chocolatecarmel, 10) : null;
        const cupcakeAsInteger = cupcake && cupcake.length > 0 ? parseInt(cupcake[0].cupcake, 10) : null;
        
        // @ts-ignore
        const total =  chipAsInteger + sugarAsInteger + doublechocolateAsInteger + peanutbutterAsInteger + whitechocolateAsInteger + pumpkinAsInteger + appleAsInteger + blueberryAsInteger + cherryAsInteger + lemonAsInteger + whiteAsInteger + wheatAsInteger + milkAsInteger + bananaAsInteger + wholeAsInteger + chocolateAsInteger + redvelvetAsInteger + vanillaAsInteger + chocolatecarmelAsInteger + cupcakeAsInteger;

        if (total == 0) {
            checkoutModal.value = false;
            alert('Please add items to your cart or Login before checking out');
        } else {
            checkoutModal.value = true;
        }

    });


    return (
      
        <div class={styles}>
            <div class='w-full text-blue-50 w-screen h-24 fixed text-center text-3xl border-b-2 border-black bg-indigo-600'>
                <nav class="h-full">
                    <ol class='flex flex-row justify-around pb-1 pt-1'>
                        <li class='border-l-4 border-r-4 border-black rounded-l-full rounded-r-full w-24 h-full cursor-pointer pt-2 bg-yellow-400 bg-opacity-80 text-black pt-5'><a href='#home'>Home</a></li>
                        <li class='border-l-4 border-r-4 border-black rounded-l-full rounded-r-full w-24 h-full cursor-pointer pt-2 bg-yellow-400 bg-opacity-80 text-black pt-5'><a  href='#menu'>Menu</a></li>
                        
                        <li class='border-l-4 border-r-4 border-black rounded-l-full rounded-r-full w-36 h-full cursor-pointer pt-2 bg-yellow-400 bg-opacity-80 text-black pt-5' onClick$={() => {
                          {
                            checkCount();}
                            }}>Checkout</li>
                        <li class='border-l-4 border-r-4 border-black rounded-l-full rounded-r-full w-24 h-full cursor-pointer pt-2 bg-yellow-400 bg-opacity-80 text-black pt-5' onClick$={() => {loginModal.value = true}}><Login/></li>
                       
                        <li class='border-l-4 border-r-4 border-black rounded-l-full rounded-r-full w-36 h-full cursor-pointer pt-2 bg-yellow-400 bg-opacity-80 text-black ' onClick$={$(() => {
                                const resetCookies = $(
                                    async () => {
                                        fetch('http://localhost:3005/api_v1/chip', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            
                                        }).then(() => {
                                            window.location.reload();
                                        })
                                    }
                                );
                                resetCookies();
                            })
                        }><a  href='#order'>Reset Order</a></li>
                        <li class='border-l-4 border-r-4 border-black rounded-l-full rounded-r-full w-36 h-full cursor-pointer pt-2 bg-yellow-400 bg-opacity-80 text-black pt-5'><a  href='#aboutUs'>About Us</a></li>
                        <li class='border-l-4 border-r-4 border-black rounded-l-full rounded-r-full w-44 h-full cursor-pointer pt-2 bg-yellow-400 bg-opacity-80 text-black pt-5' onClick$={() => contactVisible.value = true}>Contact Us</li>
                    </ol>
                </nav>
            </div>
            
            <div>
                {contactVisible.value && (
                    <Modal close={closeContact}></Modal>
                )}
            </div>
            <div class='absolute top-1/2 right-1/2 h-96 w-96'>
                {checkoutModal.value && (
                    <div class=''>
                        <StripeContainer close={closeCheckout} />
                    </div>
                )}
            </div>
            <div class='fixed'>
                {loginModal.value && (
                    <Login></Login>
                )}
            </div>
        </div>
      
    );
  });