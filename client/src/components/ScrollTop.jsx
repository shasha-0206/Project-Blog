import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {

    // this is a hook used to track routes change ex : Home -> Profile  or singin -> signup
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // scroll to the top whenever the route changes
    }, [location]); 

    return null;
};

export default ScrollToTop;
