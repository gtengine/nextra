# Ubuntu 20.04 LTS 초기 설정

AWS EC2를 인스턴스 할 때마다 자주하는게 아니라서 **Ubuntu 20.04 LTS** 기본 세팅하는데 까먹거나 헷갈리는 부분들이 있어서 정리해 놓고자 한다. 인스턴스하는 과정은 생략한다.

---

## Ubuntu Server 접속

가장 간단한 방법은 AWS의 콘솔에서 **Connect using SSH** 버튼을 눌러서 바로 접속하면 된다. 하지만 콘솔에서의 접속창은 코딩 개발을 하기에는 불편한 점이 너무 많다.

나의 경우는 `vscode`를 사용하여 코딩을 하기 때문에 `vscode`로 접속하는 방법을 정리해 보겠다.

## Static IP 발급

먼저 편하게 접속을 하기 위해서는 `static IP`를 발급해야한다.

`static IP`를 발급하지 않으면 동적으로 IP가 바뀌기 때문에 바뀔 때마다 IP 주소를 확인해야 해서 귀찮다. <del>_DHCP 때문인데 이런 개념들은 모두 생략하겠다._</del>

- **EC2 console - Networking - IPv4 networking - PUBLIC IP - Attach static IP**

## PEM 파일 다운로드

static IP를 발급했으면 다음은 `.pem`파일을 발급해야한다.

PEM은 주로 인증서나 개인키 발급에 사용하는 확장자이다.

- **EC2 console - Connect - Use your own SSH Client - SSH KEY - Download default key**

## SSH Configuration file

마지막으로 `ssh configuration` 파일 설정을 해주자.

위에서 준비한 접속에 필요한 정보들을 저장하는 파일이라고 생각하면 된다.

하지만 그 전에 **vscode**를 열고 먼저 필요한 extentions를 설치해야 한다.

- **Remote - SSH**
- **Remote - SSH : Editing Configuration Files**
- **Remote Explorer**

설치가 모두 끝났으면,

- **`ctrl + shift + p` - Open SSH Configuration file - C:\User\\[user]\\.ssh\config**

```ssh
Host [EC2 이름]
    HostName [위에서 발급한 static IP]
    User [EC2의 USER NAME(pem 파일 다운로드 버튼 바로 위에서 확인)]
    IdentityFile [pem 파일의 저장 경로]
```

위의 형식대로 적어주면 된다. 접속 준비는 끝.

_vscode 왼쪽에서 모니터 모양의 **Remote Explorer** 클릭하여 설정한 EC2로 접속하면 된다._

---

## Ubuntu 초기 설정

ubuntu에 접속이 되었으면 이제 초기 설정을 해보자.

### 버전 정보 확인하기

아래의 명령어를 입력하면 해당 서버의 ubuntu server의 버전 정보를 확인할 수 있다.

```bash
lsb_release -a
```

### APT package update & upgrade

우분투에서는 package 관리 툴로 **apt**를 주로 사용한다.

_명령어 앞에 **sudo**를 붙여 관리자 권한으로 실행한다._

**update** 명령어를 사용하여 package list를 최신 버전으로 업데이트한다.<br>

```bash
sudo apt update
```

**upgrade** 명령어를 사용하여 설치된 packages를 최신 버전으로 업그레이드한다.

```bash
sudo apt upgrade -y
```

### Timezone 변경하기

서버의 타임존은 'UTC'(국제 표준시)로 기본 설정되어 있다. 개발 시 DB의 시간 데이터나 로그 기록에 영향을 줄 수 있기 때문에 'KST'(한국 시간)로 맞춰준다.

**date** 명령어를 통해 현재 타임존을 확인한다.

```bash
date
# Mon Jan 30 04:02:55 UTC 2023
```

다음 명령어를 통해 타임존을 'KST'으로 설정한다.

```bash
sudo timedatectl set-timezone 'Asia/Seoul'
```

[_여기_](https://manpages.ubuntu.com/manpages/focal/man3/DateTime::TimeZone::Catalog.3pm.html)를 통해 다른 타임존을 확인할 수 있다.

시간대가 성공적으로 바뀌었는지 확인한다.

```bash
date
# Mon Jan 30 14:18:18 KST 2023
```

**timedatectl** 명령어로도 서버의 타임존 정보를 확인할 수 있다.

```bash
timedatectl
#                Local time: Mon 2023-01-30 14:22:02 KST
#            Universal time: Mon 2023-01-30 05:22:02 UTC
#                  RTC time: Mon 2023-01-30 05:22:03
#                 Time zone: Asia/Seoul (KST, +0900)
# System clock synchronized: yes
#               NTP service: active
#           RTC in local TZ: no
```

끝.
