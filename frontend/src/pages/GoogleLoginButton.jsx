import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        // 👇 calling the function passed from parent
        onSuccess(credentialResponse);
      }}
      onError={() => {
        console.error("Google Login Failed");
      }}
    />
  );
}
