import React, {useEffect, useState} from 'react';
import CreateIdea from "./CreateIdea";
import FirebaseDb from "../Firebase/Firebase";
import ShowIdeas from "./ShowIdeas";


function Main() {
  const [request, setRequest] = useState({
    loading: false,
    data: null,
    error: false
  });
  const [currentId, setCurrentId] = useState('');
  const [categories, setCategories] = useState({});

  useEffect(() => {
    let isMounted = true;
    FirebaseDb.child('category').on('value', snapshot => {
      if (snapshot.val() != null){
        if (isMounted){
          setCategories({
            ...snapshot.val()
          });
        }
      }
    });
    return () => {isMounted = false}
  }, []);

  const addOrEditIdeas = obj => {
    if (currentId === ''){
      FirebaseDb.child('idea').push(
        obj,
        error => {
          if (error)
            console.log(error);
          else
            setCurrentId('');
        }
      )
    } else {
      FirebaseDb.child(`idea/${currentId}`).set(
        obj,
        error => {
          if (error)
            console.log(error);
          else
            setCurrentId('');
        }
      )
    }
  };

  const onDelete = key => {
    if (window.confirm("Are you sure to delete this record?")){
      FirebaseDb.child(`idea/${key}`).remove(
        error => {
          if (error)
            console.log(error);
          else
            setCurrentId('');
        }
      )
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      setRequest({
        loading: true,
        data: null,
        error: false
      });
      FirebaseDb.child('idea').on('value', snapshot => {
        if (snapshot.val() != null){
          setRequest({
            loading: false,
            data: snapshot.val(),
            error: false
          })
        } else {
          setRequest({
            loading: false,
            data: null,
            error:true
          })
        }
      })
    } return () => {isMounted = false}
  }, []);

  return(
    <div className="mt-4 container">
      <div className="row">
        <div className="col-md-8"><ShowIdeas {...({setCurrentId, onDelete, request})}/></div>
        <div className="col-md-4"><CreateIdea {...({addOrEditIdeas, currentId, categories, request})}/></div>
      </div>
    </div>
  )
}

export default Main;