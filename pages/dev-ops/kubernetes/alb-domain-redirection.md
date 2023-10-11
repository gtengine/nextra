# ALB에서 도메인을 다른 도메인으로 리디렉션

현재 회사에서 플랫폼 사업을 서비스 중이다. `AWS`의 `eks`로 서비스를 운영하고 있다.

최근 SEO 관련 작업을 마케팅팀과 진행하고 있는데 서비스의 URL이 `www`가 붙은 url과 붙지 않은 url 모두 제공되면 검색엔진 측에서는 중복 콘텐츠로 인식하여 가치 평가에 좋지 않다고 하여 작업에 착수하게 되었다.

그렇다고 현재 제공되고 있는 것을 죽일 수는 없으니 `www`가 붙어서 들어온 트래픽에 대해서는 `www`가 없는 url로 리디렉션 시키는 방법으로 진행했다.

## 시행착오

위 내용에 대한 개발을 하기위해 몇 가지 방법을 알아보았는데, 실패한 방법과 선택한 방법은 다음과 같다.

1. `AWS route53`내에서 `alias`를 통해 간단하게 처리를 하려고 했으나 실패 (서비스는 문제없이 돌아가지만 URL이 바뀌지 않음)
2. `Nginx-Ingress-controller`를 생성하여 처리하려고 했으나 이는 `NLB`를 사용해야해서 패스 (현재 서비스는 `ALB`로 구축되어 있음)
3. **`ALB`에 리스너 규칙을 추가하여 리디렉션 시키는 방법으로 진행하기로 결정**

## Ingress 수정 전

위에서 결정한 방법으로 개발을 하기 위해 기존의 `ingress.yaml` 파일을 수정해야한다.

수정하기 전의 내용은 다음과 같다.

```yaml {20,37} filename="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: caryak
  name: caryak-ingress
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/subnets: subnet-xxxxxxxxxxxx, subnet-xxxxxxxxxxxx
    alb.ingress.kubernetes.io/actions.ssl-redirect: '{"Type": "redirect", "RedirectConfig": { "Protocol": "HTTPS", "Port": "443", "StatusCode": "HTTP_301"}}'
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-northeast-2:xxxxxxxxxxxx:certificate/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/ssl-redirect: "443"
    alb.ingress.kubernetes.io/healthcheck-path: /health
  labels:
    project: caryak
spec:
  ingressClassName: alb
  rules:
    - host: "caryak.net"
      http:
        paths:
          - path: "/"
            pathType: Prefix
            backend:
              service:
                name: front-end
                port:
                  number: xxxx
          - path: "/xxx"
            pathType: Prefix
            backend:
              service:
                name: back-end
                port:
                  number: xxxx
    - host: "www.caryak.net"
      http:
        paths:
          - path: "/"
            pathType: Prefix
            backend:
              service:
                name: front-end
                port:
                  number: xxxx
          - path: "/xxx"
            pathType: Prefix
            backend:
              service:
                name: back-end
                port:
                  number: xxxx
```

`host`를 두 형태 모두 열어둔 상태이다.

## Ingress 수정 후

```yaml {10,38-47} filename="ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: caryak
  name: caryak-ingress
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/subnets: subnet-xxxxxxxxxxxx, subnet-xxxxxxxxxxxx
    alb.ingress.kubernetes.io/actions.redirect-to-quiz: '{"Type": "redirect", "RedirectConfig": {"Host":"caryak.net", "Path":"/#{path}", "Port":"443", "Protocol":"HTTPS", "Query":"#{query}", "StatusCode":"HTTP_301"}}'
    alb.ingress.kubernetes.io/actions.ssl-redirect: '{"Type": "redirect", "RedirectConfig": { "Protocol": "HTTPS", "Port": "443", "StatusCode": "HTTP_301"}}'
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-northeast-2:xxxxxxxxxxxx:certificate/xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/ssl-redirect: "443"
    alb.ingress.kubernetes.io/healthcheck-path: /health
  labels:
    project: caryak
spec:
  ingressClassName: alb
  rules:
    - host: "caryak.net"
      http:
        paths:
          - path: "/"
            pathType: Prefix
            backend:
              service:
                name: front-end
                port:
                  number: xxxx
          - path: "/xxx"
            pathType: Prefix
            backend:
              service:
                name: back-end
                port:
                  number: xxxx
    - host: "www.caryak.net"
      http:
        paths:
          - path: "/"
            pathType: Prefix
            backend:
              service:
                name: redirect-to-quiz
                port:
                  name: use-annotation
```

`annotations`에 리디렉션에 관련된 규칙을 추가하여 `www.caryak.net`에 적용하였다.

`www.caryak.net`으로 접속 시, url도 `caryak.net`으로 잘 리디렉션되고, `ssl`인증도 문제없이 받아왔다.

끝.
