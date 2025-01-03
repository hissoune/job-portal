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
  
  