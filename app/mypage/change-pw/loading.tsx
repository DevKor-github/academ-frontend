import ChangePWForm from "./form";

export default function ChangePWLoading() {
  return <ChangePWForm input={{old_password : '', new_password : '', new_password_check : ''}} submitting={false} />;
}
