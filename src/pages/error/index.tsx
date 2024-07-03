import Layout from '@/components/layout';
import * as React from 'react';


// data type of prop passed as input to functional component
interface IErrorProps {
}


// react functional component
const Error: React.FunctionComponent<IErrorProps> = (props) => {
  return (
    <Layout>
      <div>Error</div>
    </Layout>
  );
};


// make it available to use with import
export default Error;
