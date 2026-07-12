# Frontend Take-Home: Bundle Builder
## Running instructions

Project WebLink: https://cam-shop-amber.vercel.app/
<ol>
<li>Clone this repository.</li>
<li>Open Terminal and CD to cam-shop-frontend.</li>
<li>Install dependencies: <code>npm install</code>.</li>
<li>Run development server <code>npm run dev</code> </li>
</ol>

## Tech Stack decisions
Frontend: React.js <br>
CSS: Vanilla <code style="font-size:13px;"> Vanilla CSS provided more control over styling and demonstrates my skills much better than CSS frameworks. </code>  
Backend: None


I initially considered using <code>TypeScript</code> and creating an <code>Express.js</code> server, but due to the time constraints of this assessment, I chose to prioritize the core frontend requirements. Instead, I simulated async functionalities by using .json files in the /public directory.


## Styling decisions

The Figma design had an extra frame on the right which I initially tried to make it fit into a tablet screen but it didn't work. According to rubric this is a 2 column experience so I decided to ditch this extra design but I took inspiration from its product card on my small-screen version of the app.

I opted for CSS Flexbox and fluid values (rem, vw) when hardcoding pixel values was not needed to achieve the exact same Figma design. This allowed for a more responsive design and eased the transition to smaller screens.

Media queries were used at multiple view widths to ensure smooth transition from a large screen to a phone with everything in between. 



## Programming decisions

For the user's cart state object I opted for React Context API to prevent prop cluttering and ease the programming process.

<code>useReducer</code> could've been a good idea but I opted not to use it as standard state management in the context provider was very sufficient and I did not want to over-engineer and overcomplicate the project's maintainability.
