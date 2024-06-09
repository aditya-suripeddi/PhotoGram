import { useUserAuth } from '@/context/userAuthContext';
import { DocumentResponse } from '@/types';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import image1 from '@/assets/images/image1.jpg';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';


interface IPostCardProps { 
    data: DocumentResponse;

}

{/* https://ui.shadcn.com/docs/components/card: displays card with header, content and footer */}
const PostCard: React.FunctionComponent<IPostCardProps> = ({data}) => {
    const { user } = useUserAuth() ;

    // likes: number of likes for a past
    // isLike: has the currently logged in user liked a post
    const [ likesInfo, setLikesInfo ] =
     React.useState<{likes: number, isLike: boolean}>
     ({ likes: data.likes, isLike: data.userlikes.includes(user?.uid) ? true: false});

    

  return (
    <Card className="mb-6">
        <CardHeader className="flex flex-col p-3">
            <CardTitle className="text-sm text-center flex">
                <span className="mr-2">
                    <img src={image1} 
                     className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover" />
                </span>
                <span>Guest_User</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <img src={data.photos ? data.photos[0].cdnUrl : ""}/>
        </CardContent>
        <CardFooter className="flex flex-col p-3">
            <div className="flex justify-between w-full mb-3">
                <HeartIcon className={cn("mr-3", "cursor-pointer")} />
                <MessageCircle className="mr-3" />
            </div>
            <div className="w-full text-sm">{0} likes</div>
            <div className="w-full text-sm">
                <span>Guest_User</span>:{data.caption}
            </div>
        </CardFooter>
    </Card>
  );
};

export default PostCard;
