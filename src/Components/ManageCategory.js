import React, {useEffect, useState} from 'react';
import FirebaseDb from '../Firebase/Firebase';

function ManageCategory() {
  const initialCategory = {
    categoryName: ''
  };
  const [category, setCategory] = useState(initialCategory);
  const [categories, setCategories] = useState({});
  const [currentId, setCurrentId] = useState('');

  const handleInputChange = e => {
    var {name, value} = e.target;
    setCategory({
      ...category,
      [name]: value
    });
  };

  const addOrEditCategory = obj => {
    if (currentId === ''){
      FirebaseDb.child('category').push(
        obj,
        error => {
          if (error)
            console.log(error);
          else
            setCurrentId('');
        })
    } else {
      FirebaseDb.child(`category/${currentId}`).set(
        obj,
        error => {
          if (error)
            console.log(error);
          else
            setCurrentId('');
        })
    }
  };

  const onDelete = key => {
    if (window.confirm("Are you sure to delete this record?")){
      FirebaseDb.child(`category/${key}`).remove(
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
    let isMounted = true
    FirebaseDb.child('category').on('value', snapshot => {
      if (snapshot.val() != null){
        if (isMounted){
          setCategories({
            ...snapshot.val()
          });
        }
      }
    }); return () => {isMounted = false}
  }, []);

  useEffect(() => {
    if (currentId === ''){
      setCategory({
        ...initialCategory
      })
    } else {
      setCategory({
        ...categories[currentId]
      })
    }
  }, [currentId, categories]);

  const handleOnSubmit = e => {
    e.preventDefault();
    addOrEditCategory(category);
  };
  return(
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 mb-4">
          <form autoComplete="off" onSubmit={handleOnSubmit}>
            <h5 className="pb-4"> {(currentId === '')? "Add new" : "Edit"} Category</h5>
            <div className="form-group">
              <label>Category name</label>
              <input type="text" className="form-control"
                     name="categoryName" value={category.categoryName}
                     onChange={handleInputChange}
                     required
                     pattern="[A-z\dđšžćčĐŠŽĆČ]{2,20}"
                     title="Only characters and numbers 2 - 20"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {(currentId === '')? "Add" : "Edit"}
            </button>
          </form>
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          <h5>Available categories</h5>
          <ul className="list-group">
            {Object.keys(categories).map(id => {
              return  <li className="list-group-item d-flex justify-content-between
              align-items-center" key={id}>
                  {categories[id].categoryName}
                <span className="badge">
                <button className="btn btn-success btn-sm mr-2" onClick={() => setCurrentId(id)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>
                  Delete
                </button>
              </span>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ManageCategory;