# Docker 설치

ubuntu에서 docker engine을 사용하려면 몇 가지 전제 조건을 충족해야 한다. 전제 조건 체크부터 docker engine 설치까지 알아보자.
참고로 OS는 **Ubuntu 20.04 LTS**이다.

이 글은 [**_Docker docs 공식 문서_**](https://docs.docker.com/engine/install/ubuntu/)를 참고하였다.

---

## 전제 조건

### OS 요구 사항

docker engine을 설치하려면 아래의 ubuntu 버전이면서, **64bit**여야 한다.

- **Ubuntu Kinetic 22.10**
- **Ubuntu Jammy 22.04 (LTS)**
- **Ubuntu Focal 20.04 (LTS)**
- **Ubuntu Bionic 18.04 (LTS)**

다음 명령어를 통해 OS 버전 정보를 확인할 수 있다.

```bash
lsb_release -a
```

**arch** 명령어를 통해 아키텍처를 확인할 수 있다.

```bash
arch
```

docker engine은 x86_64(amd64), armhf, arm64 및 s390x 아키텍처와 호환된다.

### 이전 버전 제거

이전에 사용했던 docker도 `docker`, `docker.io`, `docker-engine`으로 사용되었을 것이다. 새 버전을 설치하기 전에 이러한 이전 버전을 제거해주자.

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

이전에 설치한 적이 없다면 apt-get에서 `docker-engine` 패키지를 찾을 수 없다는 메시지가 뜰 것이다.

**`/var/lib/docker`에 저장된 images, containers, volumes, networks는 docker를 제거할 때 자동으로 제거되지 않는다.**<br>

_새로 설치하고 데이터를 정리하려면 이 글 하단의 **Docker Engine 제거**를 참고._

---

## Docker Engine 설치

docker engine을 설치할 수 있는 방법은 몇 가지가 있다.

- docker engine은 docker desktop을 설치할 때 함께 설치된다. (가장 쉬운 방법)
- docker의 apt repository에서 docker engine을 설정하고 설치할 수 있다.
- 수동으로 설치하고 업그레이드를 수동으로 관리할 수 있다.
- 간편한 스크립트로 설치할 수 있다. (테스트 및 개발 환경에만 권장)

### Repository를 사용하여 설치

docker engine을 설치하기 전에 docker repository를 설정해야 한다. 그런 다음 repository에서 docker를 설치하고 업데이트할 수 있다.

#### repository 설정

1. `apt`를 업데이트하고 `apt`가 HTTPS를 통해 repository를 사용할 수 있도록 패키지를 설치한다.
   ```bash
   sudo apt-get update
   ```
   ```bash
   sudo apt-get install ca-certificates curl gnupg lsb-release
   ```
2. docker의 공식 GPG 키를 추가한다.
   ```bash
   sudo mkdir -p /etc/apt/keyrings
   ```
   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   ```
3. repository를 설정한다.
   ```bash
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

#### docker engine 설치

1. `apt`를 업데이트한다.
   ```bash
   sudo apt-get update
   ```
2. docker engine, containerd, docker compose를 설치한다. (최신 버전 설치)
   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```
3. `hello-world` image를 사용하여 docker engine이 성공적으로 설치되었는지 확인한다.
   ```bash
   sudo docker run hello-world
   ```
   위 명령어는 테스트 이미지를 다운로드하여 컨테이너에서 실행한다. 컨테이너가 실행되면 확인메시지를 출력하고 종료한다.

성공적으로 docker engine을 설치하였다. docker에는 `user` 그룹이 존재하지만 포함된 사용자가 없으므로 **sudo**를 사용하여 docker 명령을 실행해야 한다.

_sudo 명령어 없이 사용하고 싶다면 [**User group 설정**](https://gtengine.vercel.app/dev-ops/docker/post-installation)를 참고._

---

## Docker Engine 제거

docker engine, CLI, container, docker compose 패키지 제거하기.

```bash
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-ce-rootless-extras
```

호스트에 저장된 `image`, `container`, `volume`, `custom configuration files`는 자동으로 제거되지 않는다. 모든 images와 volumes를 제거하기 위해서는 다음의 명령어를 실행한다.

```bash
sudo rm -rf /var/lib/docker
```

```bash
sudo rm -rf /var/lib/containerd
```

편집한 configuration files는 수동으로 제거해야 한다.

끝.
