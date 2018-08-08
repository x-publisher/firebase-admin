import firebase from './index';

const storage = firebase.storage();

export const upload = async (ref, { file, metaData }) => {
  const snap = await storage.ref(ref).put(file, metaData);
  const url = await snap.ref.getDownloadURL();
  return url;
};
