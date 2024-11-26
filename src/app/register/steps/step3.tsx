'use client';

import { useEffect, useState } from 'react';

import { HStack, VStack } from '@/components/basic/stack';
import { apiDuplicateName, apiSignup } from '@/lib/api-client/calls/login';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';

import ErrorLabel from '@/components/basic/errorlabel';

import { departments } from '@/lib/data/departments';
import { useAuthTokens } from '@/lib/context/AuthTokensContext';
import { EyeCloseIcon, EyeIcon } from '@/components/icon';

const validatePw = (pw: string) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,24}$/;
  return re.test(String(pw));
};

const validateNum = (num: string) => {
  const re = /^[A-Za-z\d]{7}$/;
  return re.test(String(num));
};

export default function Step3({
  nextStep,
  setInput,
  input,
}: {
  nextStep: () => void;
  setInput: React.Dispatch<React.SetStateAction<SignupRequest>>;
  input: SignupRequest;
}) {
  const [isPwValid, setIsPwValid] = useState<boolean>(false);
  const [pwcheck, setpwCheck] = useState('');
  const [isNumValid, setIsNumValid] = useState<boolean>(false);
  const [{ instances }] = useAuthTokens();

  interface NameState {
    username: string;
    isChecked: string;
    error: boolean;
  }

  const [nameCheck, setNameCheck] = useState<NameState>({ username: '', isChecked: '', error: false });

  useEffect(() => {
    setIsPwValid(validatePw(input.password));
  }, [input.password]);

  useEffect(() => {
    setIsNumValid(validateNum(input.student_id));
  }, [input.student_id]);

  function handlepwCheck(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setpwCheck(value);
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
  }

  const inputFields = [
    { label: '비밀번호', name: 'password' },
    { label: '비밀번호 확인', name: 'passwordConfirm' },
  ];

  const [showPw, setShowPw] = useState<boolean[]>(inputFields.map(() => false));

  const onToggleShow = (index: number) => {
    setShowPw((prev) => {
      const newHide = [...prev];
      newHide[index] = !newHide[index];
      return newHide;
    });
  };

  async function handleDuplicateName() {
    const response = await apiDuplicateName(instances.basic, { username: input.username });

    if (response.status === 'SUCCESS') {
      setNameCheck({ ...nameCheck, username: input.username, isChecked: response.status, error: false });
      window.alert('사용가능한 닉네임입니다.');
    } else {
      setNameCheck({ ...nameCheck, username: input.username, isChecked: response.status, error: true });
      window.alert('해당 닉네임은 이미 사용 중입니다.');
    }
  }

  async function handleRegister() {
    if (pwcheck !== input.password || !isPwValid) return window.alert('비밀번호를 확인해주세요.');
    if (nameCheck.isChecked !== 'SUCCESS' || nameCheck.username !== input.username) {
      const response = await apiDuplicateName(instances.basic, { username: input.username });

      if (response.status !== 'SUCCESS') {
        setNameCheck({ ...nameCheck, username: input.username, isChecked: response.status, error: true });
        return window.alert('해당 닉네임은 이미 사용 중입니다.');
      }
    }
    if (!isNumValid) return window.alert('학번 앞 7자를 입력해주세요.');
    if (!departments.includes(input.department)) return window.alert('유효한 학과명을 입력해주세요.');
    if (input.semester == 0) return window.alert('학기를 입력해주세요.');
    else {
      const response = await apiSignup(instances.basic, { ...input } as SignupRequest);

      if (response.status === 'SUCCESS') {
        nextStep();
      } else {
        window.alert(`회원가입에 실패했습니다.
        ${response.message}`);
      }
    }
  }

  const [dropDownList, setDropDownList] = useState<string[]>(departments);
  const [dropDownItemIndex, setDropDownItemIndex] = useState<number>(-1);
  const [isDropDown, setIsDropDown] = useState<boolean>(false);

  const showDropDownList = () => {
    if (input.department === '') {
      setIsDropDown(false);
      setDropDownList([]);
    } else {
      const choosenTextList = departments.filter((textItem) => textItem.includes(input.department));
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput({
      ...input,
      [event.target.id]: value,
    });
    setDropDownItemIndex(-1);
    setIsDropDown(true);
  };

  const clickDropDownItem = (clickedItem: string) => {
    setInput({
      ...input,
      department: clickedItem,
    });
  };

  const handleDropDownKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDropDown) {
      if (event.key === 'ArrowDown' && dropDownList.length - 1 > dropDownItemIndex) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1);
      }

      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        event.preventDefault();
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
        setIsDropDown(false);
      }
    }
  };

  useEffect(showDropDownList, [input.department]);

  return (
    <HStack className="gap-y-5">
      <span className="text-4xl">회원가입</span>
      <span className="text-xl" style={{ marginBottom: '60px' }}>
        ACADEM에 오신걸 환영합니다!
        <br />
        회원 정보를 입력해주세요.
      </span>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <span className="text-xl">아이디</span>
        <Input
          required
          type="email"
          id="email"
          autoComplete="username"
          placeholder={input.email}
          onChange={handleInput}
          disabled={true}
          style={{ width: '100%' }}
        />
        <span className="text-xl">비밀번호</span>
        <div className="relative w-full">
          <Input
            required
            type={showPw[0] ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            placeholder="비밀번호를 입력해주세요"
            onChange={handleInput}
            autoFocus
            style={{ width: '100%' }}
            maxLength={24}
          />
          <div className="absolute top-3 right-4">
            {showPw[0] ? (
              <div onClick={() => onToggleShow(0)}>
                <EyeIcon />
              </div>
            ) : (
              <div onClick={() => onToggleShow(0)}>
                <EyeCloseIcon />
              </div>
            )}
          </div>
        </div>
        <ErrorLabel
          label={
            !isPwValid && input.password !== ''
              ? '영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.'
              : ''
          }
        />
        <span className="text-xl">비밀번호 확인</span>
        <div className="relative w-full">
          <Input
            required
            type={showPw[1] ? 'text' : 'password'}
            id="pwcheck"
            autoComplete="new-password"
            value={pwcheck}
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={handlepwCheck}
            style={{ width: '100%' }}
            maxLength={24}
          />
          <div className="absolute top-3 right-4">
            {showPw[1] ? (
              <div onClick={() => onToggleShow(1)}>
                <EyeIcon />
              </div>
            ) : (
              <div onClick={() => onToggleShow(1)}>
                <EyeCloseIcon />
              </div>
            )}
          </div>
        </div>
        <ErrorLabel label={input.password !== pwcheck && pwcheck !== '' ? '비밀번호가 일치하지 않습니다.' : ''} />
        <span className="text-xl" style={{ marginTop: '10px' }}>
          닉네임
        </span>
        <VStack className="gap-x-5 w-100% justify-between">
          <div className="grow">
            <Input
              required
              type="text"
              id="username"
              autoComplete={undefined}
              placeholder="닉네임 (1-10자)"
              onChange={handleInput}
              maxLength={10}
              className="w-full"
            />
          </div>
          <Button kind="filled" type="button" className="px-4 grow-0" onClick={handleDuplicateName}>
            중복 확인
          </Button>
        </VStack>
        <ErrorLabel label={nameCheck.error ? '닉네임이 중복되었습니다. 다른 닉네임을 입력해주세요.' : ''} />
        <span className="text-xl">학번</span>
        <Input
          required
          type="text"
          id="student_id"
          placeholder="학번"
          maxLength={7}
          onChange={handleInput}
          style={{ width: '100%' }}
        />
        <ErrorLabel label={!isNumValid && input.student_id !== '' ? '학번 앞 7자를 입력해주세요.' : ''} />
        <span className="text-xl">학과</span>
        <div
          onBlur={() => {
            setDropDownItemIndex(-1);
            setIsDropDown(false);
          }}
        >
          <Input
            required
            type="text"
            id="department"
            placeholder="학과"
            autoComplete="off"
            value={input.department}
            onChange={changeInputValue}
            onKeyDown={handleDropDownKey}
            onFocus={() => {
              setIsDropDown(true);
            }}
            style={isDropDown ? { borderRadius: '0.5rem 0.5rem 0 0' } : { borderRadius: '0.5rem' }}
            className="w-full"
          />
          {isDropDown && (
            <ul className="block m-0 p-2 light:bg-white border light:border-base-30 dark:bg-neutral-900 dark:border-base-2 rounded-b-lg z-10">
              {dropDownList.length === 0 && <li className="p-2 text-gray-500">해당하는 단어가 없습니다</li>}
              {dropDownList.map((dropDownItem, dropDownIndex) => (
                <li
                  key={dropDownIndex}
                  onMouseDown={() => {
                    clickDropDownItem(dropDownItem);
                    setDropDownItemIndex(-1);
                    setIsDropDown(false);
                  }}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={`p-2 cursor-pointer ${dropDownItemIndex === dropDownIndex ? 'light:bg-gray-300 dark:bg-gray-700' : ''}`}
                >
                  {dropDownItem}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span className="text-xl">학위 / 학기</span>
        <VStack style={{ justifyContent: 'space-between', marginBottom: '40px' }}>
          <VStack className="gap-x-3">
            <Button
              id="degree"
              type="button"
              kind={input.degree === 'MASTER' ? 'filled' : 'outline'}
              variant="contained"
              color="primary"
              onClick={() =>
                setInput((input: SignupRequest) => {
                  return { ...input, degree: 'MASTER' };
                })
              }
            >
              <span className="text-xl" style={{ margin: '5px 30px' }}>
                석사
              </span>
            </Button>
            <Button
              id="degree"
              type="button"
              kind={input.degree === 'DOCTOR' ? 'filled' : 'outline'}
              variant="contained"
              color="primary"
              onClick={() =>
                setInput((input: SignupRequest) => {
                  return { ...input, degree: 'DOCTOR' };
                })
              }
            >
              <span className="text-xl" style={{ margin: '5px 30px' }}>
                박사
              </span>
            </Button>
          </VStack>
          <VStack className="gap-x-3 items-center">
            <Input
              required
              type="number"
              id="semester"
              style={{ width: '60px', textAlign: 'center' }}
              onChange={handleInput}
            />
            <span className="text-xl">학기</span>
          </VStack>
        </VStack>
        <Button kind="filled" type="submit" variant="contained" color="primary">
          <span className="text-xl">완료</span>
        </Button>
      </form>
    </HStack>
  );
}
