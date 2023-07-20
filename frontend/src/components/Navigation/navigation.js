import React from "react";

const Navigation = ({onRouteChange, isSignedIn, route}) => {

    if (route === 'home') {
        return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('signIn')}> Sign Out </p>
        </nav>) 
    } else if (route === 'signIn'){
        return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('register')}> Register </p>
        </nav>) 
    } else if (route === 'register'){
        return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('signIn')}> Sign In </p>
        </nav>
        )
    
    }


}

export default Navigation;