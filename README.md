## Chapters:

Understand how the project is created, different lego blocks (vite, firebase, shadcn-ui) are assembled, code structure before deep dive into code, styling.


### Flow:

<br>
<br>
1. <b>Project Setup Using Vite</b>:

  * [vitejs.dev/guide/](https://vitejs.dev/guide/)

```bash
        $ npm create vite@latest

                Project name: PhotoGram
                Package name: photogram
                Select a framework: React
                Select a variant: Typescript

        $ npm install 

        $ npm run dev    
```
     
  * add following code to vite.config.ts
  
```typescript
     //  when we run app on local, it should start in browser
       server: {
             open: true,
             port: 3000,
       }
```
 
<br>
<br>

2. <b>Firebase Project Setup</b>
 
  * Signup on [console.firebase.google.com](https://console.firebase.google.com/)
  * Create a new <em>web app project</em> with name `photogram`
  * Skip Google Analytics Add-on
  * Select <em>npm</em> for firebase SDK setup and configuration  
  * Install firebase
```bash 
       $ npm install firebase
```
  * Create `photogram/src/firebaseConfig.ts` and copy paste firebase initialization code with configurations
  * Create `photogram/src/.env` file, copy firebase settings and reference them from `photogram/src/firebaseConfig.ts`
  * Setup `auth` and `db` variables from firestore 
```ts
      export const auth = getAuth(app);
      export const db = getFirestore(app);

      export default app;
```

<br>
<br>

3. <b>Install Shadcn/ui & Tailwind CSS</b>:

  * Follow the steps 1 to 4 mentioned in [shadcn-docs-installation-vite](https://ui.shadcn.com/docs/installation/vite)   
  * Install shadcn
```bash
       $ npx shadcn-ui@latest init
         ✔ Would you like to use TypeScript (recommended)?  yes
         ✔ Which style would you like to use?  Default
         ✔ Which color would you like to use as base color?  Gray
         ✔ Where is your global CSS file? app/index.css
         ✔ Would you like to use CSS variables for colors? yes
         ✔ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) › <enter> // leave blank
         ✔ Where is your tailwind.config.js located? tailwind.config.js
         ✔ Configure the import alias for components: @/components
         ✔ Configure the import alias for utils: @/lib/utils
         ✔ Are you using React Server Components? no
         ✔ Write configuration to components.json. Proceed? yes
```   
  * Install shadcn
  * `components.json` and `lib/utils.ts` is created with options that you have provided 
  * Add button component and check `/components/ui/button.tsx` is created

<br>
<br>


4. <b>Pages & Routes Setup</b>:

  * `npm i react-router-dom` 
  *  Create `pages/home,error,myphotos,login,profile,post,signup/index.html` files
  *  Install <b>Typescript React Code Snippets plugin</b>    
  *  In each of the above file use the snippet with shorthand `tsrsfc` and replace `App` with 
     directory name
  *  Create `routes.tsx` and add `CreateBrowserRouter`


<br>
<br>

5. <b>Protecting Private Routes</b>:

  * Create `src/components/ui/ProtectedRoutes`
  * Update `routes.tsx` to protect all routes / pages save for `login` and `signup`  

<br>
<br>

6. <b>User Auth Context Api Setup</b>:

  * Create `src/context/userAuthContext.tsx`

<br>
<br>

7. <b>Build User Signup Feature</b>:

  * Setup `src/pages/signup.tsx` using [create-account.tsx](https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/cards/components/create-account.tsx) component from shadcn-ui github repo

  * Setup card, input & label shadcn components required for create-account.tsx (signup) 
    ```bash 
       $ npx shadcn-ui@latest add card input label
    ```

  * Add icons component from [shadcn-ui-github/icons](https://github.com/shadcn-ui/ui/blob/main/apps/www/components/icons.tsx)

  * From [Build FullStack Social Media App](https://github.com/dmalvia/Build_FullStack_Social_Media_App) take the
    code for `src/pages/signup.tsx`,  `src/types/index.tsx`, `src/index.css`, `src/assets/icons` and `src/assets/images`
   

<br>
<br>

8. <b>Build User Login Feature</b>:

  * Setup `src/pages/login.tsx`  


<br>
<br>

9.  <b>Resolve Firebase Issues</b>:
      
   * Add Email and Google Authentication providers on firebase portal 
   
<br>
<br>

10. <b>Resolve Page Refresh Issue (react-firebase-hooks)</b>:

   * Problem: On signup and login, firebase provides user details to the app and 
              home page is loaded. Refreshing the page reloads the login/signup 
              despite having the user details.

   * Reason: In `src/context/userAuthContext.tsx`, a page refresh fires `onAuthStateChange` 
             event and before user information is processed, UI is rendered.
             
             <em>The UI for protected routes will get rendered before we get the 
             actual information of user.<em>

   * We need to hold the JSX `protectedRoutes/index.tsx` until we get the user information                         

   * Loading state is one way to handle this, we use `react-firebase-hooks` to this end.

<br>
<br>

11. <b>Design App Layout</b>:

   * Setup `src/layout/index.tsx` to design app layout. 
   
   * Three sections form the layout: center for content (feed), sidebar for navigation and right side column for friends suggestion

<br>
<br>

12. <b>Design Sidebar Navigation</b>:
    
    * Add JSX for navbar items 

<br>
<br>

13. <b>Adding Layout on all Pages</b>:

    * Wrap all page components in the created Layout component

<br>
<br>

14. <b>Create Post Design</b>:

  

<br>
<br>

15. <b>Uploadcare walkthrough</b>:
     
     * Setup uploadcare account

     * The instructions / versions on getting started uploadcare has updates and 
       differs from the project-video 

     * Follow project instructions for time being and use 
       `"@uploadcare/blocks": "0.31.1"`

     * create a new upload-care project in your account and 
        use the api key shown in getting started page for the JSX code

     * upload-care portal saves the uploaded files, generates id, optimizes images and provides a    
       CDN URL for image preview (you can change pixel resolution in this url)
       
     * image operations are carried out by suffixing operations as path parameters in CDN URL of uploaded image
        to explore and use image optimization / transformations / operations go to `upload-care project page > files tab > modify > click learn more`, read the docs to meet your use-case requirements. For ex: user profile pic should appear as a small circle on his post
        but image he posts should appear with a certain size, such image operations can specified as part of URL at fetch / load time to upload care

     * you can customise uploader configuration (widget/popup) and get corresponding code 
       which you can import into your project



<br>
<br>

16. <b>Integrate Uploadcare to Project</b>:

     * Create `FileUploader` component in `src/components/fileUploader/index.ts` 
     * Add `FileUploader` component in `src/pages/posts/index.ts`
     * Check preview to confirm upload-care setup is working 

<br>
<br>

17. <b>Create Interfaces & Handle Post Form</b>:
    
    * Add Post, PhotoMeta and FileEntry types in `src/types/index.ts`
    * Add File
<br>
<br>

18. <b>Create File Uploader Component</b>:

<br>
<br>

19. <b>Uploadcare Image Optimisation & Transformation</b>:

<br>
<br>

20. <b>Handle Create Post</b>:

<br>
<br>

<br>
21. <b>Firestore DB Setup & Post Service</b>:

    * Setup cloud firestore on firebase 
    * Add CRUD methods on `post` resource 
    * Refer https://firebase.google.com/docs/firestore/manage-data/add-data

<br>
<br>

22. <b>Complete Create Post Feature</b>:

<br>
<br>

23. <b>Build My Photos - Fetch User Photos</b>:

<br>
<br>

24. <b>Build My Photos - Display User Photos</b>:

<br>
<br>


25. <b>Home Page Design</b>:

<br>
<br>

26. <b>Fetch Feeds/Posts</b>:

<br>
<br>

27. <b>User Stories Component </b>:

<br>
<br>

28. <b>Post Card Component</b>:

<br>
<br>

29. <b>Post Like/Dislike Feature</b>:

<br>
<br>

30. <b>User Profile Component & Feature </b>:

<br>
<br>

31. <b>Edit Profile Component</b>:

<br>
<br>

32. <b>User Profile Collection & Service</b>:

<br>
<br>

33. <b>FileUploader (Uploadcare) Profile Picture</b>:

<br>
<br>

34. <b>Update & Create User Profile in Firestore DB</b>:

<br>
<br>

35. <b>Sync User Profile With Firebase User</b>:

<br>
<br>

36. <b>Create Post With User Info</b>:

<br>
<br>

37. <b>Sync User Post with User Profile</b>:

<br>
<br>