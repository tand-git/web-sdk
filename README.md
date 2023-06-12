# Sphere Web SDK

* [기본 연동](#기본-연동)
  * [Sphere Analytics 시작하기](#sphere-analytics-시작하기)
  * [샘플 소스 및 연동 검증 가이드](#샘플-소스-및-연동-검증-가이드)
  * [자바스크립트 SDK 다운로드 및 설치](#자바스크립트-SDK-다운로드-및-설치)
  * [자바스크립트 SDK 초기화](#자바스크립트-SDK-초기화)
* [이벤트 연동하기](#이벤트-연동하기)
  * [이벤트 API 연동](#이벤트-api-연동)
* [사용자 아이디 및 속성 연동](#사용자-아이디-및-속성-연동)
  * [사용자 아이디 및 속성 연동하기](#사용자-아이디-및-속성-연동하기)
  * [사용자 포인트 연동하기](#사용자-포인트-연동하기)
  * [커스텀 사용자 속성 연동하기](#커스텀-사용자-속성-연동하기)
  * [사용자 속성 API 연동](#사용자-속성-api-연동)
* [사용자 푸시 동의 설정 (네이티브 SDK 연동 시)](#사용자-푸시-동의-설정)
* [추가 설정](#추가-설정)
  * [로그 출력](#로그-출력)
  * [인앱메세지 설정](#인앱메세지-설정)
  * [멀티도메인 설정](#멀티도메인-설정)
  * [페이지 뷰 수집](#페이지-뷰-수집)
  * [페이지 스크롤 추적](#페이지-스크롤-추적)
 
  


## 기본 연동

> SDK 기본 연동은 이벤트 수집을 위한 필수 연동 사항이며 보다 정확한 이벤트 분석 및 트래킹을 위해서는 기본 연동에 포함된 가이드 중 해당되는 모든 항목들의 연동이 필요합니다.

* 웹뷰 기반의 모바일 앱을 통한 사용자는 네이티브(Android, iOS) SDK에서 설정한 앱키(App key)를 통해 이벤트를 수집
* 인터넷 웹브라우저를 통해 접속한 사용자는 자바스크립트 SDK에서 설정한 앱키(App Key)를 통해 이벤트를 수집합니다.

### Sphere Analytics 시작하기

Sphere Analytics 사용을 위해서는 기본적으로 앱키(App key)가 필요합니다.  
앱키가 없는 경우 Sphere Analytics 콘솔([https://analytics.tand.kr](https://analytics.tand.kr), Chrome 브라우저 활용)을 방문하여 회원 가입 및 로그인 후 앱등록 단계에서 앱키를 발급받습니다.

### 샘플 소스 및 연동 검증 가이드

[SDK 샘플 소스](web)에서 최신 버전의 Sphere SDK가 연동된 샘플 소스를 확인할 수 있습니다.

* 웹페이지 사용 예제: [web/index.html](web/index.html) 파일 참조
* 자바스크립트 SDK: [web/sphereAnalytics.min.js](web/sphereAnalytics.min.js) 파일 참조
* [SDK 연동 검증 가이드(스피어 대시보드)](https://lightning-individual-9c1.notion.site/0ad122054a0d44e59166a90a3c48e8e2) : 기본 연동이 완료되었다면, 이후 스피어 대시보드에서 태깅된 내용을 확인할 수 있습니다.
* [SDK 연동 로그 확인](#로그-출력) : 기본 연동이 완료되었다면, 로그레벨을 설정하여 SDK 동작 상태를 확인할 수 있습니다.


### 자바스크립트 SDK 다운로드 및 설치

[SDK 다운로드 페이지](https://github.com/tand-git/web-sdk/releases)에서 최신 버전의 자바스크립트 SDK 파일(`sphereAnalytics.min.js`)을 웹서버에 다운로드한 후 웹페이지의 `<head>` 태그 내 또는 Sphere 자바스크립트 API 호출 이전 시점에 자바스크립트 SDK 파일을 추가합니다.

```html
<script src="sphereAnalytics.min.js"></>
```

### 자바스크립트 SDK 초기화

SDK 설치가 완료되었다면 [Sphere Analytics 콘솔](https://analytics.tand.kr)에서  발급받은 앱키로 페이지 상단에 `init`을 호출하여 자바스크립트 SDK를 초기화합니다.  
초기화가 완료되지 않았거나 정상적인 앱키를 사용하지 않은 경우 데이터가 수집되지 않습니다.

```js
SphereAnalytics.init("Your Sphere Analytics App Key");
```

## 이벤트 연동하기

> 이벤트는 가장 기본이 되는 수집 정보이며 이벤트는 이벤트명과 파라미터들로 구성이 됩니다.

> 이벤트 연동 검증 방법 : [SDK 연동 검증 가이드](https://lightning-individual-9c1.notion.site/0ad122054a0d44e59166a90a3c48e8e2) | [로그 출력](#로그-출력)

SDK가 초기화 되었다면 `logEvent` 함수를 이용하여 이벤트를 연동할 수 있으며, 한 이벤트는 최대 25개의 파라미터를 설정할 수 있습니다.
파라미터는 파라미터명과 파라미터값의 쌍으로 구성되며 JSON 타입을 통해 설정이 가능합니다.

이벤트명은 필수이며 파라미터는 없는 경우 `null`로 설정 가능합니다. 이벤트명과 파라미터에 관한 규칙은 다음과 같습니다.

1. 이벤트명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용

2. 파라미터명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수 문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용

3. 파라미터값
    * 지원 타입 : String(최대 100자), Number
    * 추가지원타입 : String[]배열 (webview 사용중인 경우
      iOS SDK v1.2.10 이상부터 지원)

```js
// 파라미터를 포함한 이벤트 기록
// 파라미터 형식: JSON 타입 { name:value, ... }
var params = { param_name_1: "param_value"
            , param_name_2: 9.9
            , param_name_3: 1 
            , param_name_4: ['value1','value2']
            };

SphereAnalytics.logEvent("event_name_1", params);

// 파라미터가 없는 이벤트 기록
SphereAnalytics.logEvent("event_name_2", null);
```

### 이벤트 API 연동
> 서버에서만 인지하는 Interaction 예를 들어, 무통장 입금 완료/ 상품 배송 시작/ 장바구니 강제 초기화 등은 API 연동으로 지원한다.
> 
> 해당 문의는 담당자/dev@tand.kr로 연락 주시면 API 규격서 안내 드립니다.

> API로 수집된 이벤트는 서버에서 발생시킨 데이터이기 때문에 사용자의 기기 Id를 수집할 수 없고 콘솔에서 기기 Id로  조회할 수 없습니다.


## 사용자 아이디 및 속성 연동

> 사용자 속성을 사용할 경우 수집된 이벤트들을 세분화하여 더욱 자세한 분석 정보를 얻을 수 있으며 개인 정보들은 암호화되어 서버에 저장됩니다. 사용자 속성들은 한번 설정되면 이후 재설정 또는 초기화될 때까지 설정된 값으로 유지됩니다.

### 사용자 아이디 및 속성 연동하기

> [필독] 사용자 아이디 및 속성 연동 시 주의 사항
> 1. 사용자의 로그인 성공 및 사용자 속성이 변경되는 시점에 사용자ID 및 속성을 설정한다.
> 2. 사용자의 로그아웃(로그인이 풀린) 시점에 사용자 아이디(setUserId)를 null로 설정해야 사용자 아이디 및 속성 정보가 일괄 초기화된다. 즉, 로그아웃 설정을 보내줄때까지 사용자의 로그인 상태로 인지된다.

```js
/* 사용자가 직접 로그인 성공하였을때 */
// 사용자 아이디 설정
SphereAnalytics.setUserId("USERID");
// 등급 설정
SphereAnalytics.setGrade("vip");    
// 성별 설정
SphereAnalytics.setGender("m"); // 남성일 경우: "m", 여성일 경우: "f"
// 출생년도 설정
SphereAnalytics.setBirthYear(1995); // 출생년도
// 보유 포인트 설정
SphereAnalytics.setRemainingPoint(1000);
```
> 로그아웃 시점에 사용자 아이디(setUserId)를 null로 설정시 사용자 아이디 및 속성 정보 일괄 초기화된다.
```js
if(!isLogin) {
    // 로그아웃: 로그인 OFF 상태
    // 다음과 같이 사용자 아이디 초기화 입력 시 사용자 속성도 초기화됩니다.
    SphereAnalytics.setUserId(null);
}
```

### 사용자 포인트 연동하기

미리 정의되지 않은 사용자 속성 정보를 사용 시 `setRemainingPoint`(보유 포인트) 함수를 이용하여 커스텀 사용자 포인트를 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 사용자 속성 정보 초기화 시 `removePoints` 함수를 이용하여 초기화가 가능합니다.
또한 사용자의 전체 포인트를 초기화하는 경우 `resetPoints`함수를 이용하여 초기화 가능합니다.

1. 사용자 속성값
    * 최대 100자
    * 지원 타입 : String

2. 사용자 속성명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용
    * setRemainingPoint(포인트) 함수사용 시 "point"로 사전 정의된 포인트명임으로 사용 불가

```js
// 커스텀 사용자 속성 설정
SphereAnalytics.setRemainingPoint( 1234567, "user_point_name");
// 커스텀 사용자 속성 초기화
SphereAnalytics.removePoints("user_point_name");
// 사용자 포인트 전체 초기화(기본포인트 + 커스텀포인트)
SphereAnalytics.resetPoints();
```

### 커스텀 사용자 속성 연동하기

>미리 정의되지 않은 사용자 속성 정보를 사용 시 `setUserProperty`(문자형) 또는 `setUserPropertyLong`(정수형) 함수를 이용하여 커스텀 사용자 속성을 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 사용자 속성 정보 초기화 시 `removeUserProperty` 함수를 이용하여 초기화가 가능합니다.
또한 문자형 사용자 속성의 경우 속성값을 `null`로 설정 시 해당 속성은 초기화 됩니다.

(단, 개인정보는 전달하면 안됩니다. ex: 생년월일, 전화번호, e-mail등)

사용자 속성에 관한 규칙은 다음과 같습니다.
1. 사용자 속성명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용
    * "sap"으로 시작되는 속성명은 사전 정의된 속성명으로 사용 불가

2. 사용자 속성값
    * 최대 100자
    * 지원 타입 : String , Number , String[]배열 (SDK 1.1.6 부터 지원)


```js
// 커스텀 사용자 속성 설정
SphereAnalytics.setUserProperty("user_property_name_1", "user_property_value");
SphereAnalytics.setUserPropertyLong("user_property_name_2", 12345);
// 커스텀 사용자 속성 초기화
SphereAnalytics.removeUserProperty("user_property_name_1");
SphereAnalytics.removeUserProperty("user_property_name_2");

// 배열 속성 설정
SphereAnalytics.setUserPropertyArray("user_property_arr",['prop1','prop2'])
// 배열 속성 초기화
SphereAnalytics.setUserPropertyArray("user_property_arr",null)

```

### 사용자 속성 API 연동
> 사용자 속성은 정확도를 높이기 위해서 API 연동을 지원하며, 해당 문의는 담당자/dev@tand.kr로 연락 주시면 API 규격서 안내 드립니다.


## 사용자 푸시 동의 설정

> 사용자의 푸시 동의 설정에 따라 푸시 메시지 발송 허용 여부를 판단하기 위해서는 해당 정보를 SDK에 설정해야 합니다.

> 로그인, 로그아웃 등 푸시동의정보 변경이 발생되는 위치에 SDK 설정이 필요합니다.

> [KISA]의 앱 푸쉬 안내가이드 확인바랍니다. [링크](https://spam.kisa.or.kr/spam/na/ntt/selectNttInfo.do?mi=1020&nttSn=1141&bbsId=1002)

정보성, 광고성 푸시 발송 동의 설정은 필수 항목이며, 야간 푸시 발송은 미설정 시 동의 거부 상태로서 야간에 푸시 메시지가 발송되지 않습니다.

```js
// 정보성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForInformation(true);
// 광고성 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageForAdvertisement(false);
// 야간 푸시 발송 동의 설정 (허용:true, 거부:false)
SpherePushMessage.agreePushMessageAtNight(false);

//ex)
SpherePushMessage.agreePushMessageForInformation(false);
SpherePushMessage.agreePushMessageForAdvertisement(false);
// 야간 동의 설정이 있는 경우에만
//SpherePushMessage.agreePushMessageAtNight(false);
if (isLogIn) { // 로그인: ON 상태 및 사용자 속성 변경 시 설정

    // 사용자 아이디 설정
    SphereAnalytics.setUserId("[USER ID]");
    ...// 사용자 속성 설정등
    
    // 정보성 푸시 : 고객사에 로그인 유저 관리에 따라 설정
    SpherePushMessage.agreePushMessageForInformation(true);
    // 광고성 푸시 : 고객사에 로그인 유저 관리에 따라 설정
    SpherePushMessage.agreePushMessageForAdvertisement(["사용자 동의설정값"]);
    // 야간 푸시 수신 동의 설정이 있는 경우에만 참조.
    //SpherePushMessage.agreePushMessageAtNight(["동의설정값"]);
} else { // 로그아웃: OFF 상태
    // 사용자 아이디 초기화
    SphereAnalytics.setUserId(null);
    // 정보성 푸시 : 고객사에 정책에 따라 설정
    SpherePushMessage.agreePushMessageForInformation(["사용자 동의설정값"]); 
    // 비로그인 유저의 광고성 푸시/ 야간 푸시 설정에 관련된 내용은 하단의 KISA의 앱푸시 광고 가이드 참조바랍니다.
    // 광고성 푸시 설정 false
    SpherePushMessage.agreePushMessageForAdvertisement(false); 
    // 야간 푸시 수신 동의 설정이 있는 경우에만 참조. 야간 푸시 동의 설정 false
    //SpherePushMessage.agreePushMessageAtNight(false);
}
```

> [주의] 로그아웃한 경우 광고수신 여부를 아래와 같이 작성되어야합니다.

> [KISA]의 앱푸시 광고 가이드 - 기타사항 안내사항 확인: [링크](https://spam.kisa.or.kr/spam/na/ntt/selectNttInfo.do?mi=1020&nttSn=1141&bbsId=1002)


## 사용자 휴면/ 탈퇴 정보 전달

> 휴면/ 탈퇴로 변경된 사용자를 필터링하여 푸시 메세지를 발송하기 위해 API로 휴면/ 탈퇴 정보 전달이 필요합니다.

> 해당 문의는 담당자/dev@tand.kr로 연락바랍니다.




## 추가 설정

> 추가 설정은 필수적인 연동 사항은 아니며 필요한 경우 선택적으로 사용이 가능합니다.


### 로그 출력

> 로그 출력을 활성화 하면 SDK 초기화 성공 여부 및 이벤트, 사용자 속성 설정에 관한 로그를 확인할 수 있습니다.  
> 기본 설정은 비활성화 상태이며, 서버로 전송된 데이터 확인은 [SDK 연동 검증 가이드(스피어 대시보드)](https://lightning-individual-9c1.notion.site/0ad122054a0d44e59166a90a3c48e8e2)를 참조바랍니다.

```js
SphereAnalytics.setLogLevel('info'); //default: error, 로그 레벨: ['none' | 'error' | 'info']
```

### 인앱메세지 설정

>인앱메세지를 사용을 하는 경우 아래와 같이 설정합니다.

```js
let sphereAs_options  = new Object();
sphereAs_options.webMsg = true; //default: false, 웹메세지 사용 여부

// 기존 SDK 초기화 부분을 아래와 같이 변경하여 초기화합니다.
SphereAnalytics.init(
        'Your Sphere App Key', sphereAs_options
);
```

### 멀티도메인 설정
> 멀티도메인은 SDK에서 자동으로 설정합니다.
>
> 설정된 멀티도메인의 확인 및 수정이 필요한 경우 아래의 가이드를 참조바랍니다.

```js
// 현재 SDK에 설정된 멀티도메인 주소값 확인방법
// 1.브라우저-개발자도구-console창에 아래와 같이 입력합니다.
SphereAnalytics.setLogLevel('info');
SphereAnalytics.setNthDomain();
// 2.콘솔창에 출력된 현재 설정된 멀티도메인값을 확인합니다.

// 3.출력된 멀티도메인 값이 수정이 필요한 경우 아래의 스크립트를 WebSDK init시점에 적용합니다.
let sphereAs_options  = new Object();
// 입력하고자하는 n차 도메인에 해당하는 n을 입력.
sphereAs_options.nthDomain = n //n은 숫자타입, 2부터 입력가능.
// ex) code.tand.kr 인경우
// n에 2입력시 'tand.kr'로 2차도메인으로 설정
// n에 3입력시 'code.tand.kr'로 3차도메인으로 설정

// 기존 SDK 초기화 부분을 아래와 같이 변경하여 초기화합니다.
SphereAnalytics.init(
    'Your Sphere App Key', sphereAs_options
);
```

### 페이지 뷰 수집
> 페이지 뷰 수집 설정 방법은 아래와 같이 4가지로 제공됩니다.
>- (공통) SphereAnalytics.init("앱키") 코드 이후 적용합니다.

>
>1. 자동 수집 방식 : 아래와 같은 데이터를 자동으로 수집 가능.
>- 수집 데이터 : 페이지 타이틀, URL, 캠페인 정보(utm)
>2. 페이지 타이틀명 변경 : 페이지 타이틀에 원하는 값으로 전송 가능하고, 나머지 데이터는 자동으로 수집 가능.
>- 수집 데이터 : 페이지 타이틀(변경한 값), URL, 캠페인 정보(utm)
>3. 커스텀 파라미터 수집 : 커스텀한 데이터를 전송 가능하고, 나머지 데이터는 자동으로 수집 가능.
>- 수집 데이터 : 커스텀 데이터, 페이지 타이틀, URL, 캠페인 정보(utm)
>4. 페이지 타이틀 변경 & 커스텀 파라미터 수집 : 페이지 타이틀에 원하는 값으로 전송 가능하고, 커스텀한 데이터를 전송 가능하고, 나머지 데이터는 자동으로 수집 가능.
>- 수집 데이터 : 커스텀 데이터, 페이지 타이틀(변경한 값), URL, 캠페인 정보(utm)
```js
// 1. 자동 수집 방식 코드
SphereAnalytics.pageView();
```
```js
// 2.페이지 타이틀명 변경하여 수집하는 방식 코드
SphereAnalytics.pageView('수집 페이지명')
```
```js
// 3.커스텀 파라미터 수집하는 방식 코드(예시)
let sphereAs_pageViewObj  = new Object();
sphereAs_pageViewObj.category = '식품'
SphereAnalytics.pageView( null, sphereAs_pageViewObj);
```
```js
// 4.페이지 타이틀 변경 및 커스텀 파라미터 수집하는 방식 코드(예시)
let sphereAs_pageViewObj  = new Object();
sphereAs_pageViewObj.category = '식품'
SphereAnalytics.pageView('수집 페이지명', sphereAs_pageViewObj);
```

### 페이지 스크롤 추적
> 페이지 내에 고객의 최대 스크롤한 정보를 수집합니다.
> 스크롤 추적이 필요한 페이지에 코드를 삽입합니다.
> - (공통) SphereAnalytics.init("앱키") 코드 이후 적용합니다.

```js
// 함수 활용하여 스크롤 정보 수집하기 (적용된 페이지만 수집)
SphereAnalytics.scroll(true);
```




