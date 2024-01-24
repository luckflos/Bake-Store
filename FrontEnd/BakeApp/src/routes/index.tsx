import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import NavBar from "~/components/created/navBar/navBar";
import Home from "~/components/created/home/home";
import Display from "~/components/created/displayRow/displayRow";
import Cookies from "~/components/created/cookies/cookies";
import Bread from "~/components/created/bread/bread";
import Pie from "~/components/created/pie/pie";
import Cake from "~/components/created/cake/cake";
import AboutUs from "~/components/created/aboutUs/aboutUs";

export default component$(() => {
  
  return (
    <div id='home'>
      <div class='flex flex-wrap'>
        <NavBar></NavBar>
        <Home></Home>
      </div>
      <div class=''>
        <Display></Display>
      </div>
      <div class='text-center mt-40 underline w-full'>
        <h1 class='text-50 h-auto w-auto' id='menu'>Menu</h1>
      </div>
      <div>
        <Cookies></Cookies>
      </div>
      <div>
        <Bread></Bread>
      </div>
      <div>
        <Pie></Pie>
      </div>
      <div>
        <Cake></Cake>
      </div>
      <div>
        <AboutUs></AboutUs>
      </div>
    </div>
    
   
  );
});

export const head: DocumentHead = {
  title: "Welcome to KC Bakery",
  meta: [
    {
      name: "KC Bakery",
      content: "Delivers the best baked goods in KC",
    },
    
  ],
};
