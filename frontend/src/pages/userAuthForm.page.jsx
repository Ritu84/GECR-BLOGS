import React, { useContext, useRef } from 'react'
import googleIcon from "../imgs/google.png"
import InputBox from '../components/input.component';
import {Link} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation';
import {Toaster, toast} from'react-hot-toast';
import axios from 'axios';
import {UserContext} from "../App"
import { StoreInSession } from '../common/session';
import { authWithGoogle } from '../common/firebase';




const UserAuthForm = ({type}) => {

    const authForm = useRef();

    let {userAuth, setUserAuth}= useContext(UserContext);

    const userAuthThroughServer=(serverRoute,formData )=>
    {
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute , formData)
        .then(({data})=>{
            StoreInSession("user", JSON.stringify(data));
            setUserAuth(data);
        } )
        // .catch(({response})=>{
        //     toast.error(response.data.error);
        // }) 
        
    }

    const handlesubmit= (e)=>{

       e.preventDefault();

       let serverRoute = type == "sign-in" ? "/signin" :"/signup";

       let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
       let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    //    access form data
    let form = new FormData(authForm.current);
    let formData={};

    for(let [key,value] of form.entries()){
        formData[key]=value;
    }
    // form validation
    let {fullname,email,password}=formData;
     
    if(fullname){
        if(fullname.length<3){
            return toast.error( "fullname must be more than 3 letters");
        }
    }
    if(!email.length){
        return toast.error( "Email is required");
    }
    if(!emailRegex.test(email)){
        return toast.error("Invalid email");
    }
    if(!passwordRegex.test(password)){
        return toast.error("Password must be 6-20 characters long and must contain at least one number, one uppercase and one lowercase letter")
    }
    userAuthThroughServer(serverRoute, formData);
       
    }

    const handleGoogleAuth =(e)=>{
          e.preventDefault();//preventing form from submission

          authWithGoogle().then(user=>{
              
              let serverRoute="/google-auth";
              let formData={
                access_token:user.accessToken
              }
              userAuthThroughServer(serverRoute,formData);

          })
          .catch(err=>{
            toast.error("trouble logging in through google");
            return  console.log(err);
          })


    }

  return (
   
     userAuth.access_token ?
     <Navigate to="/"/> :
     <AnimationWrapper value={type}>
     <section className='h-cover flex items-center justify-center'>
        <Toaster/>
        <form ref={authForm} className='w-[80%] max-w-[400px] ' onSubmit={handlesubmit}>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
                {type =='sign-in'? 'Welcome back' : 'Join Us today'}
            </h1>

           {/* sign-up page */}
            {
                type != "sign-in"? 
                <InputBox
                   name="fullname"
                   type="text"
                   placeholder="Full Name"
                   icon="fi-rr-user"
                /> : ""
            }
            {
                type != "sign-in"? 
                <InputBox
                   name="email"
                   type="email"
                   placeholder="Email"
                   icon="fi-rr-envelope"
                /> : ""
            }
            {
                type != "sign-in"? 
                <InputBox
                   name="password"
                   type="password"
                   placeholder="Password"
                   icon="fi-sr-lock"
                /> : ""
            }
            {/* sign-in page */}
            {
                type == "sign-in"? 
                <InputBox
                   name="email"
                   type="email"
                   placeholder="Email"
                   icon="fi-rr-envelope"
                /> : ""
            }
            {
                type == "sign-in"? 
                <InputBox
                   name="password"
                   type="password"
                   placeholder="Password"
                   icon="fi-sr-lock"
                /> : ""
            }

 {/* submit button for signin/signup */}
            <button className='btn-dark center mt-14 ' type='submit' >
                {type.replace("-"," ")}

            </button>
{/* line separator bet */}
            <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black
            font-bold'>
            <hr className='w-1/2 border-black'/>
            <p>or</p>
            <hr className='w-1/2 border-black'/>
            </div>

{/* with google */}
            <button className='btn-dark flex items-center justify-center gap-4 w-[90%] center'
            onClick={handleGoogleAuth}>
                <img src={googleIcon} className='w-5' />
            {type.replace("-"," ")} with Google
            </button>

            {
                type== "sign-in" ?
                <p className='mt-6 text-dark-grey text-xl text-center'>
                    Don't have an account?
                    <Link  to="/signup" className=" underline text-black ">
                    Sign up here.
                    </Link>
                </p>
                :
                <p className='mt-6 text-dark-grey text-xl text-center'>
                    Already have an account?
                    <Link to="/signin" className=" underline text-black ">
                    Sign in here.
                    </Link>
                </p>
            }

        </form>
        </section>
     </AnimationWrapper>
        
        
   
  )
}

export default UserAuthForm;