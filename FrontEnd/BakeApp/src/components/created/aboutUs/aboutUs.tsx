import { component$ } from "@builder.io/qwik";
import styles from "./aboutUs.module.css";

export default component$(() => {
    return (
      
        <div class={styles} id='aboutUs'>
            <h1 class='text-50 h-auto w-auto mt-40'>About Us</h1>
            <p class='text-center mt-20 mb-40'>A Long Message About The Orgin of The Compay and About The Dedication To The Product</p>
        </div>
      
    );
  });