<div align="center">

<h1>On & Off ⏻</h1>

![header](https://capsule-render.vercel.app/api?type=venom&color=auto&height=500&section=header&text=OnOff&fontSize=90)

![Image](https://github.com/user-attachments/assets/8f27ef3d-fb2e-4c3b-bee7-fe262a32e297)

## <div align="center">직원들의 근태관리를 쉽게 도와주는 서비스</div>

<br />

</br>

[✨ On & Off URL] (https://onoffatt.site/)

</div>

<br />

# ⭐️ 프로젝트 소개

회사에서 직원들의 출석을 관리하고 직원들의 급여 정산을 쉽게 할 수 있도록 도와주는 서비스입니다.

실제 지인 분화사에서 적용하기 위해서 요구사항을 받아서 제작한 프로젝트입니다.

더 좋은 기능을 제공해드리기 위해서 지속적으로 리팩토링 하고 있습니다.

<br />

# ⚒️ 기술 스택

<div align="center"> 
  <img src="https://img.shields.io/badge/Typescript-5.7.3-3178C6?logo=typescript">  
  <img src="https://img.shields.io/badge/React-17.0.2-61DAFB?logo=react">  
  <img src="https://img.shields.io/badge/Zustand-5.0.5-602C3C?logo=zustand">  
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.0-06B6D4?logo=tailwindcss">  
  <img src="https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite">  
  <img src="https://img.shields.io/badge/Shadcn%20UI-0.5.2-000000?logo=shadcn">  
  <img src="https://img.shields.io/badge/Firebase-10.7.1-FFCA28?logo=firebase">  
  <img src="https://img.shields.io/badge/React%20Router%20Dom-6.21.1-CA4245?logo=react-router">  
</div>

<br/>

# 💪🏻 프로젝트 경험

### 1. 회사에 필요한 기능 직접 관리자 분께 피드백 받아 기능 추가 구현

- 실제 공사 관련 회사를 운영 중인 지인 분께 피드백을 받아 회사의 근태 관리에 필요한 기능을 구현했습니다.
- 초기에는 QR SCAN 방식을 사용했지만, **QR 코드 악용 가능성**과 **어르신 분들의 사용 불편**을 고려하여  
  👉 **GPS 기반 출퇴근 방식으로 개선**하였습니다.
- 위치 기반으로 출퇴근을 체크하며, 보다 간편하게 출퇴근을 등록할 수 있도록 개선하였습니다.

  <table>
    <tr>
      <td>
        <img src="https://github.com/user-attachments/assets/07f0476f-7f63-4f18-907a-528bb00f2c1d" width="300" />
      </td>
      <td>
        <img src="https://github.com/user-attachments/assets/44b0955c-bd21-4b99-861b-cffdb191c50d" width="300" />
      </td>
    </tr>
  </table>

  - 어르신 분들이 IT 기기 사용에 익숙치 않아 사용하기 힘들어 하신다는 의견을 받아 상세한 AppGuide 페이지 제공 및 각 페이지 마다 React-Joyride 를 이용해서 상세한 사용법 제공해 드려 조금이나마 쉽게 사용하실 수 있도록 도와드리고자 노력했습니다.

    [Appguide Page 제공 및 React-Joyride 제공](#appguide-page-제공-및-react-joyride-제공)

  - 또한 휴가 등록 및 외근 , 공휴일 야간 수당 구분 등 회사에 필요한 기능들 지속적으로 피드백받아서 구현중에 있습니다.

  - App Guide 페이지를 통해 서비스 사용법을 상세히 안내했습니다.

  - 기존에는 React-Tour를 활용했지만,  
    👉 **더 유연하고 직관적인 경험을 위해 React-Joyride로 교체**하였습니다.

    <br />

### 2. 사용자가 더욱 편하게 사용할 수 있고 유지보수 하기 쉬운 코드

- 현재까지도 지속적으로 개선하고 있는 프로젝트 이고, 사용자가 더욱 편하게 사용하기 위해서 어떤 기능을 개선할 수 있을지 고민 하고 있는 프로젝트 입니다.
- 이미지, 데이터를 가져오는데 조금 더 자연스럽고 깔끔하게 가져오기 위해서 lazy 로딩 및, tanstack-query 도입 예정에 있습니다.

<br />

# 주요 기능 설명

## 관리자 기능

---

### [ 홈 대시보드 ]

<table>
  <tr>
    <td align="center" colspan="2">
      <img src="https://github.com/user-attachments/assets/fe27401c-3656-41c8-a62b-0425a3504fbd" width="700" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/35764155-8973-4252-bfe0-1dad85f80689" width="340" height="200" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ca53fe44-bde3-4781-87ce-5617e5b12af4" width="340" height="200"/>
    </td>
  </tr>
</table>

- 출퇴근 및 휴가, 구성원, 근무지 등 다양한 회사의 정보를 한 눈에 볼 수 있는 페이지

- 회사의 다양한 근태 관련 정보를 한눈에 시각화 할 수 있고 상세 페이지로 이동하실 수 있습니다.

<br/>

### [ 정산 기능 ]

![Image](https://github.com/user-attachments/assets/d130fc61-ccdf-486e-bffa-b7c94472c07e)

- 관리자가 설정한 시급, 정산 기준일, 야간/공휴일 수당 배율 기준으로 직원의 월별 정산을 진행할 수 있습니다.
- 직원 설정에서 시급으로 설정된 급여 기준으로 정산을 진행합니다. 급여 계산이 필요없으신 경우에는 수당 계산 포함하기를 체크하지 않고 진행하시면 됩니다.

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/276742b3-99e2-401d-9de3-e9df7d39409a" width="300" height="330" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/f9321ea9-cbfc-469b-b568-794cc95e989e" width="300" height="330" />
    </td>
  </tr>
</table>

- 위의 조건을 기준으로 월별 데이터를 생성하여 최종적으로 엑셀파일로 다운로드까지 진행하여 관리할 수 있습니다.

<br/>

### [ 출퇴근 조회 기능 ]

<br/>
1. 금일 출퇴근

![Image](https://github.com/user-attachments/assets/6814df1f-d5d3-402f-96b3-6427beef8ff4)

- 금일 직원들의 출퇴근 정보를 근무지별로 시각화해 한눈에 확인할 수 있습니다.
- 외근, 미출근, 휴가 인원도 함께 표시되어 전체 출근 분포를 직관적으로 파악할 수 있습니다.
- 지난 날짜의 출퇴근 기록도 확인할 수 있으며, 근무지 별 인원 확인도 가능합니다.
- 오류 발생 시 관리자가 직접 출퇴근을 수동으로 등록할 수 있습니다.

<br/>
2. 외근 출근자 요청 승인

<table>
  <tr>
    <td align="center" colspan="2">
      <img src="https://github.com/user-attachments/assets/c5e5cfd1-e1a2-4c8b-8643-4ed0bbba4753" width="600" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/035f7ae1-18cf-48bd-ae28-364391c00804" width="300" />
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/c1f97af3-0403-4c0b-b938-909a4367cbb3" width="300" />
    </td>
  </tr>
</table>

- 관리자가 지정한 근무지가 아닌 장소에서 외근이 필요한 경우, 직원은 외근을 요청해야 하며, 관리자의 승인을 받은 후에 외근 등록이 완료됩니다.
- 직원이 외근 요청을 등록시에 금일 출퇴근 페이지 외근 인원 영역 에 알림이 실시간으로 나타납니다.

![Image](https://github.com/user-attachments/assets/c2a5d690-93b1-4f6d-a366-de9ae77083e5)

- 해당 알림을 클릭 후에 직원의 정보와 외근시 입력한 상세한 메모를 확인후에 수락, 거절을 해주시면 됩니다.
- 수락, 거절 후에는 실시간으로 직원에게 알림(서비스 안의 직원 알림 휴대폰으로 알림이 오지않고, 서비스안에서 알림이 옵니다.) 및 실시간으로 외근 처리가 되니
  직원에게 따로 안내해 주지 않으셔도 됩니다.

<br/>
3. 기간 출퇴근

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/27279518-c19b-44fe-b9ea-09ac43d0c5aa" width="500" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/2326ae59-1fa0-4176-a403-bbd4280c529e" width="500" />
    </td>
  </tr>
</table>

- 월별 직원들의 출퇴근 정보를 전체 및 근무지별로 확인할 수 있으며, 특정 직원의 월간 현황도 확인할 수 있습니다.
- 필터를 통해서 전체 및 근무지의 월간 현황을 한눈에 볼 수 있는 기능
- 해당 날짜를 클릭시 금일 출퇴근 페이지로 이동해서 해당 날짜의 상세 정보를 확인할 수 있습니다.
- 특정 직원의 월간 현황 한눈에 보는 기능

  <br/>

### [ 휴가 관련 기능 ]

![Image](https://github.com/user-attachments/assets/b7b62710-b0ce-4ded-9796-4ab33e4d98e5)
![Image](https://github.com/user-attachments/assets/4eac673d-ed1e-43fe-8ba3-964e12437e03)
![Image](https://github.com/user-attachments/assets/eceb8223-a95a-474c-9b56-159d1de38524)

- 직원들의 휴가 사용 통계 및 휴가 요청 승인 및 내역 확인에 관련된 기능을 사용할 수 있습니다.
- 전체 휴가 현황 및 특정 직원, 유형별 휴가 현황 등 다양한 관점에서 휴가 시각화 하여 볼 수 있습니다.
- 직원이 요청한 휴가를 처리 할 수 있으며, 직원의 휴가를 직접 등록 할 수 있는 기능도 있습니다.

<br/>

### [ 회사 설정 기능 ]

<br/>
1. 기본 설정

<table>
  <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/501d49ae-783f-410d-85af-6d293fa99a15" width="250" />
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/e1f862ba-fd94-4efb-b569-21c20bf80469" width="250" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/76341259-62df-481b-bf4b-de724f1e724b" width="250" />
    </td>
  </tr>
</table>

- 회사의 다양한 설정을 진행할 수 있는 기능입니다. 꼭 저장 버튼을 눌러서 저장을 해주셔야 변경사항이 저장됩니다.
- 회사 기본 설정 : 회사의 기본 설정에 관련된 정보를 수정 할 수있습니다.
- 회사 직무 설정 : 직원들의 분류에 필요한 직무들을 추가, 삭제 할 수 있습니다.
- 회사 야간/공휴일 및 급여 정산일 설정 : 회사의 정산에 필요한 정보들을 수정할 수 있습니다.

<br/>
2. 직원 관리 설정

![Image](https://github.com/user-attachments/assets/2a03396c-a0c2-4698-846e-6eb446151e57)
![Image](https://github.com/user-attachments/assets/f0a4f80c-09ce-4a14-bf93-706a9afd983d)

- 회사에 등록된 직원들을 테이블로 볼 수 있고, 직원 정보를 수정 할 수 있습니다. 직원 클릭 후에 처음 직원이 가입할 때 설정한 직종, 고용형태, 급여(시급, 정산 기능에 사용할 급여) 등을 수정, 조회 할 수 있습니다.

<br/>
3. 근무지 설정

<table>
  <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/6896fd3f-193b-41ef-a4af-66520dd9b7cb" width="300" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/343cd0b7-9d84-410e-9e1f-212b30e9e88c" width="300" />
    </td>
  </tr>
</table>

- 직원들이 출퇴근 할 수 있는 근무지를 설정 및 수정을 할 수 있습니다.
- 주소 검색을 통해 근무지의 위치, 이름, 설명, 반경 범위를 설정할 수 있습니다.
- 서비스는 GPS기반으로 직원들이 근무지 주변에 출퇴근 시, 버튼만 누르면 출퇴근을 할 수 있도록 되어 있습니다.
- 지도 상에서 커서를 직접 이동시켜 검색되지 않는 근무지도 수동으로 지정할 수 있습니다.

<br/>

## 직원 기능

---

### [홈 대시보드]

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/e046989d-f530-4cb5-8ea7-ef98ceabd6d4" width="300" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/3a8daa69-306c-4cd3-ac86-6290a32bd636" width="300" />
    </td>
  </tr>
</table>

- 다양한 근태 관련 정보를 한눈에 시각화 할 수 있고 상세 페이지로 이동하실 수 있습니다.

<br/>

### [ 홈 - 출퇴근 ]

<table>
    <tr>
      <td>
        <img src="https://github.com/user-attachments/assets/07f0476f-7f63-4f18-907a-528bb00f2c1d" width="300" />
      </td>
      <td>
        <img src="https://github.com/user-attachments/assets/44b0955c-bd21-4b99-861b-cffdb191c50d" width="300" />
      </td>
      <td>
        <img src="https://github.com/user-attachments/assets/f1818f15-9eda-4fd8-9f2c-0f97408ee0cf" width="300" />
      </td>
    </tr>
  </table>

- 위치 기반 출근 인증을 통해 설정된 근무지 반경 내에서만 출근이 가능합니다.
- 대시보드에 있는 출퇴근 버튼을 누르면 근무하는 근무지를 선택 후, 확인 절차를 통해 등록됩니다.
- 이후 대시보드를 출퇴근한 상태, 근무지 그리고 시간을 통해 상황을 확인할 수 있습니다.

<br/>

### [ 홈 - 외근 ]

<table>
  <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/6bf43379-df78-4508-9663-1ec315364614" width="300" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ebc2fd3b-03a9-47b6-ad69-1f43414b2021" width="300" />
    </td>
  </tr>
</table>

- 외근의 경우, 메모(사유)를 입력하여 등록 시, 관리자에게 외근 요청
- 출근과는 별개로 위치에 관여하지 않고 외근 출근을 등록 할 수 있습니다.
- 관리자의 승인이 처리되면 처리된 시간이 출근 시간으로 기록됩니다.

<br/>

### [ 출퇴근 기록 ]

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6193baee-1d0c-4263-8deb-8cbf72f56e59" width="300" />
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/6734ec58-ae46-4437-aa59-a51cb9516e4b" width="300" />
    </td>
  </tr>
</table>

- 월 단위로 근무 이력을 달력 형태로 쉽게 확인이 가능합니다.
- 각 날짜를 클릭하면 출퇴근 시간, 근무지 정보, 외근/휴가 상태가 함께 표시됩니다.
- 월 단위로 출근, 외근, 휴가의 총 일수를 집계하여 통계로 나타냅니다.

### [ 휴가 ]

<table>
  <tr>
    <td rowspan="2" align="center">
      <img src="https://github.com/user-attachments/assets/11bf77de-9417-4738-a4db-031b82611bc2" width="300" height="643" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/5a7085fd-4308-4a5f-bedb-aa5fd362e1c9" width="300" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1b3ffa0a-55a8-4896-bb7e-d1f2cb858581" width="300" />
    </td>
  </tr>
</table>

- 사용한 휴가를 연도별로 집계하여 총 일수를 확인 할 수 있습니다.
- 직원이 휴가를 유형, 기간, 사유를 입력하여 신청을 하면 실시간으로 관리자에게 전달되며 알림으로도 안내됩니다.
- 처리된 휴가 내역들은 상태별로 확인이 가능하고 상세 내역 또한 확인이 가능합니다.

## 서비스 편의성 기능

---

### [ Appguide Page 제공 및 React-Joyride 제공 ]

1. 다운로드 가이드 및 출퇴근 가이드

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/6d3d2304-ed96-4743-9b06-a6ebd5e216e6" width="300" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/eee94fe0-c8f2-42f0-ac0d-cad50554a650" width="300" />
    </td>
  </tr>
</table>

- 서비스 사용하시는 분들 특성상 IT 가 익숙하지 않은 분들이 많으셔서 다운로드 가이드와 출퇴근 가이드 페이지를 따로 제공 하여 사용법을 자세히 설명 해드렸습니다.

<br/>
2. React-Joyride

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/745d2daf-e9f4-4b8d-be1a-519e0b8831c0" width="300" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/0fd77012-79ad-4d21-ba52-97afc34a29ac" width="300" />
    </td>
  </tr>
</table>

- 저희 서비스를 이용하는데 불편함을 줄이기 위해 React-Joyride 를 사용하여 상세한 안내 가이드를 제공하고 있습니다.
- 서비스를 처음 이용시 자동으로 각 페이지 상세 가이드를 제공합니다.
- 다시 보고 싶을 때는 (모바일 기준) 상단에 있는 물음표 버튼을 클릭하면 동일하게 가이드가 나옵니다.

<br />

### [ DarkMode 지원 ]

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/07a3a0ad-7b64-42de-b48e-6003594f9c09" width="300" />
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ca2b17b0-610f-4257-b895-79d3745b9852" width="300" />
    </td>
  </tr>
</table>

- Tailwind DarkMode 를 사용하여 DarkMode 또한 지원해드렸습니다.

<br/><br/>

# 🏃‍♂️ 팀원 소개

## 🐙 권수혁 (FE)

- 블로그: https://velog.io/@tngur0716/posts
- 깃허브: https://github.com/kwonsuhyuk

## 😊 유제현 (FE)

- 깃허브 : https://github.com/YOOJEHYEON

## 👾 오민택 (FE)

- 깃허브 : https://github.com/mintaek61

<br />
