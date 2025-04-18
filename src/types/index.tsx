import { OutputFileEntry } from "@uploadcare/blocks";
import { User } from "firebase/auth";

export interface UserSignIn {
    email: string,
    password: string,
    confirmPassword: string
}

export interface UserLogIn {
    email: string,
    password: string
}

export interface FileEntry {
    files: OutputFileEntry[]
}

export interface PhotoMeta {
    cdnUrl: string,
    uuid: string
}

export interface Post {
    caption: string,
    photos: PhotoMeta[],
    likes: number,
    likedUsers:[],
    userId: string | null,
    userName?: string,
    photoURL?: string,
    date: Date
}

export interface ProfileInfo {
    user?: User,
    displayName?: string,
    photoURL?: string
}

export interface ProfileResponse {   
    id?: string,
    userId?: string,
    displayName?: string,
    photoURL?: string,
    userBio?: string
}

export interface DocumentResponse {
    id?: string,
    caption?: string,
    photos?: PhotoMeta[],
    likes?: number,
    likedUsers?: [],
    userName?: string,
    photoURL?: string,
    userId?: string | null,
    date?: Date
}


export interface ProfileInfo {
    user?: User;
    displayName?: string;
    photoURL?: string;
}

export interface UserProfile {
    userId?: string;
    displayName?: string;
    photoURL?: string;
    userBio?: string;
  }
  
  export interface ProfileResponse {
    id?: string;
    userId?: string;
    displayName?: string;
    photoURL?: string;
    userBio?: string;
  }
  