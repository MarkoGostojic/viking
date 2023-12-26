import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const getDocument = (c, id) => {
  const document = ref(null);

  let docRef = collection(db, c).doc(id);
  const unsub = onSnapshot(docRef, (doc) => {
    if (doc.data()) {
      document.value = { ...doc.data(), id: doc.id };
    }
  });
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });
  return { document };
};
export default getDocument;
