import * as React from 'react'
import image2 from '@/assets/images/image2.jpg'
import image1 from '@/assets/images/image1.jpg'
import image3 from "@/assets/images/image3.jpg"
import image4 from '@/assets/images/image4.jpg'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '@/context/userAuthContext'
import { UserLogIn } from '@/types'


const initialValue: UserLogIn = { email: "", password: ""}

// data type of prop passed as input to functional component
interface ILoginProps {}

// react functional component
const Login: React.FunctionComponent<ILoginProps> = (props) => {

  const {googleSignIn, logIn} = useUserAuth();
  const navigate = useNavigate();
  const [userLogInInfo, setUserLogInInfo] = React.useState<UserLogIn>(initialValue);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      try {
          await googleSignIn();
          navigate('/');
      } catch (error) {
          console.log('Error:', error );
      }
  };

  const handleSubmit = async (e:React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
          console.log("The user info is: ", userLogInInfo);
          await logIn(userLogInInfo.email, userLogInInfo.password);
          navigate('/');
      } catch (error) {
          console.log('Error:', error);
      }
  };
  
  return ( 
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
                 <div className="max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm">
                     <Card>
                         <form onSubmit={handleSubmit}>
                             <CardHeader className="space-y-1">
                                 <CardTitle className="text-2xl text-center mb-4">PhotoGram</CardTitle>
                                 <CardDescription className="">Enter your email below to create your account</CardDescription>
                             </CardHeader>
                             <CardContent className="grid grid-cols-1 gap-4">
                                 <div className="grid">
                                     <Button variant="outline" onClick={handleGoogleSignIn}>
                                         <Icons.google className="mr-2 h-4 w-4" />
                                         Google
                                     </Button>
                                 </div>
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
                                 <div className="grid gap-2">
                                     <Label htmlFor="email">Email Address</Label>
                                     <Input 
                                       id="email"
                                       type="email"
                                       placeholder="john.doe@example.com"
                                       value={userLogInInfo.email}
                                       onChange= { (e:React.ChangeEvent<HTMLInputElement>) =>
                                         setUserLogInInfo({...userLogInInfo, email: e.target.value})
                                       }        
                                     />
                                 </div>
                                 <div className="grid gap-2">
                                     <Label htmlFor="password">Password</Label>
                                     <Input 
                                       id="password"
                                       type="password"
                                       placeholder="Password"     
                                       value={userLogInInfo.password}
                                       onChange={ (e:React.ChangeEvent<HTMLInputElement>) => 
                                         setUserLogInInfo({...userLogInInfo, password: e.target.value})
                                       }     
                                     />
                                 </div>
                             </CardContent>
                             <CardFooter className="flex flex-col">
                                 <Button className="w-full" type="submit">Log In</Button>
                                  <p className="mt-3 text-sm text-center">Don't have an account ? <Link to="/signup">Signup</Link></p>
                             </CardFooter>
                         </form>
                     </Card>
                 </div>
             </div>
         </div>
    </div>
 );

};


// make it available to use with import
export default Login;
