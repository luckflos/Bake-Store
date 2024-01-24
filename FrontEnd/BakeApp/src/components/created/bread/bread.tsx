import { component$, useStore, $, useTask$, useSignal } from "@builder.io/qwik";
import Chip from "./choc-chip.jpg";
import supabase from "~/routes/supabase/index";
import WhiteTitle from "../inventory/whiteTitle/whiteTitle";
import WheatTitle from "../inventory/wheatTitle/wheatTitle";
import MilkTitle from "../inventory/milkTitle/milkTitle";
import BananaTitle from "../inventory/bananaTitle/bananaTitle";
import WholeGrainTitle from "../inventory/wholeGrainTitle/wholeGrainTitle";


interface CounterProps {
    white: number;
    wheat: number;
    milk: number;
    banana: number;
    whole: number;
}
    
    export default component$(() => {
    
        const store = useStore({ white: 0, wheat: 0, milk: 0, banana: 0, whole: 0, });

        const countBread = $(async (store: any) => {
            
            const { data: { user } } = await supabase.auth.getUser();

            if (!store || store.white === undefined) {
                console.log('Invalid store argument:', store);
                return;
            }
            
    
                console.log(store);
                
                supabase.from('bread').select('user').eq('user', user?.id).then(result => {
                    if (user?.id !== undefined && result.data) {
                        console.log(result.data);
                        if (result.data.some(row => row.user == user.id)) {
                            // Update the record
                            supabase.from('bread')
                                .update({   user: user.id,
                                            white: store.white,
                                            wheat: store.wheat,
                                            milk: store.milk,
                                            banana: store.banana,
                                            whole: store.whole })
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
                            supabase.from('bread')
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
      
        <div id='bread'>
            <h2 class='text-center mt-20 mb-10'>Bread</h2>
            <div class='flex flex-row flex-wrap justify-around w-auto h-auto border-black border-2 border-solid ml-10 mr-10 pt-5 pb-5'>
                <div class='w-96'>
                    <div class='w-auto'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><WhiteTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <CCCounter store={store}></CCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.white--;
                                        countBread(store);
                                        if(store.white < 0){
                                            store.white = 0;
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={async() => {
                                        store.white++;
                                        countBread(store);
                                        console.log((store.white));
                                        }}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><WheatTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <SCounter store={store}></SCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.wheat--;
                                        if(store.wheat < 0){
                                            store.wheat = 0;
                                            countBread(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.wheat++;
                                        countBread(store);
                                        }}>+</button>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><MilkTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <PBCounter store={store}></PBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.milk--;
                                        if(store.milk < 0){
                                            store.milk = 0;
                                            countBread(store);
                                        }}}>-
                                    </button>
                                <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                    store.milk++;
                                    countBread(store);
                                }}>+</button>

                            </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><BananaTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <DBCounter store={store}></DBCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.banana--;
                                        if(store.banana < 0){
                                            store.banana = 0;
                                            countBread(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.banana++;
                                        countBread(store);
                                        }}>+</button>
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='w-96'>
                        <div class='flex flex-col h-auto w-auto text-center'>
                            <h3 class='w-auto mb-5 text-center'><WholeGrainTitle/></h3>
                            <img class='self-center border-4 border-black' src={Chip} alt='' width='200' height='200'></img>
                            <div class='flex flex-col text-white'>
                                <WCCounter store={store}></WCCounter>
                                <div class='flex flex-row justify-center'>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-l-full' onClick$={() => {
                                        store.whole--;
                                        if(store.whole < 0){
                                            store.whole = 0;
                                            countBread(store);
                                        }}}>-</button>
                                    <button class='h-1/4 w-1/4 text-2xl rounded-r-full ml-1' onClick$={() => {
                                        store.whole++;
                                        countBread(store);
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
    const whitePrice = useSignal('http://localhost:3005/api_v1/white/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.white * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => whitePrice);
        const res = await fetch(whitePrice.value);
        const data = await res.json();
        price.value = data.Price;
    });


    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{displayValue}</span>
            </div>
            
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.white}</span>
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

    const wheatPrice = useSignal('http://localhost:3005/api_v1/wheat/')
    const price = useSignal(undefined);
    
    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.wheat * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => wheatPrice);
        const res = await fetch(wheatPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div id='cQuant' class='mt-2 mb-2'>
            Quantity: <span id='cPrice'>{props.store.wheat}</span>
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
    const milkPrice = useSignal('http://localhost:3005/api_v1/milk/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.milk * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => milkPrice);
        const res = await fetch(milkPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.milk}</span>
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
    const bananaPrice = useSignal('http://localhost:3005/api_v1/banana/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.banana * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => bananaPrice);
        const res = await fetch(bananaPrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

    return <>
        <div class='flex flex-col mt-2 mb-4'>
            <div>
                Price: $<span>{price}</span>
            </div>
            <div class='mt-2 mb-2'>
                Quantity: <span>{props.store.banana}</span>
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
    const wholePrice = useSignal('http://localhost:3005/api_v1/wholegrain/')
    const price = useSignal(undefined);

    const displayValue = typeof price.value === 'number' ? JSON.stringify(price.value) : price.value;
    const total = props.store.whole * Number(displayValue);

    useTask$(async ({track}) => {
        track(() => wholePrice);
        const res = await fetch(wholePrice.value);
        const data = await res.json();
        price.value = data.Price;
    });

   
    return <>
    <div class='flex flex-col mt-2 mb-4'>
        <div>
            Price: $<span>{price}</span>
        </div>
        <div class='mt-2 mb-2'>
            Quantity: <span>{props.store.whole}</span>
        </div>
        <div>
            Total:
        </div>
        <div class=''>
            <span class='text-center border-2 border-black'>$<input type="number" class='text-black mt-5 ml-2 w-24 self-center text-right'  value={total} readOnly/></span>
        </div>
    </div></>;
  });

  




  