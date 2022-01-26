## Progress & Update

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
