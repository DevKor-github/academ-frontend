import DeleteAccountForm from './form';

export default function DeleteAccountLoading() {
  return <DeleteAccountForm input={{ password: '', checked: false }} submitting={false} />;
}
