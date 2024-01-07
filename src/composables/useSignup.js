import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";

const error = ref(null);
const loading = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  loading.value = true;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("Coluld not complete signup");
    }
    await updateProfile(res.user, { displayName });
    error.value = null;
    loading.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    loading.value = false;
  }
};
const useSignup = () => {
  return { error, loading, signup };
};

export default useSignup;
