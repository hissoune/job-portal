import User from '@/app/models/User';
export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    salary: number;
    date: string;
    image: string;
  }
  

  export interface  User{

    id:string,
    name:string,
    email:string
  }
  

  export interface  Application{

    _id:string,
    user:User,
    jobTitle:string,
    status:string,
    note:string,
    resume:string
    created_at:Date
    
  }
  