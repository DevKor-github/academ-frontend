import { Notice } from '@/lib/api/notice';

export const NoticeList: Notice[] = [
  {
    notice_id: 1,
    title: '대학원 강의 평가 공유 서비스, ACADEM(아카뎀) 서비스 소개',
    created_at: '2024/07/09',
    detail: `<div>
        <div className="leading-normal text-base flex flex-col gap-12">
          <p>안녕하세요! 고려대학교 소프트웨어 개발연구 학회 DevKor의 프로젝트 팀, 아카뎀입니다.</p>
          <p>
            저희가 개발한 대학원 강의 평가 공유 서비스가 출시되었습니다. 대학원생을 위한 강의 평가 서비스가 부재해
            대학원 강의에 대한 정보를 얻기가 어려다는 문제를 해결하기 위해 만들어진 서비스입니다. 아카뎀을 통해 강의
            평가를 작성하고 다른 학생들이 작성한 강의 평가를 열람해 유용한 정보를 교환할 수 있는 공간을 만들고자 합니다.
            2020년 1학기부터 2년간 1학기의 고려대학교 22개 대학, 128개 학과, 23389개 강의의 강의평을 공유할 수 있으니,
            대학원생들의 많은 관심 부탁드립니다!
          </p>

          <ol className="flex flex-col gap-6">
            <h3 className="font-semibold">주요 기능</h3>
            <li>
              <b>[1] 고려대학교 이메일을 통한 회원가입</b>
              <br />
              고려대학교 이메일 인증을 통해 회원가입을 하는 방식으로 신뢰할 수 있는 강의 평가 환경을 만들었습니다.
            </li>

            <li>
              <b>[2] 강의 검색</b>
              <br />
              고려대학교 대학원의 22개 대학, 128개 학과, 23389개 강의에 대한 강의평을 강의명, 교수명, 학수번호를 사용해
              간편하게 검색할 수 있습니다.
            </li>

            <li>
              <b>[3] 관심 강의 즐겨찾기</b>
              <br />
              즐겨찾기 기능을 통해 원하는 과목을 모아두고 비교할 수 있습니다.
            </li>

            <li>
              <b>[4] 강의평 열람</b>
              <br />
              강의의 평균 평점, 학습량, 난이도, 전달력과 학점에 대한 정보를 통해 강의평을 통해 양질의 정보를 얻을 수
              있습니다.
            </li>

            <li>
              <b>[5] 강의평 작성</b>
              <br />
              강의 태그 선택, 강의평 작성 가이드를 통해 강의평을 손쉽게 작성할 수 있습니다.
            </li>
          </ol>

          <p>
            아카뎀은 여러분의 많은 관심과 참여를 기다리고 있습니다. 아카뎀과 함께 이번 학기를 돌아보고 다음 학기를
            준비해보세요!
          </p>
        </div>
        <div>
          <p className="mt-10 text-xs text-gray-400">
            문의하기: Academ.email@gmail.com
            <br />
            서비스 오류 신고하기 (버그 리포트):{' '}
            <a href="https://forms.gle/7agPntbjgCjHumVER">https://forms.gle/7agPntbjgCjHumVER</a>
          </p>
        </div>
      </div>`,
  },
];
