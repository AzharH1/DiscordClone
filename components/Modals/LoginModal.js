import { auth } from "@/firebase";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.loginModal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginAsGuest() {
    await signInWithEmailAndPassword(auth, "guest@gmail.com", "123456");
    dispatch(closeLoginModal());
  }

  async function handleSignin() {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(closeLoginModal());
  }

  return (
    <div>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="bg-[#5865f2] px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="w-[300px] h-[400px] bg-[#1E1F22] rounded-md">
          <div className="text-[#f2f3f5] p-3">
            <h1 className="text-2xl font-bold mb-4">Login to continue</h1>

            <div>
              <div>
                <input
                  placeholder="email"
                  className="w-full rounded-md p-2 bg-[#313338] mb-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="password"
                  className="w-full rounded-md p-2 bg-[#313338] mb-2"
                  onChange={(e) => setPassword(e.target.value)}
                  type={"password"}
                />

                <button
                  onClick={handleSignin}
                  className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
                >
                  Log In
                </button>
              </div>

              <h1 className="text-center font-bold my-2">or</h1>

              <button
                onClick={loginAsGuest}
                className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
              >
                Log In as Guest
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
