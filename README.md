# Sphere SDK - Web

Sphere Analytics 웹 SDK 연동 가이드입니다.

* [기본 연동](#기본-연동)
  * [네이티브 SDK 연동](#네이티브-SDK-연동)
  * [자바스크립트 SDK 다운로드 및 설치](#자바스크립트-SDK-다운로드-및-설치)
  * [SDK 초기화](#SDK-초기화)
  * [자바스크립트 SDK API](#자바스크립트-SDK-API)
* [커스텀 이벤트 사용하기](#커스텀-이벤트-사용하기)
* [사용자 속성 사용하기](#사용자-속성-사용하기)
  * [사용자 아이디 설정](#사용자-아이디-설정)
  * [사용자 정보 설정](#사용자-정보-설정)
  * [커스텀 사용자 속성 설정](#커스텀-사용자-속성-설정)

## 기본 연동

> SDK 기본 연동은 이벤트 수집을 위한 필수 연동 사항이며 보다 정확한 이벤트 분석 및 트래킹을 위해서는 기본 연동에 포함된 가이드 중 해당되는 모든 항목들의 연동이 필요합니다.

* 브라우저 기반의 웹페이지를 이용하는 사용자는 자바스크립트 SDK에서 설정한 웹키를 통해 이벤틀를 수집
* 모바일(Android, iOS) 기반의 웹뷰를 이용하는 사용자는 네이티브 SDK에서 설정한 앱키를 통해 이벤트를 수집

### 네이티브 SDK 연동
> 웹뷰용 자바스크립트 API를 사용하기 위해서는 Android 및 iOS SDK 연동가이드의 기본 연동 및 웹뷰 설정이 필수적으로 완료되어야 네이티브 SDK를 통해 이벤트 수집이 가능합니다.

* [Android SDK 연동가이드](https://github.com/tand-git/android-sdk) : [기본 연동](https://github.com/tand-git/android-sdk#기본-연동), [웹뷰 설정](https://github.com/tand-git/android-sdk#웹뷰-설정)
* [iOS SDK 연동가이드](https://github.com/tand-git/ios-sdk) : [기본 연동](https://github.com/tand-git/ios-sdk#기본-연동), [웹뷰 설정](https://github.com/tand-git/ios-sdk#웹뷰-설정)
* [SDK 연동 검증 가이드](https://github.com/tand-git/sphere-sdk/blob/master/guide/SDK_Inspection.md) : 기본 연동이 완료되었다면 SDK 연동 검증 가이드에 따라 SDK 동작 상태를 확인할 수 있습니다.

### 자바스크립트 SDK 다운로드 및 설치

자바스크립트 API 파일([web/sphereAnalytics.min.js](web/sphereAnalytics.min.js))을 웹서버에 다운로드한 후 웹페이지의 `<head>`에 Sphere 자바스크립트 API 파일(sphereAnalytics.min.js)을 추가합니다.

```html
<script src="sphereAnalytics.min.js"></>
```

### SDK 초기화

전달받은 웹키를 사용하여 Sphere SDK를 초기화합니다. 초기화가 완료되지 않았거나 정상적인 웹키를 사용하지 않은 경우 데이터가 수집되지 않습니다.

```html
<script>
    SphereAnalytics.init("[Your Sphere Web Key]");
</script>
```

### 자바스크립트 SDK API

[웹 SDK를 설치](#웹-SDK-설치)한 후, 페이지 로딩 또는 이벤트 발생 시점에 자바스크립트 API 함수를 호출합니다.

`<sphereAnalytics.min.js>` Sphere 자바스크립트 SDK
> [web/sphereAnalytics.min.js](web/sphereAnalytics.min.js) 파일 참조

`<sphereAnalytics.js>` Sphere 자바스크립트 SDK API 명세서
> [web/sphereAnalytics.js](web/sphereAnalytics.js) 파일 참조

`<index.html>` 웹페이지 사용 예제
> [web/index.html](web/index.html) 파일 참조

## 커스텀 이벤트 사용하기

> 이벤트는 가장 기본이 되는 수집 정보이며 이벤트는 이벤트명과 파라미터들로 구성이 됩니다.

SDK가 초기화 되었다면 `logEvent` 함수를 이용하여 커스텀 이벤트를 설정할 수 있으며, 한 이벤트는 최대 25개의 파라미터를 설정할 수 있습니다.
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

```js
// 이벤트 및 파라미터 기록. 파라미터 형식: JSON 타입 { name : value, ... }
var params = { item: "notebook", price: 9.9, quantity: 1 };
SphereAnalytics.logEvent("purchase", params);

// 파라미터가 없는 이벤트 기록
SphereAnalytics.logEvent("purchase_clicked");
 또는
SphereAnalytics.logEvent("purchase_clicked", null);
```

## 사용자 속성 사용하기

> 사용자 속성을 사용할 경우 수집된 이벤트들을 세분화하여 더욱 자세한 분석 정보를 얻을 수 있으며 개인 정보들은 암호화되어 서버에 저장됩니다. 사용자 속성들은 한번 설정되면 이후 재설정 또는 초기화될 때까지 설정된 값으로 유지됩니다.

사용자 속성 연동 시 고려해야 할 사항은 다음과 같으며 해당되는 모든 시점에 사용자 속성들을 설정해야 정확한 분석이 가능합니다.

1. 자동 로그인 사용 : 로그인 상태 및 사용자 정보를 알 수 있는 가장 빠른 시점에 로그온 또는 로그오프 상태에 따라 사용자 아이디 및 정보를 설정 또는 초기화
2. 자동 로그인 미사용 : 로그인 또는 로그아웃 시 해당 상태에 따라 해당 사용자 아이디 및 정보를 설정 또는 초기화

### 사용자 아이디 설정

고유한 사용자를 구분하기 위한 사용자 아이디로서 설정 여부에 따라 로그인 여부를 판단합니다.  
해당 정보는 유저를 구분하기 위한 용도로만 사용되므로 사용자를 구분하는 어떠한 식별 아이디도 사용 가능합니다.  
사용자 아이디는 최대 256자까지 설정가능하고 `null`로 설정 시 사용자 아이디 정보는 초기화되고 로그아웃 상태로 설정됩니다.  

```js
if (isLogIn) { // 로그인: ON 상태
    // 사용자 아이디 설정 - 로그인: ON 상태
    SphereAnalytics.setUserId("[USER ID]");
} else { // 로그아웃: OFF 상태
    // 사용자 아이디 초기화 - 로그아웃: OFF 상태
    SphereAnalytics.setUserId(null);
}
```

### 사용자 정보 설정

추가적인 사용자 정보(보유 포인트, 등급, 성별, 출생년도, 전화번호, 이메일)를 설정합니다.  
로그아웃 상태 시 다음과 같이 설정된 사용자 정보들을 초기화해야 합니다.

1. 문자형(등급, 성별, 전화번호, 이메일) 초기화 : `null`로 설정
2. 숫자형(보유 포인트) 초기화 : `resetPoints` 함수 호출
3. 숫자형(출생년도) 초기화 : `0`으로 설정

```js
if (isLogIn) { // 로그인: ON 상태

    // 사용자 아이디 설정
    SphereAnalytics.setUserId("[USER ID]");

    // 보유 포인트 설정
    SphereAnalytics.setRemainingPoint(1000);
    // 등급 설정
    SphereAnalytics.setGrade("vip");
    // 성별 설정
    SphereAnalytics.setGender("m"); // 남성일 경우: "m", 여성일 경우: "f"
    // 출생년도 설정
    SphereAnalytics.setBirthYear(1995); // 출생년도
    // 이메일 설정
    SphereAnalytics.setEmail("xxxx@xxxx.com");
    // 전화번호 설정
    SphereAnalytics.setPhoneNumber("821011112222");

} else { // 로그아웃: OFF 상태

    // 사용자 아이디 초기화
    SphereAnalytics.setUserId(null);

    // 보유 포인트 초기화
    SphereAnalytics.resetPoints();
    // 등급 초기화
    SphereAnalytics.setGrade(null);
    // 성별 초기화
    SphereAnalytics.setGender(null);
    // 출생년도 초기화
    SphereAnalytics.setBirthYear(0);
    // 이메일 초기화
    SphereAnalytics.setEmail(null);
    // 전화번호 초기화
    SphereAnalytics.setPhoneNumber(null);

}
```

### 커스텀 사용자 속성 설정

미리 정의되지 않은 사용자 속성 정보를 사용 시 `setUserProperty` 함수를 이용하여 커스텀 사용자 속성을 설정할 수 있습니다.  
사용자 속성은 속성명과 속성값의 쌍으로 구성되며 속성값을 `null`로 설정 시 해당 속성은 초기화 됩니다.

사용자 속성에 관한 규칙은 다음과 같습니다.

1. 사용자 속성명
    * 최대 40자
    * 영문 대소문자, 숫자, 특수문자 중 ‘_’ 만 허용
    * 첫 글자는 영문 대소문자만 허용
    * "sap"으로 시작되는 속성명은 사전 정의된 속성명으로 사용 불가

2. 사용자 속성값
    * 최대 100자
    * 지원 타입 : String

```js
// 커스텀 사용자 속성 설정
SphereAnalytics.setUserProperty("user_property_name", "user_property_value");
// 커스텀 사용자 속성 초기화
SphereAnalytics.setUserProperty("user_property_name", null);
```
