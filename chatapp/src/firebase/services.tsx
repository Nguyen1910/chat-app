import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";
import { v4 } from "uuid";

// export const addDocument = async (nameCollection, data) => {
//   await addDoc(collection(db, nameCollection), {
//     ...data,
//     createdAt: Timestamp.now().toDate().toString(),
//   });
// };

// export const generateKeywords = (displayName: string) => {
//   // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
//   // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
//   const name = displayName.split(" ").filter((word) => word);

//   const length = name.length;
//   let flagArray = [];
//   let result = [];
//   let stringArray = [];

//   for (let i = 0; i < length; i++) {
//     flagArray[i] = false;
//   }

//   const createKeywords = (name) => {
//     const arrName = [];
//     let curName = "";
//     name.split("").forEach((letter) => {
//       curName += letter;
//       arrName.push(curName.toLowerCase());
//     });
//     return arrName;
//   };

//   function findPermutation(k) {
//     for (let i = 0; i < length; i++) {
//       if (!flagArray[i]) {
//         flagArray[i] = true;
//         result[k] = name[i];

//         if (k === length - 1) {
//           stringArray.push(result.join(" "));
//         }

//         findPermutation(k + 1);
//         flagArray[i] = false;
//       }
//     }
//   }

//   findPermutation(0);

//   const keywords = stringArray.reduce((acc, cur) => {
//     const words = createKeywords(cur);
//     return [...acc, ...words];
//   }, []);

//   return keywords;
// };

export const uploadFile = async (file: File, nameCollection: string) => {
  const name = v4();
  const imageRef = ref(storage, `${nameCollection}/${name}`);
  const uploadRef = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(uploadRef.ref);
  return { url, type: nameCollection, name };
};
