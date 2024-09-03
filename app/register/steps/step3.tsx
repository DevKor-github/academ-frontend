'use client';

import { MouseEvent, useEffect, useState } from 'react';

import { HStack, VStack } from '@/components/basic/stack';
import { apiDuplicateName, apiSignup } from '@/lib/api/login';

import Button from '@/components/basic/button';
import Input from '@/components/basic/input';

import ErrorLabel from '@/components/basic/errorlabel';

import { departments } from './departments';

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

  async function handleDuplicateName() {
    const response = await apiDuplicateName({ username: input.username });

    if (response.status === 'SUCCESS') {
      setNameCheck({ ...nameCheck, username: input.username, isChecked: response.status, error: false });
      window.alert('사용가능한 닉네임입니다.');
    } else {
      setNameCheck({ ...nameCheck, username: input.username, isChecked: response.status, error: true });
      window.alert('해당 닉네임은 이미 사용 중입니다.');
    }
  }

  async function handleRegister() {
    if (pwcheck !== input.password || !isPwValid) {
      window.alert('비밀번호를 확인해주세요.');
    } else if (nameCheck.isChecked !== 'SUCCESS' || nameCheck.username !== input.username) {
      setNameCheck({ ...nameCheck, error: true });
      window.alert('닉네임 중복을 확인해주세요.');
    } else if (!isNumValid) {
      window.alert('학번 앞 7자를 입력해주세요.');
    } else if (!departments.includes(input.department)) {
      window.alert('유효한 학과명을 입력해주세요.');
    } else if (input.semester == null) {
      window.alert('학기를 입력해주세요.');
    } else {
      const response = await apiSignup({ ...input } as SignupRequest);

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
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
        setIsDropDown(false);
      }
    }
  };

  useEffect(showDropDownList, [input.department]);

  return (
    <HStack gap="20px">
      <span className="text-4xl">회원가입</span>
      <span className="text-xl" style={{ marginBottom: '60px' }}>
        ACADEM에 오신걸 환영합니다!
        <br />
        회원 정보를 입력해주세요.
      </span>
      <span className="text-xl">아이디</span>
      <Input
        required
        type="email"
        id="email"
        placeholder={input.email}
        onChange={handleInput}
        disabled={true}
        style={{ width: '100%' }}
      />
      <span className="text-xl">비밀번호</span>
      <Input
        required
        type="password"
        id="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={handleInput}
        autoFocus
        style={{ width: '100%' }}
      />
      <ErrorLabel
        label={
          !isPwValid && input.password !== ''
            ? '영문자, 숫자, 또는 특수문자로 이루어진 8 - 24 자리의 비밀번호를 입력해주세요.'
            : ''
        }
      />
      <span className="text-xl">비밀번호 확인</span>
      <Input
        required
        type="password"
        id="pwcheck"
        value={pwcheck}
        placeholder="비밀번호를 다시 입력해주세요"
        onChange={handlepwCheck}
      />
      <ErrorLabel label={input.password !== pwcheck && pwcheck !== '' ? '비밀번호가 일치하지 않습니다.' : ''} />
      <span className="text-xl" style={{ marginTop: '10px' }}>
        닉네임
      </span>
      <VStack gap="10px" className="w-100% justify-between">
        <div className="grow">
          <Input required type="text" id="username" placeholder="닉네임 (1-10자)" onChange={handleInput} />
        </div>
        <Button kind="filled" className="px-4 grow-0" onClick={handleDuplicateName}>
          닉네임 중복 확인
        </Button>
      </VStack>
      <ErrorLabel
        label={
          nameCheck.error
            ? nameCheck.isChecked === 'ERROR'
              ? '닉네임이 중복되었습니다. 다른 닉네임을 입력해주세요.'
              : '닉네임이 중복되는지 확인해주세요.'
            : ''
        }
      />
      <span className="text-xl">학번</span>
      <Input required type="text" id="student_id" placeholder="학번" onChange={handleInput} style={{ width: '100%' }} />
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
          style={
            isDropDown ? { borderRadius: '0.5rem 0.5rem 0 0', zIndex: 10 } : { borderRadius: '0.5rem', zIndex: 10 }
          }
        />
        {isDropDown && (
          <ul className="block m-0 p-2 light:bg-white border light:border-light-back-2 dark:bg-neutral-900 dark:border-dark-back-2 rounded-b-lg z-10">
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
        <VStack gap="10px">
          <Button
            id="degree"
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
        <VStack gap="10px" style={{ alignItems: 'center' }}>
          <Input required type="text" id="semester" style={{ width: '50px' }} onChange={handleInput} />
          <span className="text-xl">학기</span>
        </VStack>
      </VStack>
      <Button kind="filled" variant="contained" color="primary" onClick={handleRegister}>
        <span className="text-xl">완료</span>
      </Button>
    </HStack>
  );
}
