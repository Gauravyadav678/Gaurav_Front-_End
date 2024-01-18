import { Navbar, Main, Product, Footer } from "../components";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Home() {
        
  const location = useLocation();
  const [userEmail, setUserEmail] = useState('');
  const userType = location.state ? location.state.userType : null;
  // useEffect(() => {
  
  //   // if (location.state && location.state.id) {
  //   //   setUserEmail(location.state.id);
  //   // }
  // }, [location.state]);

        console.log(userEmail)
  return (
    <>
      <Navbar userType={userType} />
      <Main  />
      {userType === 'seller' && <Product />}
      <Product  />
      <Footer  />
    </>
  )
}

export default Home