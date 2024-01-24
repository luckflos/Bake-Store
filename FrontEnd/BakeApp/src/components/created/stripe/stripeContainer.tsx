import { component$, $, useStore } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import supabase from "~/routes/supabase";

interface ModalProps {
  close: PropFunction<() => void>;
}



export default component$((props: ModalProps) => {

  const store = useStore({ name: '', street: '', city: '', state: '', zip: '' });

  const collectShipping = $(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    supabase.from('shipping').select('user').eq('user', user?.id).then(result => {
                      if (user?.id !== undefined && result.data) {
                          console.log(result.data);
                          if (result.data.some(row => row.user == user.id)) {
                              // Update the record
                              supabase.from('shipping')
                                  .update({   user: user.id,
                                              name: store.name,
                                              street: store.street,
                                              city: store.city,
                                              state: store.state,
                                              zip: store.zip
                                               })
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
                              supabase.from('shipping')
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
                          }
                      }
                  }
              );
  }
  );

  const ProductDisplay = () => (
    <div class='bg-black p-5 border-4 border-black fixed mx-52 w-1/5 top-1/4'>
      <div class='text-right align-text-top cursor-pointer text-white' onClick$={props.close}>X</div>
      <div class=''>
        <form class='h-1/2' >
          <div class='text-white mb-12'>Shipping Information</div>
          <section class='flex flex-col '>
            <label class='text-white mb-2'>Name</label>
            <input class='bg-white mb-2' name="name" type="text" onChange$={(event) => store.name = event.target.value}/>
            <label class='text-white mb-2'>Street</label>
            <input class='bg-white mb-2' name="street" type="street" onChange$={(event) => store.street = event.target.value}/>
            <label class='text-white mb-2'>City</label>
            <input class='bg-white mb-2' name="city" type="text" onChange$={(event) => store.city = event.target.value}/>
            <label class='text-white mb-2'>State</label>
            <input class='bg-white mb-2' name="state" type="text" onChange$={(event) => store.state = event.target.value}/>
            <label class='text-white mb-2'>Postal Code</label>
            <input class='bg-white mb-6' name="postal_code" type="text" onChange$={(event) => store.zip = event.target.value}/>
          </section>
        </form>
      </div>
    
      <form action="http://localhost:3005/api_v1/create-checkout-session" method="POST">
        <button class='relative left-1/4 bg-blue-900' type="submit" onClick$={collectShipping}>
          Checkout
        </button>
      </form>
    </div>
  );

  return  (
    <ProductDisplay />
  );
}
);

