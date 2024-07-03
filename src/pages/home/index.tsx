import * as React from 'react';
import Layout from '@/components/layout';
import { useUserAuth } from '@/context/userAuthContext';
import { DocumentResponse } from '@/types';
import { getPosts } from '@/repository/post.service';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import PostCard from '@/components/postCard';
import Stories from '@/components/stories';


// data type of prop passed as input to functional component
interface IHomeProps {}

// react functional component
const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const {user} = useUserAuth()
  const [data, setData] = React.useState<DocumentResponse[]>([])

  const getAllPost = async () => {
    const docs: DocumentResponse[] = (await getPosts() || [])
    console.log('All posts are: ', docs)
    setData(docs)
  }

  React.useEffect( () => {
    if(user) {
      getAllPost();
    } 
  }, [])

  const renderPosts = () => {
    return data.map( (item) => {
      return <PostCard data={item} key={item.id} />
    });
    //return <div>Hello</div>
  } 

  return (
    <Layout>
      <div className="flex flex-col">

        <div className="relative mb-6 w-full text-gray-600">
          <Input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 py-2 rounded-sm text-base focus:outline-none"
            placeholder="search"
            type="search"
            name="search"
          />
          <button type="submit" className="absolute top-2.5 right-2.5">
            <Search className="w-5 h-5 text-gray-400"/>
          </button>
        </div>

        {/* why overflow-y-auto is used, is flex-col causing this ? do axes invert with flex-col */}
        <div className="mb-5 overflow-y-auto">
          <h2 className="mb-5">Stories</h2>
          <Stories />
        </div>

        <div className="mb-5">
          <h2 className="mb-5">Feed</h2>
          <div className="flex justify-center w-full">
            <div className="flex flex-col max-w-sm rounded-sm overflow-hidden">
              {data ? renderPosts() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};


// make it available to use with import
export default Home;