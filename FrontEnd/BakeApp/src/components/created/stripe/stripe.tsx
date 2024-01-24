import { component$} from '@builder.io/qwik'; // Import Signal from '@builder.io/qwik'
import Container from './stripeContainer'; // Import StripeContainers
interface AppState {
  showItem: boolean;
}

export default component$(function App(appState: AppState) {
appState.showItem = false; // Set appState.showItem to false
  return (
    <div class='App'>
      <h1>The Spatula Store</h1>
      {appState.showItem ? (
        <Container />
      ) : (
        <>
          <h3>$10.00</h3>
          <button onClick$={() => appState.showItem = true}>Purchase Spatula</button> {/* Use appState.showItem */}
        </>
      )}
    </div>
  );
});
       



	

