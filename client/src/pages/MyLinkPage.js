import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { API } from '../config/api';

const MyLinkPage = () => {
  const [state, dispatch] = useContext(UserContext);
  const [contents, setContents] = useState(null);

  const getContents = async () => {
    try {
      const res = await API.get(`/contents/${state.user.id}`);
      setContents(res.data.data.contents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/content/${id}`);
      getContents();
    } catch (error) {
      console.log(error);
    }
  };

  const renderContents = () =>
    contents.map(({ id, title, description, img }) => (
      <div key={id}>
        <div>{title}</div>
        <div>{description}</div>
        <div style={{ height: 100, width: 100 }}>
          {img && (
            <img
              src={img}
              alt={img}
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          )}
        </div>

        <Link to={`/view/${id}`}>Link</Link>
        <div onClick={() => handleDelete(id)}>Delete</div>
      </div>
    ));
  return <div>{contents && <>{renderContents()}</>}</div>;
};

export default MyLinkPage;
