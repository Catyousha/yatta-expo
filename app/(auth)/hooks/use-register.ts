import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";

export const useRegister = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const isValid = confirmPass === pass && email !== "" && pass !== "";

  const onSubmit = () => {
    alert(`${email} ${pass}`);
  }

  return {
    setEmail,
    setPass,
    setConfirmPass,
    isValid,
    onSubmit
  };
};
