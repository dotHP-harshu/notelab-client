import { openDB } from "idb";

const db_name = "notelab-downloads";
const store_name = "downloads";

export const initDB = async ()=>{
    return await openDB(db_name, 1, {
        upgrade(db){
            if(!db.objectStoreNames.contains(store_name)){
                db.createObjectStore(store_name)
            }
        }
    })
}

export const getAllDownloads = async () => {
  const db = await initDB();
  const downloads = db.getAll(store_name);
  return downloads;
};

export const deleteDownload = async (subjectId) => {
  const db = await initDB();
  db.delete(store_name, subjectId);
};

export const saveFiles = async (subject, filesArray) => {
  const db = await initDB();
  const download = {
    subject,
    units: filesArray,
  };
  db.put(store_name, download, subject._id);
};

export const getFiles = async(subjectId)=>{
    const db = await initDB()
    const files = db.get(store_name, subjectId)
    return files;
}