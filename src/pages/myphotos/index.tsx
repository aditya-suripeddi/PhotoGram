import * as React from 'react';
import Layout from '@/components/layout'
import { useUserAuth } from '@/context/userAuthContext';
import { DocumentResponse, Post } from '@/types';
import { getPostByUserId } from '@/repository/post.service';
import { HeartIcon } from 'lucide-react';

// data type of prop passed as input to functional component
interface IMyPhotosProps {}

// react functional component
const MyPhotos: React.FunctionComponent<IMyPhotosProps> = (props) => {
  const {user} = useUserAuth()
  const [data, setData] = React.useState<DocumentResponse[]>([])

  const getPostsByUser = async (userid: string) => {
    try {     
        const querySnapshot = await getPostByUserId(userid);
        const tempArr: DocumentResponse[] = []
        if(querySnapshot.size > 0) {
            querySnapshot.forEach( (doc) => {
                    const data = doc.data() as Post 
                    const docResponse: DocumentResponse = {id: doc.id, ...data}
                    console.log('getPostByUserId() ', 'docResponse: ', docResponse)
                    tempArr.push(docResponse)
            });
            setData(tempArr)
        } else {
            console.log('No Documents for this user')
        }
    } catch (error) {   
        console.log(error);
    }
  }

  React.useEffect(() => {
    if( user ) {
      getPostsByUser(user.uid);
    }
  }, [])


  const renderPhotos = () => {
    
    // render first photo from each post put out by user
    const renderPhoto = (item: DocumentResponse) => {
      return (
        <div key={item.photos[0].uuid} className="relative">
          
          {/*
                use inset-0 for top-0 bottom-0 left-0 right-0  
                use hover:bg-opacity-75 (hover:bg-slate-950/75)
          */}
          {/* <div className="absolute top-0 bottom-0 left-0 right-0
                          w-full h-full
                          group transition-all duration-200
                          bg-transparent
                        hover:bg-slate-950 hover:bg-opacity-75"> */}

                        
          <div className="absolute inset-0
                          w-full h-full
                          group transition-all duration-200
                          bg-transparent
                        hover:bg-slate-950/75">  

            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">{item.likes} likes</div>
            </div>          
          
          </div>
          <img src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`} />
        </div>
      )
    }
    

    return data.filter(item => item.photos && item.photos.length > 0).map(renderPhoto)
  }

  return (
      <Layout>
        <div className="flex justify-center">
          <div className="border max-w-3xl w-full">
            <h3 className="bg-slate-800 text-lg text-white text-center p-2">My Photos</h3>
            <div className="p-8">
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {data ? renderPhotos() : <div>...Loading</div>}
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );


};


// make it available to use with import
export default MyPhotos;