import { wait } from '@testing-library/user-event/dist/utils';
import axios from 'axios';

export const uploadFiles = async (files) => {
  let formData = new FormData();
  formData.append('upload_preset', process.env.REACT_APP_CLOUD_SECRET);
  let uploaded = [];
  for (const f of files) {
    const { file, type } = f;
    formData.append('file', file);
    let res = await uploadToCloundinary(formData);
    uploaded.push({ file: res, type: type });
  }
  return uploaded;
};

const uploadToCloundinary = async (formData) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/raw/upload`,
        formData
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => console.log(err));
  });
};
