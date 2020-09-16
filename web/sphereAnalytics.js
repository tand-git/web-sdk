// @flow
/**
 * SphereAnalytics API 명세서
 */
export interface SphereAnalytics
{
  /** 초기화
   * settings 에 설정 가능한 속성 목록
   * - logLevel: {'none'|'error'|'info'|'verbose'} 로그 레벨 설정 (기본값: 'error')
   * - trackAnonymous: {boolean} 비로그인 사용자 이벤트 수집도 허용 (기본값: false)
   * @param {Object} settings 
   * @returns {SphereAnalytics}
   */
  init(token: string, settings: Object): SphereAnalytics;

  /** 로그인 설정 및 헤제
   * @param {string} userId 
   * @returns {SphereAnalytics}
   */
  setUserId(userId: string): SphereAnalytics;

  /** 사용자 등급 설정
   * @param {string} grade
   * @returns {SphereAnalytics}
   */
  setGrade(grade: string): SphereAnalytics;

  /** 사용자 성별 설정
   * @param {'m'|'f'} gender 성별
   * @returns {SphereAnalytics}
   */
  setGender(gender: 'm'|'f'): SphereAnalytics;

  /** 사용자 출생년도 설정
   * @param {number} year 출생년도 (yyyy)
   * @returns {SphereAnalytics}
   */
  setBirthYear(year: number): SphereAnalytics;

  /** 사용자 폰번호 설정
   * @param {string} phone 폰번호 
   * @returns {SphereAnalytics}
   */
  setPhoneNumber(phone: string): SphereAnalytics;

  /** 사용자 이메일 설정
   * @param {string} email 이메일 주소
   * @returns {SphereAnalytics}
   */
  setEmail(email: string): SphereAnalytics;

  /** 커스텀 사용자 속성 설정
   * @param {string} name 사용자 속성 명
   * @param {string|number|boolean} value 사용자 속성 값
   * @returns {SphereAnalytics}
   */
  setUserProperty(name: string, value: Object): SphereAnalytics;
  
  /** 사용자 보유 포인트 설정
   * @param {number} point 보유 포인트
   * @returns {SphereAnalytics}
   */
  setRemainingPoint(point: number): SphereAnalytics;
  
  /** 사용자 누적 획득 포인트 설정
   * @param {number} point 누적 획득 포인트
   * @returns {SphereAnalytics}
   */
  setTotalEarnedPoint(point: number): SphereAnalytics;

  /** 사용자 누적 사용 포인트 설정
   * @param {number} point 누적 사용 포인트
   * @returns {SphereAnalytics}
   */
  setTotalUsedPoint(point: number): SphereAnalytics;

  /** 이벤트 기록
   * @param {string} name 이벤트 명
   * @param {Object} params 이벤트 파라미터
   * @returns {SphereAnalytics}
   */
  logEvent(name: string, params?: Object): SphereAnalytics;
  
  /** 포인트 정보 삭제
   * @returns {SphereAnalytics}
   */
  resetPoints(): SphereAnalytics;

  /** 기록한 이벤트를 즉시 전송하도록 요청한다.
   * @returns {SphereAnalytics}
   */
  requestUpload(): SphereAnalytics;

  /** 로그 레벨 설정
   * @param {'none'|'error'|'info'|'verbose'} enable 
   * @returns {SphereAnalytics}
   */
  setLogLevel(level: 'none'|'error'|'info'|'verbose'): SphereAnalytics;
}
