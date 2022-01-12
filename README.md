## Progress & Update

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
