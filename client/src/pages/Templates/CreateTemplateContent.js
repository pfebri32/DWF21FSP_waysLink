import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// Configs.
import { API } from '../../config/api';

// Styles.
import styles from '../../styles/Pages/CreateTemplateContent.module.scss';

const CreateTemplateContent = () => {
  // States
  const [template, setTemplate] = useState(null);
  const [form, setForm] = useState({
    templateImg: '',
    templateTitle: '',
    templateDescription: '',
    links: [],
  });

  // Vars.
  const { id } = useParams();

  // Querys.
  const getTemplate = async () => {
    try {
      const res = await API.get(`/template/${id}`);
      setTemplate(res.data.data.template);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTemplate();
  }, []);

  // Handlers.
  const handleSubmit = async () => {
    try {
      const body = JSON.stringify({
        templateId: parseInt(id),
        title: form.templateTitle,
        description: form.templateDescription,
        img: form.templateImg,
        links: form.links,
      });
      console.log('body', body);
      console.log('form', form);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await API.post('/content', body, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLink = (e) => {
    const index = parseInt(e.target.dataset.index);
    const length = form.links.length;
    setForm({
      ...form,
      links: [
        ...form.links.slice(0, index),
        {
          ...form.links[index],
          [e.target.name]: e.target.value,
        },
        ...form.links.slice(index + 1, length),
      ],
    });
  };

  const handleImageChange = async (e) => {
    try {
      const body = new FormData();
      body.append('img', e.target.files[0]);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await API.post('/upload-file', body, config);
      setForm({
        ...form,
        [e.target.name]: res.data.data.img,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLinkImageChange = async (e) => {
    const index = parseInt(e.target.dataset.index);
    const length = form.links.length;
    try {
      const body = new FormData();
      body.append('img', e.target.files[0]);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await API.post('/upload-file', body, config);
      setForm({
        ...form,
        links: [
          ...form.links.slice(0, index),
          {
            ...form.links[index],
            [e.target.name]: res.data.data.img,
          },
          ...form.links.slice(index + 1, length),
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewLink = () => {
    setForm({
      ...form,
      links: [
        ...form.links,
        {
          title: '',
          link: '',
          img: '',
        },
      ],
    });
  };

  // Render.
  const renderLinkForms = () =>
    form.links.map(({ img, title, link }, i) => (
      <div
        key={i}
        style={{ padding: 30, backgroundColor: 'gray', marginTop: 30 }}
      >
        <div>
          <div style={{ height: 128, width: 128 }}>
            {img && (
              <img
                src={img}
                alt={img}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            )}
          </div>
          <input
            type="file"
            name="img"
            data-index={i}
            onChange={handleLinkImageChange}
          />
        </div>
        <div className={styles.group}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            data-index={i}
            value={title}
            onChange={handleChangeLink}
          />
        </div>
        <div className={styles.group}>
          <label>Link</label>
          <input
            type="text"
            name="link"
            placeholder="Link"
            data-index={i}
            value={link}
            onChange={handleChangeLink}
          />
        </div>
      </div>
    ));
  return (
    <div className={styles.container}>
      {template && (
        <>
          <div style={{ display: 'flex' }}>
            <div className={styles.header}>Create Link</div>
            <div style={{ marginLeft: 30 }} onClick={handleSubmit}>
              Publish
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.colLeft}>
              <form>
                <div className={styles.contentImgForm}>
                  <div className={styles.contentImg}>
                    {form.templateImg && (
                      <img src={form.templateImg} alt={form.templateImg} />
                    )}
                  </div>
                  <div className={styles.contentUpload}>
                    <input
                      type="file"
                      name="templateImg"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.group}>
                    <label>Title</label>
                    <input
                      type="text"
                      name="templateTitle"
                      placeholder="Title"
                      value={form.templateTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.group}>
                    <label>Description</label>
                    <input
                      type="text"
                      name="templateDescription"
                      placeholder="Description"
                      value={form.templateDescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 30 }}>{renderLinkForms()}</div>
                <div onClick={handleNewLink}>Add New Link</div>
              </form>
            </div>
            <div className={styles.colRight}>
              <img src={template.img} alt={template.img} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTemplateContent;
