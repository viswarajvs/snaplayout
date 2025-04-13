### Date
14-April-2025

### Location of deployed application
https://viswarajvs.github.io/snaplayout-ui/
Since the backend is hosted on Render's free tier, the service may go into sleep mode or become temporarily unresponsive due to inactivity. 
In such cases, a manual restart from the Render dashboard might be necessary to resume operations.

### Time spent
8 hours

### Assumptions made
While building this project, my main assumption was that everything in the UI should be driven by the layout JSON. 
I didn’t want to hardcode anything—not even field labels or table columns. The idea is, the structure comes from the layout config,
 and the actual data comes from a separate API response. So when I render the UI, I just read from that layout—whether it's a text field, 
 group, or even a table—and bind it dynamically to the corresponding data. This way, I can easily reuse the same 
 frontend component for different types of documents or forms without touching the code again.

### Shortcuts/Compromises made
I did take a few shortcuts and made some practical calls to keep the momentum going. For example, on the Google OAuth side, 
instead of going deep into refresh token flows and handling token expiration fully, I kept it basic for now—just enough to get authenticated sessions working. 
If the token expires, the user might have to re-authenticate, which is something I can improve later. 
Also, I leaned quite a bit on third-party libraries like Ant Design for components and styling.

### Stretch goals attempted
I implemented Google OAuth authentication, which added secure login capability using users' Google accounts. 
This required handling token management and ensuring session validity across refreshes. 
Additionally, I deployed the app to demonstrate a fully functional end-to-end flow in a live environment.

### Instructions to run assignment locally
https://github.com/viswarajvs/snaplayout-ui
frontent - npm install -> npm run dev
https://github.com/viswarajvs/snaplayout-webapi
backend - npm install -> npm run dev

### What did you not include in your solution that you want us to know about?
Built the frontend using Vite and TypeScript, ensuring fast development, efficient builds, and strong type safety throughout the UI components.

### Other information about your submission that you feel it's important that we know
Made efforts to ensure the application is mobile-responsive across devices. Additionally, focused on building reusable components to promote consistency and minimize 
code duplication in future development.

### Your feedback on this technical challenge
Technically wasnt much of a challenge considering the complexity of the requirement