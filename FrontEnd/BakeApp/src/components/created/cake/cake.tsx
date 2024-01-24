import { component$, useStore, $, useTask$, useSignal } from "@builder.io/qwik";
import Chip from "./choc-chip.jpg";
import supabase from "~/routes/supabase/index";
import ChocolateCarmelTitle from "../inventory/chocolateCarmelTitle/chocolateCarmelTitle";
import VanillaTitle from "../inventory/vanillaTitle/vanillaTitle";
import ChocolateTitle from "../inventory/chocolateTitle/chocolateTitle";
import CupcakeTitle from "../inventory/cupcakeTitle/cupcakeTitle";
import RedVelvetTitle from "../inventory/redVelvetTitle/redVelvetTitle";


interface CounterProps {
    chocolate: number;
    redvelvet: number;
    vanilla: number;
    chocolatecarmel: number;
    cupcake: number;
}
    
    export default component$(() => {
    
        const store = useStore({ chocolate: 0, redvelvet: 0, vanilla: 0, chocolatecarmel: 0, cupcake: 0 });

        const countCake = $(async (store: any) => {

            const { data: { user } } = await supabase.auth.getUser();

            if (!store || store.chocolate === undefined) {
                console.log('Invalid store argument:', store);
                return;
            }
            
                console.log(store);
                
                supabase.from('cake').select('user').eq('user', user?.id).then(result => {
                    if (user?.id !== undefined && result.data) {
                        console.log(result.data);
                        if (result.data.some(row => row.user == user.id)) {
                            // Update the record
                            supabase.from('cake')
                                .update({   user: user.id,
                                            chocolate: store.chocolate,
                                            redvelvet: store.redvelvet,
                                            vanilla: store.vanilla,
                                            chocolatecarmel: store.chocolatecarmel,
                                            cupcake: store.cupcake })
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
                            supabase.from('cake')
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
      
        <div id='cake'>
            <h2 class='text-center mt-20 mb-10'>Cake</h2>
            <div class='flex flex-row flex-wrap justify-around w-auto h-auto border-black border-2 border-solid ml-10 mr-10 pt-5 pb-5'>
                <div class='w-96'>
                    <div class='w-auto'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><ChocolateTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <CCCounter store={store}></CCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.chocolate--;
                                        countCake(store);
                                        if(store.chocolate< 0){
                                            store.chocolate = 0;
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={async() => {
                                        store.chocolate++;
                                        countCake(store);
                                        console.log((store.chocolate));
                                        }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><RedVelvetTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <SCounter store={store}></SCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.redvelvet--;
                                        if(store.redvelvet < 0){
                                            store.redvelvet = 0;
                                            countCake(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.redvelvet++;
                                        countCake(store);
                                        }}>+</button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><VanillaTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <PBCounter store={store}></PBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.vanilla--;
                                        if(store.vanilla < 0){
                                            store.vanilla = 0;
                                            countCake(store);
                                        }}}>-
                                    </button>
                                <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                    store.vanilla++;
                                    countCake(store);
                                }}>+</button>

                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><ChocolateCarmelTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <DBCounter store={store}></DBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.chocolatecarmel--;
                                        if(store.chocolatecarmel < 0){
                                            store.chocolatecarmel = 0;
                                            countCake(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.chocolatecarmel++;
                                        countCake(store);
                                        }}>+</button>
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><CupcakeTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <WCCounter store={store}></WCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.cupcake--;
                                        if(store.cupcake < 0){
                                            store.cupcake = 0;
                                            countCake(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.cupcake++;
                                        countCake(store);
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
    const chocolatePrice = useSignal('http://localhost:3005/api_v1/chocolate/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.chocolate * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => chocolatePrice);
        const res = await fetch(chocolatePrice.value);
        const data = await res.json();
        price.value = data.Price;
    });


    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{displayValue}</span>
            </div>
            
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.chocolate}</span>
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

    const redVelvetPrice = useSignal('http://localhost:3005/api_v1/redvelvet/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.redvelvet * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => redVelvetPrice);
        const res = await fetch(redVelvetPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div id='cQuant' class='mt-2 mb-2'>
            Quantity: <span id='cPrice'>{props.store.redvelvet}</span>
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
    const vanillaPrice = useSignal('http://localhost:3005/api_v1/vanilla/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.vanilla * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => vanillaPrice);
        const res = await fetch(vanillaPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.vanilla}</span>
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
    const chocolatecarmelPrice = useSignal('http://localhost:3005/api_v1/chocolatecarmel/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.chocolatecarmel * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => chocolatecarmelPrice);
        const res = await fetch(chocolatecarmelPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{price}</span>
            </div>
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.chocolatecarmel}</span>
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
    const cupcakePrice = useSignal('http://localhost:3005/api_v1/cupcake/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.cupcake * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => cupcakePrice);
        const res = await fetch(cupcakePrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

   
    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.cupcake}</span>
        </div>
        <div>
            Total:
        </div>
        <div class=''>
            <span class='text-center border-2 border-black'>$<input type="number" class='text-black mt-5 ml-2 w-24 self-center text-right'  value={total} readOnly/></span>
        </div>
    </div></>;
  });

  




  