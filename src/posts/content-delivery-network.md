---
title: "CDN(Content Delivery Network)"
slug: "/blog/content-delivery-network"
date: "2025-04-02"
category: web
---
<br>

## CDN 이란?

사용자가 웹 사이트를 방문할 때 해당 웹사이트 서버의 데이터는 사용자의 컴퓨터에 도달하기 위해 인터넷을 통해 이동한다. 사용자가 해당 서버에서 멀리 떨어져 있는 경우 동영상 또는 웹사이트 이미지와 같은 대용량 파일을 로드하는데 시간이 오래 걸린다. 이럴때 지리적으로 사용자와 가까운 **CDN 서버(엣지 서버)** 에 저장(캐싱)하여 컴퓨터에 훨씬 빠르게 도달하게 한다.

<br>

## CDN 의 장점
### 1. 웹사이트 로딩 속도 향상
- 전 세계에 분산된 CDN 서버(엣지 서버)중 사용자에 가까운 서버를 통해 콘텐츠를 제공
- 원본 서버까지 가는 네트워크 지연을 줄여 빠른 로딩 속도 제공 
### 2. 서버 부하 감소 & 트래픽 비용 절감
- CDN 캐싱된 콘텐츠를 제공하기 때문에 원본 서버 요청을 줄임
- 클라우드를 사용하는 경우 데이터 전송 비용 절감 효과
### 3. 보안 강화
- CDN이 여러 CDN 서버(엣지 서버)로 공격 트래픽을 분산하거나 비정상 요청을 차단하여 DDos 방어
- SQL Injection, XSS 등 WAF(Web Application Firewall : 웹 어플리케이션 방화벽) 기능을 제공하여 공격 차단
### 4. 비디오 스트리밍 & 대용량 파일 다운로드 최적화
- CDN이 사용자의 가까운 서버에서 파일을 전송하여 최소화된 버퍼링으로 ABR(Adaptive Bitrate Streaming) 기술을 통해 네트워크 속도가 변해도 자동으로 끊김 없이 화질 조정
- CDN이 사용자의 가까운 서버에서 파일을 전송하며 병렬 다운로드(Parallel Chunk Downloading)를 지원하여 여러 서버에서 동시에 다운로드 받아 속도 증가
### 5. SEO(검색 엔진 최적화) 개선
- 웹사이트 로딩 속도가 빨라져 구글 SEO 점수 상승
- HTTPS 지원을 통해 보안이 강화된 사이트로 인정받아 검색 순위 상승 효과

<br>

## CDN 의 종류
### Public CDN
- CDN 서비스를 제공하는 기업을 통해 사용자가 CDN 서비스를 가입하여 사용하는 일반적인 CDN (ex. Akamai, Cloudflare, AWS CloudFront, Google Cloud CDN 등...)
    - **장점**
        - 자체 인프라를 구축 할 필요 없이 CDN 사용 가능, 글로벌 확장 용이
        - 비용 효율적인 요금제, 사용량 기반 요금
    - **단점**
        - 맞춤형 설정 한계
        - 사용량이 늘면 비용도 증가
### Private CDN
- 기업이 자체적으로 구축하는 CDN (ex. Facebook, Google, Apple 등... 의 자체 CDN)
    - **장점**
        - 맞춤형 네트워크 최적화
        - 보안 강화
        - 트래픽 비용 절감
    - **단점**
        - 확장시 구축 비용 & 유지보수 비용 증가
        - 직접 관리
### multi CDN
- 여러 개의 CDN을 조합하여 사용 (ex. Akamai, Fastly, Cloudflare 등 여러 개의 Public CDN을 조합하여 사용, 지역별로 다른 Private CDN을 사용)
    - **장점**
        - 장애 발생시 다른 CDN이 트래픽 처리(고가용성)
        - 지역별 최적의 CDN을 선택하여 성능 최적화
    - **단점**
        - 멀티 CDN을 관리하는 로드 밸런서, 라우팅 시스템 필요
        - 비용이 증가

<br>

## CDN 캐싱 여부 확인
CDN 제공하는 업체, 개발자의 요청에 따라 request header에 표시가 다를 수 있음.<br>
개발자 도구에서 `X-Cache: HIT`, `cf-cache-status: HIT` 등 글로벌 서비스인데 cache 관련 여부가 있는경우 의심해 볼 것