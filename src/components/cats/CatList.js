import { useEffect, useState } from "react";
import { getAllCats } from "../../managers/CatManager";
import { CreateCategory } from "./CreateCategory";
import { useNavigate } from "react-router-dom";
import { updateCat } from "./EditCat";

export const CatList = () => {
  const [catList, setList] = useState([]);
  const [showForm, updateShowForm] = useState(false)
  const [showEditForm, updateShowEditForm] = useState(0)
  const navigate = useNavigate()

  const updateCat = () => {
    getCategories().then((catList) => {
      setList(catList);
    });
  };

  useEffect(() => {
    getAllCats().then((catList) => {
      setList(catList);
    });
  }, []);

  const deleteButton = (id, event) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this cat?"
    );
    if (confirmation) {
      fetch(`http://localhost:8000/cats/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      }).then(() => {
        updateCategories();
      });
    }
  };

  return (
    <article className="is-flex is-justify-content-space-evenly">
      <section className="categories">
        <h2 className="categoryList">List of Cats</h2>
        {catList
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((cat) => (
            <section className="cat" key={cat.id}>
              <div className="categoryName">{cat.name}</div>
              <section className="editCat">
                {showEditForm === cat.id ? (
                  <EditCat
                    catId={cat.id}
                    updateShowEditForm={updateShowEditForm}
                    catList={catList}
                    updateCat={updateCat}
                  />
                ) : (
                  <button
                    className="showCreateCat"
                    onClick={(click) => updateShowEditForm(cat.id)}
                  >
                    Edit
                  </button>
                )}
              </section>
              <button
                className="deleteButton"
                onClick={(event) => deleteButton(cat.id, event)}
              >
                Delete
              </button>
            </section>
          ))}
      </section>
      <section className="createCat">
        {showForm ? (
          <CreateCat
            updateShowForm={updateShowForm}
            catList={catList}
            updateCat={updateCat}
          />
        ) : (
          <button
            className="showCreateCat"
            onClick={(click) => updateShowForm(!showForm)}
          >
            Add New Cat
          </button>
        )}
      </section>

    </article>
  );
};