import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const error = ref(null);
const loading = ref(false);

const login = async (email, password) => {
  error.value = null;
  loading.value = true;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("Coluld not login");
    }
    error.value = null;
    loading.value = false;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    loading.value = false;
  }
};

const useLogin = () => {
  return { error, loading, login };
};

export default useLogin;
