import { component$ } from "@builder.io/qwik";
import styles from "./contactUs.module.css";
import Picture from "./images.jpg";
import type { PropFunction } from "@builder.io/qwik";


interface ModalProps {
    close: PropFunction<() => void>;
}

export default component$((props: ModalProps) => {
    return (
      
                <div class={styles} id='modal'>
                <div class='text-black w-1/2 h-fit bg-gray-900  border-2 border-black fixed top-32 left-1/4 z-0'>
                <div class='bg-white p-5 m-10 w-9/10'>
                    <main class='bg-transparent'>
                        <form class='' action ="mailto:luckflos2@gmail.com">
                        <div class='text-right align-text-top cursor-pointer' onClick$={props.close}>X</div>
                            <div class=' flex flex-row'>
                                <div class='border-black border-2 w-1/2 mb-10'>
                                    
                                    <div class='flex flex-col text-left w-3/4 ml-16 mt-5'>
                                        <label for='name'>Name</label>
                                        <input type='text' id='name' name='name' placeholder='' class='border-black border-2'></input>
                                    </div>
                                    <div class='flex flex-col text-left w-3/4 ml-16'>
                                        <label for='email'>Email</label>
                                        <input type='text' id='email' name='email' placeholder='' class='border-black border-2'></input>
                                    </div>
                                    <div class='flex flex-col text-left w-3/4 ml-16'>
                                        <label for='message'>Message</label>
                                        <textarea id='message' name='message' placeholder='' class='h-16 border-black border-2'></textarea>
                                    </div>
                                    <div class='flex flex-col text-left w-1/2 h-1/4 ml-16 mb-5 mt-5'>
                                        <button class='bg-black' type='submit'>Submit</button>
                                    </div>
                                </div>
                                <div class='border-black border-2 w-1/5 h-fit ml-10 fixed left-1/2 top-72'>
                                    <img src={Picture} alt='' width='500' height='200'></img>
                                </div>
                                
                            </div>
                            
                        </form>
                        
                    </main>
                    <footer class='bg-transparent pt-10 bt-1 border-black border-2 w-1/2'>
                        <div class='flex flex-col ml-16 mb-5'>
                            <label for='name'>Company Name</label>
                        </div>
                        <div class='flex flex-col ml-16 mb-5'>
                            <label>1111 Nw 62Nd Terrace New York, NY 13451</label>
                        </div>
                        <div class='flex flex-col ml-16 mb-5'>
                            <label for='email'>CompanyName@gmail.com</label>
                        </div>
                        <div class='flex flex-col ml-16 mb-10'>
                            <label>666-899-1230</label>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
      
    );
  });