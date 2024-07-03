import {Post, DocumentResponse, ProfileInfo} from "@/types"
import {addDoc, query, collection, orderBy, getDocs, where, doc, getDoc, deleteDoc, updateDoc} from "firebase/firestore"
import {db} from '@/firebaseConfig'

const COLLECTION_NAME="posts";  

//      
//     collection(db, COLLECTION_NAME)          -->     Table Name  
//       
//     docRef = doc(db, COLLECTION_NAME, id)  
//     return getDoc(docRef)                    -->     Matching Row / Record from given Table Name
//      
//     q = query(collection, orderBy/where)                                        
//     return getDocs(q)                        -->     SELECT / READ WITH ORDER-BY AND WHERE
//        
//     addDoc/updateDoc/deleteDoc               -->     INSERT/UPDATE/DELETE
//      

export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post) 
}

export const getPosts = async () => {

    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc")) 
        const querySnapshot = await getDocs(q)
        const tempArr: DocumentResponse[] = []

        if( querySnapshot.size > 0) {

            querySnapshot.forEach((doc) =>{
                    const data = doc.data() as Post
                    const docResponse: DocumentResponse = { id: doc.id, ...data }
                    console.log('getPosts() ', 'docResponse: ', docResponse)
                    tempArr.push(docResponse)
            });

            return tempArr ;
        } else {
            console.log('No Documents')
        }
         
    } catch (error) {
        console.log(error);
    }

}

export const getPostByUserId = (userid: string) => {
    const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userid))
    return getDocs(q)
}


export const getPost = (postId: string) => {
    const docRef = doc(db, COLLECTION_NAME, postId)
    return getDoc(docRef)
}

export const deletePost = (id: string) => {
    return deleteDoc(doc(db, COLLECTION_NAME, id))
}

/* update number of likes and list of liked users for a post / document */
export const updateLikesOnPost = (
    id: string,
    likedUsers: string[],
    likes: number
) => {
    const docRef = doc(db, COLLECTION_NAME, id)
    return updateDoc(docRef, {likes: likes, likedUsers: likedUsers})
}

/* when user updates his profile information, then update his username and profile-pic on all his previous posts */
export const updateUserInfoOnPosts = async (profileInfo: ProfileInfo) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==", profileInfo.user?.uid ))
    const querySnapshot = await getDocs(q)

    if(querySnapshot.size > 0) {
       
       querySnapshot.forEach((document) => {
            const docRef = doc(db, COLLECTION_NAME, document.id)
            updateDoc(docRef, {userName: profileInfo.displayName, photoURL: profileInfo.photoURL})
       })

    } else {
        console.log('User does not have any posts');
    }

}

