import { useEffect, useState } from "react"
import { updateCat, getAllCats, getSingleCat } from "../../managers/categories"

export const updateCat = ({ catId, updateShowEditForm, catList, updateCat }) => {
    const [cat, updateCat] = useState({})

    useEffect(() => {
        getSingleCat(catId)
            .then((catToEdit) => {
                updateCategory(catToEdit)
            })
    }, [])


    const handleSubmitCategory = async (e) => {
        e.preventDefault()

        // Check if the category is already in database
        const alreadyAdded = catList.some(existingCat => existingCat.name === category.name)

        if (!alreadyAdded && cat.name.length > 0) {
            await updateCat(cat)
            updateCat()
            updateShowEditForm(0)
        } else if (alreadyAdded) {
            window.alert("Cat already in database")
        } else {
            window.alert("Please enter a cat name")
        }
    }

    return <>
        <div className="addCategory">
            <label htmlFor="addCategory_input">Edit Category:</label>
            <div>
                <input
                    type="text"
                    className="category__input"
                    placeholder="Enter your category"
                    id="addCategory_input"
                    defaultValue={category.label}
                    onChange={
                        (changeEvent) => {
                            const copy = { ...category }
                            copy.label = changeEvent.target.value
                            updateCategory(copy) // Updating new category with value of copy
                        }
                    } />
            </div>
        </div>
        <button className="btn-secondary btn-group-left"
            onClick={(click) => handleSubmitCategory(click)}
        >Submit Edit</button>

        <button className="btn-secondary btn-group-right"
            onClick={(e) => {
                e.preventDefault()
                updateShowEditForm(0)
            }}
        >Cancel</button>
    </>
}