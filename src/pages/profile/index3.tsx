import * as React from 'react';
import Layout from '@/components/layout'
import { useUserAuth } from '@/context/userAuthContext';

// data type of prop passed as input to functional component
interface IProfileProps {}

// react functional component
const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const {user} = useUserAuth()
  
    return (
        <Layout>
          <div>Profile</div>
        </Layout>
    );
};


// make it available to use with import
export default Profile;
