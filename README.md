## Progress & Update

> 2022.03.27

-  취소/교환/환불요청 처리 기능 OK
-  주문내역 페이지 변동 시 화면에 반영되지 않는 오류 수정
-  ProductDetail => 디테일 정보 받아오는 useEffect 내부 코드 리팩토링(가독성up)
-  eslint 에러 해결

---

> 2022.03.26

-  OrderDetailModal => 고객 클레임 요청 시 처리 과정에서 배송비 환불 여부 선택할 수 있도록 수정
   -  서버에 요청 보낼 때 배송비 정보도 같이 보내도록 수정

---

> 2022.03.25

-  주문 관련 클레임 종류 => 배송전 : "취소요청", 배송후 : "교환요청" & "환불요청", 클레임 처리 완료 후 : 일괄 "처리완료" 로 수정

-  FHD, HD 반응형 작업
   _현재 고객이 사용하는 HD 화면 기준으로 수정하려 했으나, 이후 변경될 수 있는 점 고려하여 FHD, HD 모두 대응하도록 변경할 예정_

---

> 2022.03.22

-  고객 개인 모니터(HD) 기준으로 수정 => 3.25 내용 수정

---

> 2022.03.20

-  클레임(취소,교환,반품) 처리 요청 생성

---

> 2022.03.18

-  DetailImgReplaceModal => 선택 리스트 오픈 중 외부 클릭 시 닫히도록 수정
-  선택 리스트 height => max-height 로 수정
-  상품 추가/수정페이지 이미지 등록 안 되는 오류 수정

---

> 2022.03.17

-  상품 상세보기 데이터 불러오기 중 로딩화면 추가
-  상품 추가/수정페이지 간헐적으로 상세이미지 기본 설정 되어있는 오류 수정
-  2022.03.07 상세이미지 공유된 상품 이동 기능 추가로 인한 상품 수정페이지 접근 안 되는 오류 수정
-  추천상품 상세보기/수정 제목 노출 안 되는 오류 수정(데이터 누락)
-  OrderDetailModal 컴포넌트 사이즈 수정

---

> 2022.03.15

-  모든 PageSelector => 해당 리스트의 length가 1 이상일 경우에만 렌더링하도록 수정

---

> 2022.03.14

-  개발환경/배포환경 환경변수 재설정
-  controller 함수 instance 재설정

---

> 2022.03.12

-  불필요한 주석 제거

---

> 2022.03.10

-  withRouter 제거

---

> 2022.03.09

-  배포

---

> 2022.03.08

-  공급원 수정 중 추가하기 버튼 => index 0번에서 작동하지 않는 에러 수정

---

> 2022.03.07

-  고객별 주문목록 레이아웃 일부 수정
-  고객별 주문목록 페이지네이션 추가
-  주문 취소/교환/환불/반품 요청에서 환불 요청은 삭제
-  상품이미지 - 공유된 상품명 클릭 시 해당 상품 상세정보로 이동

---

> 2022.03.06

-  상품디테일 => 추천상품여부 변경 시 즉각 반영되지 않는 버그 수정 => 디테일 정보는 변경이 되었으나 추천상품 리스트 state를 변경해주지 않아서 발생했었음.

-  고객 목록에서의 이메일, 상품 목록에서의 상품명/옵션명 등 칸에 비해 텍스트가 길어질 경우 "..." 으로 생략

**에러 노트**

-  문제 :
   "Uncaught ReferenceError: process is not defined 라는 문구와 함께 앱 실행 도중 갑자기 멈춰버림. 코드 수정 후 변경 사항을 확인하려면 매번 새로고침해야 하는 상황 발생.

   해결 방법 :
   react scripts가 v4 => v5로 업데이트 되면서 버전 간 충돌이 일어난 듯.. 이전 버전으로 다운그레이드

---

> 2022.03.05

-  상품옵션 수정기능 수정
-  유저페이지 useEffect 내부 서버 요청 중 언마운트 시 cleanup 함수로 에러 수정

---

> 2022.03.04

-  자주묻는질문 생성/수정 모달 스타일링
-  자주묻는질문 생성 기능 추가
-  자주묻는질문 수정 기능 추가
-  자주묻는질문 삭제 기능 추가
-  eslint error 해결, 불필요한 코드 삭제

---

> 2022.03.03

**에러 노트**

-  문제 :
   "Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
   options.allowedHosts[0] should be a non-empty string. error Command failed with exit code 1. info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command."
   라는 에러 문구와 함께 yarn start(npm start) 실행이 되지 않는 현상 발생.
   package.json에 있는 proxy 설정을 지우면 앱이 실행은 되었으나 로컬 환경에서 개발이 불가능해짐.

   해결 방법 :
   proxy-middleware 설치 후 setupProxy.js에 proxy 수동 설정 후 해결

   출처 : https://stackoverflow.com/questions/70374005/invalid-options-object-dev-server-has-been-initialized-using-an-options-object_

-  콘솔 eslint error 해결

---

> 2022.03.02

-  FAQ 리스트 조회 기능 추가

---

> 2022.03.01

-  FAQ페이지 스타일

---

> 2022.02.27

-  주문목록 페이지 당 50개씩, 페이지네이션 추가
-  자주묻는질문(FAQ) 페이지 추가

---

> 2022.02.26

-  주문 클레임(취소,환불,반품) 모달 스타일

---

> 2022.02.25

-  주문 상세 - 운송장 번호 입력 기능 추가
-  주문 상세조회 모달 레이아웃 수정
-  주문상태 상세조회 모달 추가

---

> 2022.02.24

-  클릭 가능한 버튼 cursor 누락된 부분 수정
-  상품 추천상품 등록 여부 수정 시 로딩이 끝나지 않는 오류 수정
-  주문 상세보기 모달 수정중
-  운송장 입력 모달 스타일 OK

---

> 2022.02.23

**기획 변경 : 주문 목록 주문 건별이였으나, 공급원에 따라 배송 정보 다르고 부분 취소, 부분 환불 등 부분 처리 문제로 주문건별=>주문된 상품 옵션별로 리스트 수정, 상세정보 수정할 예정**

-  주문내역 주문건별 => 주문옵션별 노출로 변경, 주문번호 추가

---

> 2022.02.22

-  전화번호 데이터 '-'이 포함된 형태로 변경
-  고객목록 조회기능 OK
-  고객목록 검색기능 OK

---

> 2022.02.20

-  주문목록 조회 - 기간 필터 : from, to 순서 수정
-  주문목록, 주문상세조회 기능 OK

---

> 2022.02.19

-  주문정보 목록 조회 기능 추가
-  주문정보 상세조회 모달 스타일OK

---

> 2022.02.18

-  이미지 temp_image로 수정 (압축된 이미지)

---

> 2022.02.10

-  임시 배포

---

> 2022.02.09

-  고객 - 고객목록 레이아웃

---

> 2022.02.08

-  주문 - 주문내역 레이아웃

---

> 2022.02.07

-  주문 - 주문조회 필터 레이아웃
-  공급원 로딩중 에러 수정

---

> 2022.02.06

-  주문 - 주문목록 레이아웃

---

> 2022.02.05

-  props로 function 전달할 때 새로운 함수 통해서 전달하던 방식 -> 직접 전달하는 방식으로 변경

---

> 2022.01.31

-  주문페이지 레이아웃

---

> 2022.01.30

-  결제페이지 => 주문페이지, 회원페이지 => 고객페이지로 수정

---

> 2022.01.28

**상품 상태정보(노출여부,추천여부) 변경 즉시 반영되지 않는 오류 수정**
**배너,상세이미지,상품 이미지 수정 시 404 에러 발생하는 현상 수정**

-  상품 관련 기능 OK

---

> 2022.01.27

**상품추가, 수정 컴포넌트 기존에 동일한 컴포넌트였으나 가독성 저하로 인해 따로 분리시킴**

-  상품추가, 수정 시 옵션순서 변경 기능 추가
-  상품추가, 수정 시 일괄품절 기능 추가
-  상품옵션 내용 수정 기능 추가
-  상품옵션 노출여부 수정 기능 추가
-  상품옵션 품절여부 수정 기능 추가

---

> 2022.01.26

-  상품목록에서 토글 메뉴를 활용한
-  상품삭제, 상품노출변경, 수정페이지 이동, 링크확인 가능
-  상품상세페이지에서 상태정보 수정 시 상세정보가 업데이트되지 않는 현상 수정
-  상품상세이미지 수정 기능 추가

---

> 2022.01.25

-  상품추가 시 상세이미지 기존값 남아있는 오류 수정
-  상품추가 시 상세이미지 없을 경우 오류 수정
-  상품추가 시 상품 옵션 최소 1개 등록해야 가능하도록 수정
-  상품추가 시 상품 옵션, 품절여부 설정 가능
-  상품추가 & 상세 템플릿 상세이미지 찌그러짐 => 스크롤로 수정
-  상품상세 스타일 일부 수정(원산지,보관방법 여백 축소)
-  상품삭제 기능 추가
-  상품 노출변경 기능 추가
-  상품 추천상품변경 기능 추가

-  << 상품 상태정보(노출여부, 추천상품여부) >>
-  상세페이지에서만 가능
-  상품 노출인 경우에만 추천상품 등록 가능
-  추천상품에 등록된 경우 노출여부 변경 불가능
-  추천상품에 등록된 경우 삭제 불가능

---

> 2022.01.24

-  각 페이지별 템플릿, 모달 lazy loading
-  상품 옵션 등록 요청 수정
-  상품상세 템플릿 레이아웃
-  리스트 템플릿 렌더링, 오래 걸리는 요청 로딩 화면 구현

**상품 옵션 등록 시 요청이 중복되거나, 요청 먼저 다 보낸 후 한 번에 이후 작업 처리되는 현상 발견 => 재귀함수 이용해서 순차적으로 진행되도록 수정**

---

> 2022.01.23

-  서버 에러 외 alert => modal로 대체

---

> 2022.01.22

-  상품이미지 목록 모달에서 이미지 등록
-  상품이미지 추가 모달에서 이미지 등록

---

> 2022.01.21

-  상품 추가 기능 수정 중
-  상품이미지 목록 모달 추가
-  상품이미지 신규등록 모달 추가

---

> 2022.01.20

-  onChange 함수 전체 함수이름 변경
-  상품 추가 기능
-  (상세이미지추가 => 상품생성 => 상품옵션추가)
-  상품목록 조회 기능

---

> 2022.01.19

-  상품 옵션 추가 기능

---

> 2022.01.18

-  상품 등록 레이아웃

---

> 2022.01.17

-  상품 부분 기획(기능 정리), 상품 목록 레이아웃

---

> 2022.01.15

-  상품 목록 레아아웃 작성중

---

> 2022.01.14

-  상세이미지 상품목록 이전 기능 OK
-  상세이미지 순서 변경 기능 OK
-  상세이미지 목록 => 전체/단일만/공유만 선택해서 조회 기능 추가

---

> 2022.01.13

-  상세조회&수정 페이지 상단에 목록으로/취소하기 버튼 추가
-  수정페이지에서 타입(공유 여부)은 변경 불가능, 별도 버튼으로 분리

---

> 2022.01.12

-  전체 영역(흰 박스) 높이값 995px => 컨텐츠에 따라 무한으로 조정
-  배너, 상세이미지 EditTemplate => 삭제 후 CreateTemplate로 대체

---

> 2022.01.11

-  공급원 수정,삭제기능 api주소 변경, 에러 수정
-  상품이미지 챕터 스타일링
-  상품이미지 추가, 목록 조회 기능 추가

---

> 2022.01.10

-  공급원 추가, 조회, 수정, 삭제 기능 OK

---

> 2022.01.09

-  공급원 페이지 스타일링

---

> 2022.01.08

-  배너 추가,상세조회,수정,노출여부변경,삭제,링크확인 모든 기능 OK

---

> 2022.01.07

-  -  (배너 전시등록 최대인 상태에서) 배너 노출 대체기능 OK

---

> 2022.01.06

-  예/아니요 선택 모달 구현

---

> 2022.01.05

-  배너 추가&수정 컴포넌트 코드 개선
-  수정모드 && 상품카테고리 페이지일 경우 기존에 선택된 카테고리 불러오지 못하는 현상 수정
-  확인 모달창 구현

---

> 2022.01.04

-  배너 수정하기 기능 추가

**기존에 배너 추가 시 배너 클릭 링크 위해서 서버-DB에서 'link=/product/product_id' 의 형태로 보관하던 방식에서 partition, product_id 등 항목별로 나눠서 보관하는 방식으로 변경**
**partition은 DB 예약어 이므로 part로 변경**

---

> 2022.01.03

-  배너 상세조회, 삭제하기 기능 추가
-  배너 노출상태 변경 기능 추가

---

> 2022.01.01

-  regular 폰트 전역 기본값으로 설정
-  언어코드 ko로 변경
-  리스트형 컴포넌트 토글 메뉴(수정,전시상태변경,삭제,연결링크확인) 구분

---

> 2021.12.31

-  배너 관련 페이지별로 분류(목록, 생성, 상세보기, 수정)

**비동기 통신 중 컴포넌트 언마운트 될 때 오류 생기는 현상 발견 => useEffect 내부에 cleanup function 사용**

---

> 2021.12.30

-  배너생성기능 추가

---

> 2021.12.29

-  카테고리 컴포넌트,
-  리스트형 컨텐츠 컴포넌트,
-  푸터 제작

---

> 2021.12.28

-  백그라운드 컴포넌트
-  사이드바(메뉴바) 컴포넌트 제작
-  로그인페이지 스타일, 로그인 기능

---

## Project name

-  품생품사 쇼핑몰 관리자 페이지

## Period

-  2021.12.28 ~

## Member & Role

-  방병도(Front), 최도영(Server, DataBase), 최준영(Design)
