// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";

// import { Nav, Button } from "react-bootstrap";

// function Register(props) {
//   const { setIsLoggedIn, setSignUpModal, setShowModal, setMessage } = props;

//   const history = useHistory();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [imageURL, setImageURL] = useState("");
//   const [errorMessage, setErrorMessage] = useState(null);

//   const Register = async () => {
//     setSignUpModal(true);
//     setShowModal(true);
//     console.log(imageURL);
//     try {
//       const data = await createNewUser(
//         username,
//         password,
//         firstName,
//         lastName,
//         email,
//         imageURL
//       );

//       console.log(data);

//       if (data.name) {
//         setShowModal(false);
//         setSignUpModal(false);
//         setErrorMessage(data.message);
//       } else {
//         setToken(data.token);
//         setIsLoggedIn(true);
//         setMessage(data.message);
//         setShowModal(false);
//         setSignUpModal(false);
//         history.push("/");
//       }
//     } catch (error) {
//       setErrorMessage(
//         "User name or password is incorrect/ user not registered"
//       );
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div
//         className='login'
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           flex: "1",
//         }}>
//         <div
//           className='login-container'
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             width: "500px",
//           }}>
//           <div style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}>
//             {errorMessage ? (
//               <h5 style={{ color: "red", display: "inline", flex: "1"}}>{errorMessage}</h5>
//             ) : <h5 style={{display: "inline", flex: "1"}}></h5>}
//             <h1 style={{textAlign: "right", display: "inline", marginLeft: "0.2em"}}>Sign Up</h1>
//           </div>
//           <form
//             onSubmit={(event) => {
//               event.preventDefault();
//             }}>
//             <div style={{ display: "flex" }}>
//               <div
//                 style={{
//                   backgroundColor: "whitesmoke",
//                   width: "175px",
//                   height: "175px",
//                   borderRadius: "100%",
//                   overflow: "hidden",

//                 }}>
//                 <img
//                 style={{
//                   display: "block",
//                   marginRight: "auto",
//                   marginLeft: "auto",
//                 }}
//                   src={
//                     imageURL
//                       ? imageURL
//                       : "https://icon-library.com/images/profile-image-icon/profile-image-icon-25.jpg"
//                   }
//                   height='175px'
//                   alt=''
//                 />
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   flex: "1",
//                 }}>
//                 <h5>Profile Picture</h5>
//                 <input
//                   style={{
//                     color: "whitesmoke",
//                   }}
//                   type='url'
//                   value={imageURL}
//                   onChange={(event) => setImageURL(event.target.value)}
//                   placeholder='Enter URL for image'
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <h5>Email</h5>
//               <input
//                 style={{
//                   color: "whitesmoke",
//                 }}
//                 type='email'
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//                 placeholder='email'
//                 required
//               />
//             </div>
//             <div>
//               <h5>Username</h5>
//               <input
//                 style={{
//                   color: "whitesmoke",
//                 }}
//                 type='text'
//                 value={username}
//                 onChange={(event) => setUsername(event.target.value)}
//                 placeholder='username'
//                 required
//               />
//             </div>
//             <div>
//               <h5>Password</h5>
//               <input
//                 style={{
//                   color: "whitesmoke",
//                 }}
//                 type='password'
//                 value={password}
//                 onChange={(event) => setPassword(event.target.value)}
//                 placeholder='password'
//                 required
//               />
//             </div>
//             <div>
//               <h5>First Name</h5>
//               <input
//                 style={{
//                   color: "whitesmoke",
//                 }}
//                 type='text'
//                 value={firstName}
//                 onChange={(event) => setFirstName(event.target.value)}
//                 placeholder='First Name'
//                 required
//               />
//             </div>
//             <div>
//               <h5>Last Name</h5>
//               <input
//                 style={{
//                   color: "whitesmoke",
//                 }}
//                 type='text'
//                 value={lastName}
//                 onChange={(event) => setLastName(event.target.value)}
//                 placeholder='Last Name'
//                 required
//               />
//             </div>
//           </form>

//           <Button
//             variant='danger'
//             className='login-createbutton'
//             onClick={Register}>
//             Create Account
//           </Button>
//           <div
//             style={
//               {
//                 display: "flex",
//                 alignItems: "baseline",
//                 justifyContent: "center"
//               }
//             }>
//             <h5>Already have an account?</h5>{'    '}
//             <Nav
//               style={{}}
//               defaultActiveKey='/account/login'
//               as='ul'>
//               <Nav.Link style={{}} href='/account/login'>
//                 Log in!
//               </Nav.Link>
//             </Nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;