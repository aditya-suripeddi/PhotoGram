import { useUserAuth } from '@/context/userAuthContext';
import { updateLikesOnPost } from '@/repository/post.service';
import { DocumentResponse } from '@/types';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IPostCardProps { data: DocumentResponse; }

const PostCard: React.FunctionComponent<IPostCardProps> = ({data}) => {

    // user: User | null
    const {user} = useUserAuth()

    // in the list of users who liked this post, does the currently logged in user exist?
    const isUserLike = (data: DocumentResponse) => { 
         // user! (non-null asserter operator) tells typescript compiler that user will not be null
        return data.likedUsers && user && data.likedUsers.includes(user!.uid) ? true : false 
    }
    
    const initLikesInfo = {
        likes: data.likes ? data.likes : 0, 
        isUserLike: isUserLike(data)
    }

    const [likesInfo, setLikesInfo] =
     React.useState<{likes: number, isUserLike: boolean}>(initLikesInfo)
    

    const updateLikesOnClick = async (isUserLikePrev: boolean) => {

        // if user likes previously and clicks on like button, then decrement likes count
        // else if user did not like previously and clicks on button, then increment likes count
        const newLikesCount = isUserLikePrev ? likesInfo.likes - 1 : likesInfo.likes + 1

        setLikesInfo({
            likes: newLikesCount,
            isUserLike: !isUserLikePrev 
        })
        
        // if user likes previously and clicks on like button then remove userid from likedUsers of post
        // else if user did not like previously and clicks on like button then add userid to likedUsers of post
        if(isUserLikePrev) {
          data.likedUsers?.splice(data.likedUsers.indexOf(user!.uid), 1)
        } else {
          data.likedUsers = data.likedUsers ? data.likedUsers : []
          data.likedUsers?.push(user!.uid)
        }

        console.log(data)
        await updateLikesOnPost(data.id!, data.likedUsers!, newLikesCount)
    }

    // write from scratch pending:!! 
    //
    // return (
    // <Card className="mb-8">
    //     <CardHeader className="flex flex-col p-3">
            
    //     </CardHeader>
    // </Card>
    // )

    // copy pasted from ep-2 branch project repo github
    // #revisit and complete the above write from scratch!!
    return (
    <Card className="mb-6">
      <CardHeader className="p-3">
        <CardTitle className="text-sm flex justify-start items-center">
          <span className="mr-2">
            <img
              src={data.photoURL}
              className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover"
            />
          </span>
          <span>{data.userName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <img src={data.photos ? data.photos[0].cdnUrl : ""} />
      </CardContent>
      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              "mr-3",
              "cursor-pointer",
              likesInfo.isUserLike ? "fill-red-500" : "fill-none"
            )}
            onClick={() => updateLikesOnClick(likesInfo.isUserLike)}
          />
          <MessageCircle className="mr-3" />
        </div>
        <div className="w-full text-sm">{likesInfo.likes} likes</div>
        <div className="w-full text-sm mt-4">
          <span className="font-semibold">{data.userName}</span>: {data.caption}
        </div>
      </CardFooter>
    </Card>
);

};

export default PostCard;