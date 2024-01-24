import { component$, useStore, $, useTask$, useSignal } from "@builder.io/qwik";
import styles from "./cookies.module.css";
import Chip from "./choc-chip.jpg";
import supabase from "~/routes/supabase/index";
import ChipTitle from "../inventory/chipTitle/chipTitle";
import SugarTitle from "../inventory/sugarTitle/sugarTitle";
import PeanutButterTitle from "../inventory/peanutButterTitle/peanutButterTitle";
import DoubleChocolateTitle from "../inventory/doubleChocolateTitle/doubleChocolateTitle";
import WhiteChocolateTitle from "../inventory/whiteChocolateTitle/whiteChocolateTitle";


interface CounterProps {
    sugar: number;
    chip: number;
    peanutButter: number;
    doubleChocolate: number;
    whiteChocolate: number;
}
    
        
    export default component$(() => {
    
        const store = useStore({ chip: 0, sugar: 0, peanutButter: 0, doubleChocolate: 0, whiteChocolate: 0, });
    
        
        const countCookies = $(async (store: any) => {
            const { data: { user } } = await supabase.auth.getUser();
            

            
            if (!store || store.chip === undefined) {
                console.log('Invalid store argument:', store);
                return;
            }
          
                console.log(store);
                
                supabase.from('Cookies').select('user').eq('user', user?.id).then(result => {

                    fetch('http://localhost:3005/api_v1/endpoint', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userId: user?.id })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Success:', data);
                            // Handle the response
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                        
                        
                    if (user?.id !== undefined && result.data) {
                        console.log(result.data);
                        if (result.data.some(row => row.user == user.id)) {
                            // Update the record
                            supabase.from('Cookies')
                                .update({   user: user.id,
                                            sugar: store.sugar,
                                            chip: store.chip,
                                            peanutButter: store.peanutButter,
                                            doubleChocolate: store.doubleChocolate,
                                            whiteChocolate: store.whiteChocolate })
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
                            supabase.from('Cookies')
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
                                }
                                );
                        }
                        
                    }
                });
                
        });
        

        
    return (
      
        <div class={styles} id='cookies'>
            <h2 class='text-center mt-20 mb-10'>Cookies</h2>
            <div class='flex flex-row flex-wrap justify-around w-auto h-auto border-black border-2 border-solid ml-10 mr-10 pt-5 pb-5'>
                <div class='w-96'>
                    <div class='w-auto'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><ChipTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <CCCounter store={store}></CCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-24 text-2xl rounded-l-full' onClick$={() => {
                                        store.chip--;
                                        countCookies(store);
                                        if(store.chip < 0){
                                            store.chip = 0;
                                        }}}>-</button>
                                    <button class='h-1/4 w-24 text-2xl rounded-r-full ml-1' onClick$={async() => {
                                        store.chip++;
                                        countCookies(store);
                                        console.log((store.chip));
                                        }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><SugarTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <SCounter store={store}></SCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-24 text-2xl rounded-l-full' onClick$={() => {
                                        store.sugar--;
                                        if(store.sugar < 0){
                                            store.sugar = 0;
                                            countCookies(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-24 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.sugar++;
                                        countCookies(store);
                                        }}>+</button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><PeanutButterTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <PBCounter store={store}></PBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-24 text-2xl rounded-l-full' onClick$={() => {
                                        store.peanutButter--;
                                        if(store.peanutButter < 0){
                                            store.peanutButter = 0;
                                            countCookies(store);
                                        }}}>-
                                    </button>
                                <button class='h-1/4 w-24 text-2xl rounded-r-full ml-1' onClick$={() => {
                                    store.peanutButter++;
                                    countCookies(store);
                                }}>+</button>

                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><DoubleChocolateTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <DBCounter store={store}></DBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-24 text-2xl rounded-l-full' onClick$={() => {
                                        store.doubleChocolate--;
                                        if(store.doubleChocolate < 0){
                                            store.doubleChocolate = 0;
                                            countCookies(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-24 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.doubleChocolate++;
                                        countCookies(store);
                                        }}>+</button>
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><WhiteChocolateTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <WCCounter store={store}></WCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-24 text-2xl rounded-l-full' onClick$={() => {
                                        store.whiteChocolate--;
                                        if(store.whiteChocolate < 0){
                                            store.whiteChocolate = 0;
                                            countCookies(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-24 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.whiteChocolate++;
                                        countCookies(store);
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
    const chipPrice = useSignal('http://localhost:3005/api_v1/chip/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.chip * Number(displayValue);
    
    useTask$(async ({track}) => {
        track(() => chipPrice);
        const res = await fetch(chipPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });
    
    

    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{displayValue}</span>
            </div>
            
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.chip}</span>
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

    const sugarPrice = useSignal('http://localhost:3005/api_v1/sugar/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.sugar * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => sugarPrice);
        const res = await fetch(sugarPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div id='cQuant' class='mt-2 mb-2'>
            Quantity: <span id='cPrice'>{props.store.sugar}</span>
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
    const peanutButterPrice = useSignal('http://localhost:3005/api_v1/peanutButter/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.peanutButter * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => peanutButterPrice);
        const res = await fetch(peanutButterPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.peanutButter}</span>
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
    const doubleChocolatePrice = useSignal('http://localhost:3005/api_v1/doubleChocolate/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.doubleChocolate * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => doubleChocolatePrice);
        const res = await fetch(doubleChocolatePrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{price}</span>
            </div>
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.doubleChocolate}</span>
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
    const whiteChocolatePrice = useSignal('http://localhost:3005/api_v1/whiteChocolate/')
    const price = useSignal(undefined);
   

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.whiteChocolate * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => whiteChocolatePrice);
        const res = await fetch(whiteChocolatePrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

   

   
    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.whiteChocolate}</span>
        </div>
        <div>
            Total:
        </div>
        <div class=''>
            <span class='text-center border-2 border-black'>$<input type="number" class='text-black mt-5 ml-2 w-24 self-center text-right'  value={total} readOnly/></span>
        </div>
    </div></>;
  });

  




  