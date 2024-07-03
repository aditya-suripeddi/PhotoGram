
The aim of the repository is to solve a real world use case using relevant front end frameworks, libraries. The project is taken from [PhotoGram | Dipesh Malvia](https://www.youtube.com/watch?v=OKIaDk8sIbM)



## Chapters:


Understand how the project is created and how different lego blocks (vite, firebase, shadcn-ui) are assembled. 



### Code Understanding / Todos:

*  refer <b>screenshots</b> folder for helpful visuals to understand certain concepts

*  <b>write from scratch pending:</b> JSX of postCard, editProfile.tsx, profile/index.tsx, repository/user.service.ts,
                                      userList (suggest users to follow), deploy app


*  key events of regular components: onClick for Button, handleSubmit for form submit

*  tailwind styling layer: understand the layout and shadcn components made with tailwind

*  [dependencies vs devDependencies in package.json](https://stackoverflow.com/a/22004559)
    and -D option in `npm install -D tailwindcss postcss autoprefixer`
         
```bash
         $ npm help install
           •   -D, --save-dev: Package will appear in your devDependencies.

```  

* <b>npx vs npm an entry point:</b> 
  
  NPM is a package manager used to install, delete, and update Javascript packages on your machine. NPX is a package executer, and it is used to execute javascript packages directly, without installing them
  
  [npx vs npm](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm)
  

* creating vite-react-typescript project again with `npm create vite@latest` created starter with `tsconfig.app.json` along with `tsconfig.json` and `tsconfig.node.json`.
  understanding the concept behind the two files and how to use them is not yet clear. 
  
  the original project in github did not have `tsconfig.app.json` and `tsconfig.json` referenced the path of `tsconfig.node.json`

  the entry point for this is probably related to [project references in typescript](https://www.typescriptlang.org/docs/handbook/project-references.html)




* [react-intro](https://react.dev/learn), [?: optional properties | property modifiers](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties), [! non-null assertion operator](https://blog.logrocket.com/understanding-exclamation-mark-typescript/)



* <b>react hooks reference links</b>>: [useContext: overview ](https://www.w3schools.com/react/react_usecontext.asp), [useEffect is a <b>react hook that helps you synchronize your component with external system</b>](https://react.dev/reference/react/useEffect), [useEffect w3schools](https://www.w3schools.com/react/react_useeffect.asp), [react hooks](https://dev.to/ishakmohmed/react-hooks-usecontext-useeffect-usestate-useref-summarized-like-crazy-short-concise-article-254k), [useCallBack](https://react.dev/reference/react/useCallback)



* <b>react-router-dom reference links</b>: [react-router-dom navigate](https://reactrouter.com/en/main/components/navigate) and [useNavigate, Navigate, useLocation](https://dev.to/cjreads665/usenavigatenavigate-and-uselocation-in-react-router-v6-lip)


* [what are side effects in React?](https://blog.stackademic.com/concept-clear-of-onauthstatechanged-e8dddd4ff5c8) and  [clear concept of onAuthStateChanged](https://blog.stackademic.com/concept-clear-of-onauthstatechanged-e8dddd4ff5c8)

* <b>"Top of component" in React can refer to a few different things, depending on the context:</b>

    1. Top-Level Component: This refers to the component at the very top of your component hierarchy. It's often the component rendered by the ReactDOM.render() method,
                            acting as the entry point for your entire application.

    2. Top Level of a Functional Component: Within a functional component, the "top level" refers to the code directly within the function body, before any return statement.
                                            This is where you typically declare variables, call hooks like useState and useEffect, and perform calculations.
       Example: JavaScript


    3. Positioning with CSS: If you're talking about visually positioning something at the top of a component using CSS, you'd typically use properties 
                             like top: 0, align-items: flex-start (in flexbox), or justify-content: flex-start (in flexbox for vertical alignment).


```ts
// top level of functional component
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0); // Top level

  return (
    <div>
      <p>Count: {count}</p> // JSX returned
    </div>
  );
}
```

* useEffect setup and clean-up: 


```Connecting to an external system 
  
    Some components need to stay connected to the network, some browser API, or a third-party library, while they are displayed on the page.\
    These systems aren’t controlled by React, so they are called external.

    To connect your component to some external system, call useEffect at the top level of your component:
```

  ```ts
      import { useEffect } from 'react';
      import { createConnection } from './chat.js';

      function ChatRoom({ roomId }) {
        const [serverUrl, setServerUrl] = useState('https://localhost:1234');

        useEffect(() => {
        	const connection = createConnection(serverUrl, roomId);
          connection.connect();
        	return () => {
            connection.disconnect();
        	};
        }, [serverUrl, roomId]);
        // ...
   }
   ```

```
    You need to pass two arguments to useEffect:

    A setup function with setup code that connects to that system.
    It should return a cleanup function with cleanup code that disconnects from that system.
    A list of dependencies including every value from your component used inside of those functions.
    React calls your setup and cleanup functions whenever it’s necessary, which may happen multiple times:

    Your setup code runs when your component is added to the page (mounts).
    After every re-render of your component where the dependencies have changed:
    First, your cleanup code runs with the old props and state.
    Then, your setup code runs with the new props and state.
    Your cleanup code runs one final time after your component is removed from the page (unmounts).
    Let’s illustrate this sequence for the example above.

    When the ChatRoom component above gets added to the page, it will connect to the chat room with the initial serverUrl and roomId.
    If either serverUrl or roomId change as a result of a re-render (say, if the user picks a different chat room in a dropdown),
    your Effect will disconnect from the previous room, and connect to the next one. When the ChatRoom component is removed from the
    page, your Effect will disconnect one last time.
```


*  <b> note:</b>  copy the `app/index.css` generated with `shadcn-ui` installation to `src/index.css` 

*  <b>firestore api</b>:
```ts
//     collection(db, COLLECTION_NAME)          -->     Table Name  
//
//     docRef = doc(db, COLLECTION_NAME, id)  
//     return getDoc(docRef)                    -->     Matching Row / Record from given Table Name
//
//     q = query(collection, orderBy/where)                                        
//     return getDocs(q)                        -->     SELECT / READ WITH ORDER-BY AND WHERE
//
//     addDoc/updateDoc/deleteDoc               -->     INSERT/UPDATE/DELETE
```

* configuring authentication and firestore database on firebase requires some minor settings and changes,
  refer screenshots folder and the project video for any errors with firebase services.  
  

* [handy uploadcare transformation for previewing images selected for upload](https://app.uploadcare.com/projects/1c929e8779d9baa05475/delivery/image-processing#overlay-image):  ${file.cdnUrl}-/scale_crop/500x500/center/

* [read tailwind docs, with flow of topics and one layer at a time](https://tailwindcss.com/docs/installation)


* terminology: <b>destructuring</b> an object (can be a parameter passed to function) to attibutes you need


* styling: [aspect-video](https://tailwindcss.com/docs/aspect-ratio), [place-self-end](https://tailwindcss.com/docs/place-self), [inset-0](https://tailwindcss.com/docs/top-right-bottom-left), [tailwind grid: default grid has only one column](https://tailwindcss.com/docs/top-right-bottom-left), [position](https://tailwindcss.com/docs/position): offsets on this page means top-2 left-0 etc, [display](https://tailwindcss.com/docs/display) when to use other values like inline-flex etc,  [z-index](https://tailwindcss.com/docs/z-index): overlaying divs / controlling stack order (3d positioning) of elements, [flex](https://tailwindcss.com/docs/flex): controlling how flex items grow and shrink, [what is the purple dashed line area ?](https://stackoverflow.com/questions/67252231/what-is-the-purpose-of-this-purple-dashed-line-area), [inline-flex](https://tailwindcss.com/docs/display#inline-flex): create inline flex container that flows with text, [style filter invert](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert), <b>how does one know all the attributes available and their usage on shadcn-component ? Textarea supports value, onChange, placeholder attributes?</b>, [useCallBack](https://www.geeksforgeeks.org/react-js-usecallback-hook/), [cursor](https://tailwindcss.com/docs/cursor), [overflow](https://tailwindcss.com/docs/overflow)


*  <b> is it required to add w-full in a div or block element </b>:

```
The width of a block-level element, such as a <div> or <p> tag, in HTML is the length of the page by default. Block-level elements take up the full width available, stretching to the left and right as far as possible. They also automatically start on a new line and have some space (margin) added before and after them by browsers
```


* <b>styling idioms phrases</b>:

   1. The  ----OR----- separator (used in signup and login page)

     ```ts
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>
            </div>
     ```


  2. Label and input to read email (used in signup and login page)


     ```ts
          <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="john.doe@example.com"          
              />
          </div>
     ```

  3. Grid of images (used in signup and login page):

  ```ts

          <div className="bg-slate-800 w-full h-screen">
            <div className="container mx-auto flex p-6 h-full">
              <div className="flex justify-center items-center w-full">
                <div className="p-6 w-2/3 hidden lg:block">
                  <div className="grid grid-cols-2 gap-2">
                      <img
                            className="w-2/3 h-auto aspect-video rounded-3xl place-self-end" 
                            src={image2}
                      />
                      <img
                            className="w-2/4 h-auto aspect-auto rounded-3xl" 
                            src={image1}
                      />
                        <img
                            className="w-2/4 h-auto aspect-auto rounded-3xl place-self-end" 
                            src={image4}
                      />
                        <img
                            className="w-2/3 h-auto aspect-video rounded-3xl" 
                            src={image3}
                      />
                  </div>
                </div>
              </div>
            </div>  
          </div>
          
  ```

4.  <b>used in src/layout/index.tsx</b>: take screen height, display:hide element on smaller screens, display:block on large screens, fixed: position element relative to browser window and offsets w.r.t viewport

```ts
 <aside classname="h-screen hidden lg:block  fixed top-0 left-0 z-40  bg-gray-800 flex gap-x-4">
 </aside>
 ```  
              
5. <b>gray overlay on myphotos with number of likes and heart icon</b>:

```ts
<div key={item.photos[0].uuid} className="relative">                        
          <div className="absolute inset-0
                          w-full h-full
                          group transition-all duration-200
                          bg-transparent
                        hover:bg-slate-950/75">  

            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">{item.likes} likes</div>
            </div>          
          
          </div>
          <img src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`} />
        </div>
```

### Uploadcare

* Refer getting started guide on uploadcare project portal and use the [examples repository](https://github.com/uploadcare/blocks-examples/blob/main/examples/react-uploader/package.json) to update uploadcare to use 
latest version and understand the semantics / setting up for latest version

* explore uploader-configurator by clicking FileUploader tab on upload care portal, to customize the upload popup 


### Errors / bugs:

*  <b>make sure to import components / functions from right packages</b>

```diff
- import { GoogleAuthProvider } from 'firebase/auth/web-extension'
+ import { GoogleAuthProvider } from 'firebase/auth'
```

* <b>import Label from radix-ui not the added shadcn-ui component</b>

```diff
- import { Input } from '@/components/ui/input'
+ import { Label } from "@radix-ui/react-label";
```


* <b>on firebase project portal -> Authentication -> Sign-In method (tab) -> Native providers -> Email/Password ->  Enable Email/Password</b>

### Flow:

<br>
<br>
1. <b>Project Setup Using Vite</b>:

  * [vitejs.dev/guide/](https://vitejs.dev/guide/)

```bash
      $ npm create vite@latest
          Need to install the following packages:
          create-vite@5.3.0
          Ok to proceed? (y) y
          ✔ Project name: … PhotoGram
          ✔ Package name: … photogram
          ✔ Select a framework: › React
          ✔ Select a variant: › TypeScript

          Scaffolding project in /home/adi/Downloads/github/github-setup/PhotoGram...

          Done. Now run:

            cd PhotoGram
            npm install
            npm run dev

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

         ✔ Writing components.json...
         ✔ Initializing project...
         ✔ Installing dependencies...

        Success! Project initialization completed. You may now add components.
```   

  * Install shadcn
  * `components.json` and `lib/utils.ts` is created with options that you have provided 
  * Add button component and check `/components/ui/button.tsx` is created
<br>
<br>


4. <b>Pages & Routes Setup</b>:

  * `npm i react-router-dom` 
  *  Create `pages/home,error,myphotos,login,profile,post,signup/index.html` files
  *  Install <b>Typescript React Code Snippets VSCode plugin</b>    
  *  In each of the above file use the snippet with shorthand `tsrsfc` and replace `App` with directory name
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

7. <b>Build User Signup Feature</b>

  * Setup `src/pages/signup.tsx` using [create-account.tsx](https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/cards/components/create-account.tsx) component from shadcn-ui github repo

  * Setup <b>card, input & label</b> shadcn components required for create-account.tsx (signup) 
    ```bash 
       $ npx shadcn-ui@latest add card input label
    ```

  * Add icons component from [shadcn-ui-github/icons](https://github.com/shadcn-ui/ui/blob/main/apps/www/components/icons.tsx)

  * From [Build FullStack Social Media App](https://github.com/dmalvia/Build_FullStack_Social_Media_App) take the
    code for `src/pages/signup.tsx`,  `src/types/index.tsx`, `src/index.css` copied from `app/index.css`, `src/assets/icons` and `src/assets/images`
   
  * Note: the above repo has 3 branches for each episode, switch to relevant branch as you follow along
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
             event and before user information is processed, UI is rendered.<em>The UI for protected routes will get rendered before we get the actual information of user.</em>

   * We need to hold the JSX `protectedRoutes/index.tsx` until we get the user information                         

   * <b>Loading state</b> is one way to handle this, we use `react-firebase-hooks` to this end.

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

    * 

<br>
<br>

15. <b>Uploadcare walkthrough</b>:
     
     * Setup uploadcare account

     * <b>The project uses an older version of uploadcare, refer the getting started page on your upload-care project and [*example repo](https://github.com/uploadcare/blocks-examples/blob/main/examples/react-uploader/package.json) to update the code to use latest version.</b> 

     * Follow project instructions for time being and use 
       `"@uploadcare/blocks": "0.31.1"`

       `npm i @uploadcare/blocks --save --exact`

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

    * 
    
    * 

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
