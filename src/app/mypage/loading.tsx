import { MyProfileBasicsLoading } from './static/MyProfileBasics';
import { MyProfileMembershipsLoading } from './static/MyProfileMemberships';
import Spinner from '@/components/basic/spinner';

export default function MyPageLoading() {
  return (
    <div className="flex flex-col w-full h-full">
      <MyProfileBasicsLoading />
      <MyProfileMembershipsLoading />
      <Spinner />
      <Spinner />
    </div>
  );
}
