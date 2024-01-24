import express from 'express';
import type {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';



const supabaseUrl = 'https://sjpxrusffwjosgejccbi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqcHhydXNmZndqb3NnZWpjY2JpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzAwNzkwNiwiZXhwIjoyMDE4NTgzOTA2fQ.T5EBNDDLdXCOxcIBlfwNy3ap7nHCw_JBX_yvShzDkcQ';
const supabase = createClient(supabaseUrl, supabaseKey);


dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Determine Root Domain
let rootDomain = process.env.Node_ENV == 'development' ? process.env.Root_Domain_Dev : process.env.Root_Domain_Prod; 
const app = express();
const port = 3005;
const route = '/api_v1';
const YOUR_DOMAIN = 'http://localhost:' + port;
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

let id = '';

app.post(route + '/endpoint', (req, res) => {
    const userId = req.body.userId;

    // Now you can use the userId
  
    id = userId;
    
    res.sendStatus(200);
});


app.post(route + '/chip', async (req, res) => {
    const { data: pie, error: pieE } = await supabase
    .from('pie')
    .update([
      { pumpkin: 0, apple: 0, blueberry: 0, cherry: 0, lemon: 0 },
    ])
    .eq('user', id);
    const { data: cake, error: cakeE } = await supabase
    .from('cake')
    .update([
      { chocolate: 0, redvelvet: 0, vanilla: 0, chocolatecarmel: 0, cupcake: 0 },
    ])
    .eq('user', id);
    const { data: bread, error: breadE } = await supabase
    .from('bread')
    .update([
      { white: 0, wheat: 0, milk: 0, banana: 0, whole: 0 },
    ])
    .eq('user', id);
    const { data: cookie, error: cookieE } = await supabase
    .from('Cookies')
    .update([
      { chip: 0, sugar: 0, peanutButter: 0, doubleChocolate: 0, whiteChocolate: 0 },
    ])
    .eq('user', id);

    console.log('ID: ' + id);

    res.sendStatus(200);
});
 
app.post(route + '/create-checkout-session', async (req, res) => {

    const { data: Chip } = await supabase
    .from('Cookies')
    .select('chip')
    .eq('user', id);
    const chipAsInteger = Chip && Chip.length > 0 ? parseInt(Chip[0].chip, 10) : null;
    console.log('ID: ' + id);
    console.log('Chip: ' + chipAsInteger);
   
    const { data: Sugar } = await supabase
    .from('Cookies')
    .select('sugar')
    .eq('user', id);
    const sugarAsInteger = Sugar && Sugar.length > 0 ? parseInt(Sugar[0].sugar, 10) : null;
    console.log('Sugar: ' + sugarAsInteger);

    const { data: peanutButter } = await supabase
    .from('Cookies')
    .select('peanutButter')
    .eq('user', id);
    const peanutButterAsInteger = peanutButter && peanutButter.length > 0 ? parseInt(peanutButter[0].peanutButter, 10) : null;
    console.log('Peanut Butter: ' + peanutButterAsInteger);
  
    const { data: doubleChocolate } = await supabase
    .from('Cookies')
    .select('doubleChocolate')
    .eq('user', id);
    const doubleChocolateAsInteger = doubleChocolate && doubleChocolate.length > 0 ? parseInt(doubleChocolate[0].doubleChocolate, 10) : null;
    console.log('Double Chocolate: ' + doubleChocolateAsInteger);

    const { data: whiteChocolate } = await supabase
    .from('Cookies')
    .select('whiteChocolate')
    .eq('user', id);
    const whiteChocolateAsInteger = whiteChocolate && whiteChocolate.length > 0 ? parseInt(whiteChocolate[0].whiteChocolate, 10) : null;
    console.log('White Chocolate: ' + whiteChocolateAsInteger);

    const { data: white } = await supabase
    .from('bread')
    .select('white')
    .eq('user', id);
    const whiteAsInteger = white&& white.length > 0 ? parseInt(white[0].white, 10) : null;
    console.log('White Bread: ' + whiteAsInteger);

    const { data: wheat } = await supabase
    .from('bread')
    .select('wheat')
    .eq('user', id);
    const wheatAsInteger = wheat&& wheat.length > 0 ? parseInt(wheat[0].wheat, 10) : null;
    console.log('Wheat Bread: ' + wheatAsInteger);

    const { data: milk } = await supabase
    .from('bread')
    .select('milk')
    .eq('user', id);
    const milkAsInteger = milk&& milk.length > 0 ? parseInt(milk[0].milk, 10) : null;
    console.log('Milk Bread: ' + milkAsInteger);

    const { data: banana } = await supabase
    .from('bread')
    .select('banana')
    .eq('user', id);
    const bananaAsInteger = banana&& banana.length > 0 ? parseInt(banana[0].banana, 10) : null;
    console.log('Banana Bread: ' + bananaAsInteger);

    const { data: whole } = await supabase
    .from('bread')
    .select('whole')
    .eq('user', id);
    const wholeAsInteger = whole&& whole.length > 0 ? parseInt(whole[0].whole, 10) : null;
    console.log('Whole Bread: ' + wholeAsInteger);

    const { data: chocolate } = await supabase
    .from('cake')
    .select('chocolate')
    .eq('user', id);
    const chocolateAsInteger = chocolate&& chocolate.length > 0 ? parseInt(chocolate[0].chocolate, 10) : null;
    console.log('Chocolate Cake: ' + chocolateAsInteger);

    const { data: redvelvet } = await supabase
    .from('cake')
    .select('redvelvet')
    .eq('user', id);
    const redvelvetAsInteger = redvelvet&& redvelvet.length > 0 ? parseInt(redvelvet[0].redvelvet, 10) : null;
    console.log('Red Velvet Cake: ' + redvelvetAsInteger);

    const { data: vanilla } = await supabase
    .from('cake')
    .select('vanilla')
    .eq('user', id);
    const vanillaAsInteger = vanilla&& vanilla.length > 0 ? parseInt(vanilla[0].vanilla, 10) : null;
    console.log('Vanilla Cake: ' + vanillaAsInteger);

    const { data: chocolatecarmel } = await supabase
    .from('cake')
    .select('chocolatecarmel')
    .eq('user', id);
    const chocolatecarmelAsInteger = chocolatecarmel&& chocolatecarmel.length > 0 ? parseInt(chocolatecarmel[0].chocolatecarmel, 10) : null;
    console.log('Chocolate Carmel Cake: ' + chocolatecarmelAsInteger);

    const { data: cupcake } = await supabase
    .from('cake')
    .select('cupcake')
    .eq('user', id);
    const cupcakeAsInteger = cupcake&& cupcake.length > 0 ? parseInt(cupcake[0].cupcake, 10) : null;
    console.log('Cupcake Cake: ' + cupcakeAsInteger);

    const { data: pumpkin } = await supabase
    .from('pie')
    .select('pumpkin')
    .eq('user', id);
    const pumpkinAsInteger = pumpkin&& pumpkin.length > 0 ? parseInt(pumpkin[0].pumpkin, 10) : null;
    console.log('Pumpkin Pie: ' + pumpkinAsInteger);

    const { data: apple } = await supabase
    .from('pie')
    .select('apple')
    .eq('user', id);
    const appleAsInteger = apple&& apple.length > 0 ? parseInt(apple[0].apple, 10) : null;
    console.log('Apple Pie: ' + appleAsInteger);

    const { data: blueberry } = await supabase
    .from('pie')
    .select('blueberry')
    .eq('user', id);
    const blueberryAsInteger = blueberry&& blueberry.length > 0 ? parseInt(blueberry[0].blueberry, 10) : null;
    console.log('Blueberry Pie: ' + blueberryAsInteger);

    const { data: cherry } = await supabase
    .from('pie')
    .select('cherry')
    .eq('user', id);
    const cherryAsInteger = cherry&& cherry.length > 0 ? parseInt(cherry[0].cherry, 10) : null;
    console.log('Cherry Pie: ' + cherryAsInteger);

    const { data: lemon } = await supabase
    .from('pie')
    .select('lemon')
    .eq('user', id);
    const lemonAsInteger = lemon&& lemon.length > 0 ? parseInt(lemon[0].lemon, 10) : null;
    console.log('Lemon Pie: ' + lemonAsInteger);


const session = await stripe.checkout.sessions.create({
    line_items: [
        chipAsInteger && chipAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Oa3buFnsDVEDwHsbY8dm1uy',
            quantity: chipAsInteger,
        },
        sugarAsInteger && sugarAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Oa3eEFnsDVEDwHsxJ5YGgQw',
            quantity: sugarAsInteger,
        },
        peanutButterAsInteger && peanutButterAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Oa3oSFnsDVEDwHsIjQuP5DY',
            quantity: peanutButterAsInteger,
        },
        doubleChocolateAsInteger && doubleChocolateAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Oa3ooFnsDVEDwHs20FbWNVd',
            quantity: doubleChocolateAsInteger,
        },
        whiteChocolateAsInteger && whiteChocolateAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1Oa3pAFnsDVEDwHsYlCuc64M',
            quantity: whiteChocolateAsInteger,
        },
        whiteAsInteger && whiteAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWQFFnsDVEDwHsyw2mDrmB',
            quantity: whiteAsInteger,
        },
        wheatAsInteger && wheatAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWRiFnsDVEDwHsmRMBM7Pp',
            quantity: wheatAsInteger,
        },
        milkAsInteger && milkAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWT5FnsDVEDwHs5DmuKDcW',
            quantity: milkAsInteger,
        },
        bananaAsInteger && bananaAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWU5FnsDVEDwHsvdJxm266',
            quantity: bananaAsInteger,
        },
        wholeAsInteger && wholeAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWV5FnsDVEDwHsOSC5pXe6',
            quantity: wholeAsInteger,
        },
        chocolateAsInteger && chocolateAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWmNFnsDVEDwHso4jVKq6r',
            quantity: chocolateAsInteger,
        },
        vanillaAsInteger && vanillaAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWnSFnsDVEDwHsvyi05Jol',
            quantity: vanillaAsInteger,
        },
        redvelvetAsInteger && redvelvetAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWoYFnsDVEDwHsraFtJBQz',
            quantity: redvelvetAsInteger,
        },
        chocolatecarmelAsInteger && chocolatecarmelAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWpsFnsDVEDwHs5uoe1oc9',
            quantity: chocolatecarmelAsInteger,
        },
        cupcakeAsInteger && cupcakeAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaWrAFnsDVEDwHsPqASi0M7',
            quantity: cupcakeAsInteger,
        },
        pumpkinAsInteger && pumpkinAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaX36FnsDVEDwHshiQIvxRB',
            quantity: pumpkinAsInteger,
        },
        appleAsInteger && appleAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaX4BFnsDVEDwHs6a36WxaW',
            quantity: appleAsInteger,
        },
        blueberryAsInteger && blueberryAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaX54FnsDVEDwHsTc33IQbs',
            quantity: blueberryAsInteger,
        },
        cherryAsInteger && cherryAsInteger > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaX5xFnsDVEDwHsYYxi8dzx',
            quantity: cherryAsInteger,
        },
        lemonAsInteger && lemonAsInteger  > 0 && {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1OaX6zFnsDVEDwHsxll0bgiL',
            quantity: lemonAsInteger,
        },
    ].filter(Boolean),
    mode: 'payment',
    success_url: `http://localhost:5173?success=true`,
    cancel_url: `http://localhost:5173?success=false`,
    
});
    
  res.redirect(303, session.url);
});


const chipPrice = 2.99;
const sugarPrice = 3.99;
const peanutButterPrice = 4.99;
const doubleChocolatePrice = 5.99;
const whiteChocolatePrice = 6.99;

const whitePrice = 2.99;
const wheatPrice = 3.99;
const milkPrice = 4.99;
const bananaPrice = 5.99;
const wholeGrainPrice = 6.99;

const pumpkinPrice = 2.99;
const applePrice = 3.99;
const blueberryPrice = 4.99;
const cherryPrice = 5.99;
const lemonPrice = 6.99;

const chocolatePrice = 2.99;
const vanillaPrice = 3.99;
const redVelvetPrice = 4.99;
const chocolateCarmelPrice = 5.99;
const cupCakePrice = 6.99;
 
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());



app.get(route + '/chip', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Chocolate-Chip', Price: chipPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious chocolate chip cookie.'});
});

app.get(route + '/sugar', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Sugar', Price: sugarPrice, Description: 'A delicious sugar cookie.'});
});

app.get(route + '/peanutButter', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Peanut-Butter', Price: peanutButterPrice, Description: 'A delicious chocolate cookie.'});
});

app.get(route + '/doubleChocolate', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Dbl-Chocolate', Price: doubleChocolatePrice, Description: 'A delicious double chocolate cookie.'});
});

app.get(route + '/whiteChocolate', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'White-Chocolate', Price: whiteChocolatePrice, Description: 'A delicious white chocolate cookie.'});
});

app.get(route + '/white', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'White', Price: whitePrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious loaf of white bread.'});
});

app.get(route + '/wheat', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Wheat', Price: wheatPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious loaf of wheat bread.'});
});

app.get(route + '/milk', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Milk', Price: milkPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious loaf of milk bread.'});
});

app.get(route + '/banana', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Banana', Price: bananaPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious loaf of banana bread.'});
});

app.get(route + '/wholegrain', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Whole Wheat', Price: wholeGrainPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious loaf of whole grain bread.'});
});

app.get(route + '/pumpkin', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Pumpkin', Price: pumpkinPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious pumpkin pie.'});
});

app.get(route + '/apple', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Apple', Price: applePrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious apple pie.'});
});

app.get(route + '/blueberry', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Blueberry', Price: blueberryPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious blueberry pie.'});
});

app.get(route + '/cherry', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Cherry', Price: cherryPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious cherry pie.'});
});

app.get(route + '/lemon', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Lemon', Price: lemonPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious lemon pie.'});
});

app.get(route + '/chocolate', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Chocolate', Price: chocolatePrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious chocolate cake.'});
});

app.get(route + '/redvelvet', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Red-Velvet', Price: redVelvetPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious red-velvet cake.'});
});

app.get(route + '/vanilla', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Vanilla', Price: vanillaPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious vanilla cake.'});
});

app.get(route + '/chocolatecarmel', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'Caramel', Price: chocolateCarmelPrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious chocolate-carmel cake.'});
});

app.get(route + '/cupcake', async (req: Request, res: Response) => {
    return res.status(200).json({Title: 'CupCake', Price: cupCakePrice, Image: rootDomain + '/images/chip.jpg', Description: 'A delicious cupcake.'});
});

app.get(route + '/config', async (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
      
    });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




