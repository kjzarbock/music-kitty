import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getSingleCat } from '../../managers/CatManager';
import { Background } from '../background/Background';

export const CatDetails = ({ catId: catIdProp }) => {
  const [cat, setCat] = useState({});
  const { catId: catIdParam } = useParams();
  const catId = catIdProp || catIdParam;

  useEffect(() => {
    getSingleCat(catId)
      .then(fetchedCat => {
        console.log("Fetched Cat Data:", fetchedCat);  // Logging the fetched cat data
        setCat(fetchedCat);
      });
  }, [catId]);

  return (
    <>
    <section className="post">
        <div className="user-list-name">Name: {cat.name}</div>
        <img src={cat.image} alt={cat.name} />
        <div className="cat-list-location">
            Location: {cat.location && <Link to={`/locations/${cat.location.id}`}>{cat.location.name}</Link>}
        </div>
        <div className="cat-list-name">Age: {cat.age}</div>
        <div className="cat-list-name">Sex: {cat.sex}</div>
        <div className="cat-list-name">Bio: {cat.bio}</div>
        <div className="cat-list-name">Adopted: {cat.adopted ? 'Yes' : 'No'}</div>
        <div>Gets along with cats: {cat.gets_along_with_cats ? 'Yes' : 'No'}</div>
        <div>Gets along with dogs: {cat.gets_along_with_dogs ? 'Yes' : 'No'}</div>
        <div>Gets along with children: {cat.gets_along_with_children ? 'Yes' : 'No'}</div>
        <Link to={`/cats`} className="cat-profile-button">Back to all Cats</Link>
    </section>
    <Background />
    </>
  );
};
