import React, {useEffect, useState} from 'react';

function CreateIdea({addOrEditIdeas, currentId, ideas, categories, request}) {
  const getDateTime = () => {
    let dateTime = new Date();
    return dateTime.getHours() + ":" + dateTime.getMinutes() + " " + dateTime.getDate() + "/" +
      (dateTime.getMonth() + 1) + "/" + dateTime.getFullYear();
  };

  const initialValues = {
    name: '',
    description: '',
    rating: 1,
    category: '',
    expectations: '',
    dateTime: getDateTime(),
    ideaNumber: new Date()
  };
  const [values, setValues] = useState(initialValues);
  useEffect(() => {
    if (currentId === ''){
      setValues({
        ...initialValues
      })
    } else {
      setValues({
        ...request.data[currentId]
      })
    }
  }, [currentId, request.data]);

  const handleInputChange = e => {
    var {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    addOrEditIdeas(values);
  };

  return(
    <form autoComplete="off" onSubmit={handleOnSubmit}>
      <h5 className="pb-4">{(currentId === '')? "Add new" : "Edit"} Idea</h5>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control"
               placeholder="Idea name" name="name" value={values.name}
               onChange={handleInputChange}
               required
               pattern="[A-z\dđšžćčĐŠŽĆČ\s]{2,20}"
               title="Only characters and numbers 2 - 20"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea rows="3" className="form-control" placeholder="Idea description"
                  name="description" value={values.description} onChange={handleInputChange}
                  required
                  pattern="[A-z\dđšžćčĐŠŽĆČ\s,.?!]{2,500}"
                  title="Only characters, numbers and , . ? ! 2 - 500"
        >
        </textarea>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-5">
            <label>Rating</label>
            <input type="number" className="form-control"
                   value={values.rating} name="rating"
                   onChange={handleInputChange}
                   required
                   min="1" max="10"
                   title="Range from 1 to 10"
            />
          </div>
          <div className="col-7">
            <label>Category</label>
            <select className="form-control" name="category" value={values.category} onChange={handleInputChange} required>
              <option value="">Choose category</option>
              {Object.keys(categories).map(id => {
                return <option key={id} value={categories[id].categoryName}>
                    {categories[id].categoryName}
                </option>
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Expectations</label>
        <textarea rows="3" className="form-control" placeholder="Idea expectations"
                  name="expectations" value={values.expectations}
                  onChange={handleInputChange}
                  required
                  pattern="[A-z\dđšžćčĐŠŽĆČ\s,.?!]{2,500}"
                  title="Only characters, numbers and , . ? ! 2 - 500"
        >
        </textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        {(currentId === '')? "Create" : "Edit"}
      </button>
    </form>
  )
}

export default CreateIdea;
