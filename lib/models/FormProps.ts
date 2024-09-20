/**
 * Form Component를 위한 Prop입니다.
 */
interface FormProps<T> {
  input: T;
  handleInput?: InputHandler;
  handleSubmit?: (e: React.FormEvent) => void;
  submitting: boolean;
  department?: DepartmentInputProps;
}

/**
 * 마이페이지 정보 수정 / 학과 컬렉터를 위한 Prop입니다.
 */
interface DepartmentInputProps {
  dropDownList: string[];
  dropDownItemIndex: number;
  setDropDownItemIndex: SetState<number>;
  isDropDown: boolean;
  setIsDropDown: SetState<boolean>;
  setInput: SetState<UpdateProfileReq>;
}
