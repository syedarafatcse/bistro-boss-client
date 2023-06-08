import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContex } from '../../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../SocialLogin/SocialLogin';

const Login = () => {
   const { signInEmailPass } = useContext(AuthContex);
   const [disable, setDisable] = useState(true);
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/'

   useEffect(() => {
      loadCaptchaEnginge(6);
   }, []);

   const handleValidateCaptcha = (event) => {
      const user_captcha_value = event.target.value;
      if (validateCaptcha(user_captcha_value)) {
         setDisable(false)
      }
      else {
         setDisable(true)
      }
   };

   const handleLogin = (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      // console.log(email, password);

      signInEmailPass(email, password)
         .then(result => {
            const looegUser = result.user;
            console.log(looegUser);
            Swal.fire({
               title: 'User Login Successful!!',
               showClass: {
                  popup: 'animate__animated animate__fadeInDown'
               },
               hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
               }
            });
            navigate(from, { replace: true });
         })

         .catch(error => {
            console.log(error.message);
         })
   };

   return (
      <>
         <Helmet>
            <title>Bistro Boss | Login</title>
         </Helmet>
         <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
               <div className="text-center md:w-1/2 lg:text-left">
                  <h1 className="text-5xl font-bold">Login now!</h1>
                  <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
               </div>
               <div className="card md: w-1/2 max-w-sm shadow-2xl bg-base-100">

                  <form onSubmit={handleLogin} className="card-body">
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" />
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                           <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <LoadCanvasTemplate />
                        </label>
                        <input type="text" name="captcha" placeholder="Type the captcha above" className="input input-bordered" onBlur={handleValidateCaptcha} />
                     </div>

                     {/* TODO make button disable */}
                     <div className="form-control mt-6">
                        <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                     </div>

                  </form>
                  <label className="label">
                     <p><small>New here?</small><Link to='/register'><span className="label-text-alt link link-hover"> Create an account</span></Link></p>
                  </label>
                  <div className="divider">OR</div>
                  <SocialLogin />
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;