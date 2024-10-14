
import ToastMessages from '@splunk/react-toast-notifications/ToastMessages';
import { Outlet, Link } from "react-router-dom";

import getTheme from '@splunk/themes/getTheme';
const baseTheme = getTheme({family: 'prisma', colorScheme: 'dark', density: 'comfortable' });

const DefaultLayout = (props)=> {  
    return(
        <div>
            <nav style={{paddingBottom: baseTheme.spacingMedium}}>
                <Link style={{color: baseTheme.interactiveColorPrimary}} to="/">Splunk Demo App</Link>
            </nav>
            <ToastMessages />
            <Outlet />
        </div>
    );
}

export default DefaultLayout;
