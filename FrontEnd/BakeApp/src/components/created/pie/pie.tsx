import { component$, useStore, $, useTask$, useSignal } from "@builder.io/qwik";
import Chip from "./choc-chip.jpg";
import supabase from "~/routes/supabase/index";
import AppleTitle from "../inventory/appleTitle/appleTitle";
import PumkinTitle from "../inventory/pumpkinTitle/pumkinTitle";
import BlueberryTitle from "../inventory/blueberryTitle/blueberryTitle";
import CherryTitle from "../inventory/cherryTitle/cherryTitle";
import LemonTitle from "../inventory/lemonTitle/lemonTitle";


interface CounterProps {
    pumpkin: number;
    apple: number;
    blueberry: number;
    cherry: number;
    lemon: number;
}
    
    export default component$(() => {
    
        const store = useStore({ pumpkin: 0, apple: 0, blueberry: 0, cherry: 0, lemon: 0 });
        const countPie = $(async (store: any) => {
            const { data: { user } } = await supabase.auth.getUser();

            
            if (!store || store.pumpkin === undefined) {
                console.log('Invalid store argument:', store);
                return;
            }
            console.log(user?.id);
    
                console.log(store);
                
                supabase.from('pie').select('user').eq('user', user?.id).then(result => {
                    if (user?.id !== undefined && result.data) {
                        console.log(result.data);
                        if (result.data.some(row => row.user == user.id)) {
                            // Update the record
                            supabase.from('pie')
                                .update({   user: user.id,
                                            pumpkin: store.pumpkin,
                                            apple: store.apple,
                                            blueberry: store.blueberry,
                                            cherry: store.cherry,
                                            lemon: store.lemon })
                                .eq('user', user.id)
                                .then(({ data, error }) => {
                                    console.log(data, error);
                                    if (error) {
                                        console.log('Error updating record:', error);
                                    } else {
                                        console.log('Record updated successfully');
                                    }
                                });
                        } else {
                            
                            // Insert the record
                            supabase.from('pie')
                                .insert([
                                    { user: user.id },
                                ])
                                .then(({ data, error }) => {
                                    console.log(data, error);
                                    if (error) {
                                        console.log('Error inserting record:', error);
                                    } else {
                                        console.log('Record inserted successfully');
                                    }
                                });
                                
                            fetch('http://localhost:3005/api_v1/endpoint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userId: user.id })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            // Handle the response
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                        }
                    }  
                });  
        }
        );
    return (
        <div id='pie'>
            <h2 class='text-center mt-20 mb-10'>Pie</h2>
            <div class='flex flex-row flex-wrap justify-around w-auto h-auto border-black border-2 border-solid ml-10 mr-10 pt-5 pb-5'>
                <div class='w-96'>
                    <div class='w-auto'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><PumkinTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <CCCounter store={store}></CCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.pumpkin--;
                                        countPie(store);
                                        if(store.pumpkin < 0){
                                            store.pumpkin = 0;
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={async() => {
                                        store.pumpkin++;
                                        countPie(store);
                                        console.log((store.pumpkin));
                                        }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><AppleTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <SCounter store={store}></SCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.apple--;
                                        if(store.apple < 0){
                                            store.apple = 0;
                                            countPie(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.apple++;
                                        countPie(store);
                                        }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><BlueberryTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <PBCounter store={store}></PBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.blueberry--;
                                        if(store.blueberry < 0){
                                            store.blueberry = 0;
                                            countPie(store);
                                        }}}>-
                                    </button>
                                <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                    store.blueberry++;
                                    countPie(store);
                                }}>+</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><CherryTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <DBCounter store={store}></DBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.cherry--;
                                        if(store.cherry < 0){
                                            store.cherry = 0;
                                            countPie(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.cherry++;
                                        countPie(store);
                                        }}>+</button>
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><LemonTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <WCCounter store={store}></WCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.lemon--;
                                        if(store.lemon < 0){
                                            store.lemon = 0;
                                            countPie(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.lemon++;
                                        countPie(store);
                                        }}>+</button>
                                </div>    
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
  });

  
  export const CCCounter = component$<{ store: CounterProps}>((props) => {
    const pumpkinPrice = useSignal('http://localhost:3005/api_v1/pumpkin/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.pumpkin * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => pumpkinPrice);
        const res = await fetch(pumpkinPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });


    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{displayValue}</span>
            </div>
            
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.pumpkin}</span>
            </div>
            <div>
                Total:
            </div>
            <div class=''>
                <span class='text-center border-2 border-black'>$<input id='chipTotal' type="number" class='text-black mt-5 ml-2 w-24 self-center text-right' value={total} readOnly/></span>
            </div>
        </div></>;
        
  });
  

  export const SCounter = component$<{ store: CounterProps }>((props) => {

    const applePrice = useSignal('http://localhost:3005/api_v1/apple/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.apple * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => applePrice);
        const res = await fetch(applePrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div id='cQuant' class='mt-2 mb-2'>
            Quantity: <span id='cPrice'>{props.store.apple}</span>
        </div>
        <div>
            Total:
        </div>
        <div class=''>
            <span class='text-center border-2 border-black'>$<input type="number" class='text-black mt-5 ml-2 w-24 self-center text-right'  value={total} readOnly/></span>
        </div>
    </div></>;
  });
  export const PBCounter = component$<{ store: CounterProps }>((props) => {
    const blueberryPrice = useSignal('http://localhost:3005/api_v1/blueberry/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.blueberry * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => blueberryPrice);
        const res = await fetch(blueberryPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.blueberry}</span>
        </div>
        <div>
            Total: 
        </div>
        <div class=''>
            <span class='text-center border-2 border-black'>$<input type="number" class='text-black mt-5 ml-2 w-24 self-center text-right'  value={total} readOnly/></span>
        </div>
    </div></>;
  });
  export const DBCounter = component$<{ store: CounterProps }>((props) => {
    const cherryPrice = useSignal('http://localhost:3005/api_v1/cherry/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.cherry * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => cherryPrice);
        const res = await fetch(cherryPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{price}</span>
            </div>
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.cherry}</span>
            </div>
            <div>
                Total:
            </div>
            <div class=''>
                <span class='text-center border-2 border-black'>$<input type="number" class='text-black mt-5 ml-2 w-24 self-center text-right'  value={total} readOnly/></span>
            </div>
        </div></>;
  });

  export const WCCounter = component$<{ store: CounterProps }>((props) => {
    const lemonPrice = useSignal('http://localhost:3005/api_v1/lemon/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.lemon * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => lemonPrice);
        const res = await fetch(lemonPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

   
    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.lemon}</span>
        </div>
        <div>
            Total:
        </div>
        <div class=''>
            <span class='text-center border-2 border-black'>$<input type="number" class='text-black mt-5 ml-2 w-24 self-center text-right'  value={total} readOnly/></span>
        </div>
    </div></>;
  });

  




  