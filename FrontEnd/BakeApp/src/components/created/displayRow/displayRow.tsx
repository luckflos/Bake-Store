import { component$ } from "@builder.io/qwik";
import styles from "./displayRow.module.css";
import Cookie from "./Cookie.jpg";


export default component$(() => {
    return (
      
        <div class={styles}>
            <div class='border-box border-black border-4 h-auto mr-20 ml-20'>
                <div class='flex flex-row justify-between m-10'>
                    <div class='ml-10'>
                        <h2 class='mb-5 text-center'>Cookies</h2>
                        <a href='#cookies'><img class='border-box border-black border-4' src={Cookie} alt="" height='300' width='200'/></a> 
                    </div>
                    <div>
                        <h2 class='mb-5 text-center'>Bread</h2>
                        <a href='#bread'><img class='border-box border-black border-4' src={Cookie} alt="" height='300' width='200'/></a> 
                    </div>
                    <div>
                        <h2 class='mb-5 text-center'>Pie</h2>
                        <a href='#pie'><img class='border-box border-black border-4' src={Cookie} alt="" height='300' width='200'/></a>
                            
                    </div>
                    <div class='mr-10'>
                        <h2 class='mb-5 text-center'>Cake</h2>
                        <a href='#cake'><img class='border-box border-black border-4' src={Cookie} alt="" height='300' width='200'/></a> 
                    </div>
                </div>
            </div>
        </div>
      
    );
  });