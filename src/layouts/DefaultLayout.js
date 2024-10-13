
import ToastMessages from '@splunk/react-toast-notifications/ToastMessages';
import { Outlet, Link } from "react-router-dom";

const DefaultLayout = (props)=> {  
    return(
        <div>
            <nav>
                Nav will go here
            </nav>
            <ToastMessages />
            <Outlet />
        </div>
    );
}

export default DefaultLayout;
