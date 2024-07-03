import Layout from '@/components/layout'
import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import FileUploader from '@/components/fileUploader'
import { FileEntry, PhotoMeta, Post } from '@/types'
import { useUserAuth } from '@/context/userAuthContext'
import { useNavigate } from 'react-router-dom'
import { createPost } from '@/repository/post.service'

// data type of prop passed as input to functional component
interface ICreatePostProps { }

// react functional component
const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {

  const navigate = useNavigate()
  const { user } = useUserAuth()
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] })

  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    likedUsers: [],
    userId: null,
    date: new Date()
  })

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Uploaded File Entry: ', fileEntry.files)
    console.log('The created post is: ', post)

    const photoMeta: PhotoMeta[] = fileEntry.files.map((file) => {
      return { cdnUrl: file.cdnUrl!, uuid: file.uuid! }
    });

    // why have the check ?
    // session may have expired/terminated ?
    if (!user) {
      navigate('/login')
      return 
    }
    const newPost: Post = {...post, photos: photoMeta, userName: user.displayName!,
                           userId: user?.uid, photoURL: user.photoURL!}

    console.log('The final post is: ', newPost)
    await createPost(newPost)
    navigate('/')
  }


  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            Create Post
          </h3>
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="caption">Photo Caption</Label>
                <Textarea className="mb-8" id="caption" placeholder="what's in your photo!"
                          value={post.caption}
                          onChange={
                              (e:React.ChangeEvent<HTMLTextAreaElement>) =>
                                  setPost({...post, caption: e.target.value})
                          } 
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-4" htmlFor="photo">Photos</Label>
                <FileUploader
                  fileEntry={fileEntry}
                  onChange={setFileEntry}
                  preview={true}
                />
              </div>
              <Button className="mt-4 w-32" type="submit" >Post</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};


// make it available to use with import
export default CreatePost;