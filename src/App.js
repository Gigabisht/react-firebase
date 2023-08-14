import React, { useEffect, useState } from 'react'
import './App.css';
import Auth from './component/auth';
import { db ,auth,storage} from "./config/firebase";

import { getDocs, collection, addDoc,deleteDoc, doc, updateDoc  } from 'firebase/firestore';
import {ref,uploadBytes} from "firebase/storage";
const App = () => {
  const [movieList,setMovieList] = useState([])
  
  // New movie states
  const[newMovieTitle, setNewMovietitle] = useState("");
  const[newReleaseYear, setNewReleaseYear] = useState("0");
  const[IsnewMovieOscar, setIsnewMovieOscar] = useState("false");
  // updated state
  const[updatedTitle, setUpdatedTitle] = useState("")
  // file upload state
  const[fileUp, setFileUp] = useState(null);

  const moviescollectionRef = collection(db,"movies") 
  const getMovielist =async () =>{
    //  READ THE DATA
    //  SET THE MOVIE LIST
        try{
      const data = await getDocs(moviescollectionRef); 
      const filtereddata =  data.docs.map((doc)=>({
        ...doc.data(),id: doc.id,
       }))
        console.log(filtereddata); 
        setMovieList(filtereddata); 
      }catch(err){
          console.error(err);
        }
    
        };

  const deleteMovie = async (index)=>{
  try{ const movieDoc = doc(db,"movies",index);
    await deleteDoc(movieDoc); 
  //  setMovieList((current) =>
  //   current.filter((movieList) => movieList.id !==index)
  //   )
  getMovielist();

  }catch(err){
    console.error(err)
  }
  }; 
  const Updatetitle = async(index) =>{
    const movieDoc = doc(db,"movies",index);
    await updateDoc(movieDoc,{title: updatedTitle} ); 
    getMovielist();
  };      

  // 
  const Uploading = async() =>{
    if(!fileUp) return;
    const filesfolderref = ref(storage,`projectfile/${fileUp.name}`)
   try{ 
    await uploadBytes(filesfolderref,fileUp);
   }catch(err){
    console.error(err);
   }
  }
  useEffect(()=>{
    
    getMovielist();
  },[])
  const onSubmitMovie=async ()=>{
      try{
      await addDoc(moviescollectionRef,{title: newMovieTitle,
      releaseYear: newReleaseYear,
      receivedoscar: IsnewMovieOscar,      
      userid: auth?.currentUser?.uid,
    }); 
  getMovielist();
    }catch(err){
      console.error(err);
    }
  
  }

  return (
    <div className='App'>
      <Auth/>
      <div>
        <input placeholder='Movie title...' onChange={(e)=> setNewMovietitle(e.target.value)} type="string" />
        <input placeholder='release Year...' onChange={(e)=> setNewReleaseYear(Number(e.target.value))} type="number" />
        <input type="checkbox" checked={IsnewMovieOscar} onChange={(e) => setIsnewMovieOscar(e.target.checked)} />
         <label >Received an oscar</label>
         <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie)=>(
          <div>
            <h1 style={{color: movie.receivedoscar ?"green":"red"}}>{movie.title}</h1>
            
            <p>Date: {movie.releaseYear}</p>
           <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder='update title'onChange={(e) => setUpdatedTitle(e.target.value)} type="text" />
             <button onClick={() => Updatetitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>
      {/* firebase config */}
    <div>
      <input type="file" onChange={(e) => setFileUp(e.target.files[0])}/>
      <button onClick={Uploading}>Upload file</button>
    </div>
    </div>
  ) ;
}

export default App
