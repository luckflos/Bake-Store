import { component$ } from "@builder.io/qwik";
import styles from "./home.module.css";
import picture from "./Happyguy.jpg";

export default component$(() => {
    return (
      
        <div class={styles}>
            <div class='flex flex-row flex-wrap w-full justify-around h-1/2 w-screen m-10 mt-48 '>
                <div class='text-black'>
                    <div class='box-border border-black border-4 h-full p-5'>
                        <p> Welcome to 'Store Name'!</p>
                        <br/>
                        <p>We offer a wide selection of baked good.  These may include Keto Friendly options!</p>
                        <br/>
                        <p>Everything is baked fresh daily and delivered as quickly as possible!</p>
                    </div>
                </div>
                <div class='box-border border-black border-4'>
                    <img src={picture} alt='' width="600" height='200'></img>
                </div>
            </div>
        </div>
      
    );
  });