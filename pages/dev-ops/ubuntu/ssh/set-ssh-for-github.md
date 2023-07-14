# Ubuntu와 Github SSH 통신

linux 환경에서 ssh-key를 생성하고 github에 등록하는 방법을 정리해 놓는다.

**SSH**는 **_Secure Shell_**의 줄임말로 원격 호스트에 접속하기 위해 사용되는 보안 프로토콜이다. **원격 접속 과정에서 데이터를 암호화**하는 기술이다.

---

## ssh-key 생성

ssh는 한 쌍의 공개키와 개인키가 필요하다. 설치하기 전에 혹시나 이미 만들어져 있는 키가 있는지 확인을 해보자.

```bash
cd .ssh
```

```bach
ls
```

[`id_ed25519`, `id_ed25519.pub`] 또는 [`id_rsa`, `id_rsa.pub`]와 같은 한 쌍의 키가 있는지 확인하면 된다. 여러 키를 생성해서 사용해도 되지만 각자 지정해줘야 하기 때문에 귀찮다.

이미 생성된 키가 없다면 다음의 명령어로 생성하면 된다.

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

또는

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

위의 `ed25519`와 `rsa`는 암호화 알고리즘이다. 생성하는 키를 어떤 알고리즘을 사용하여 암호화할 것인지 선택하는 것이다.

키 생성 명령어를 입력하면 저장 경로와 비밀번호 설정 여부에 대해서 묻는다.

파일 위치 또는 비밀번호 설정을 하고 싶다면 입력하고, 빈 값으로 두면 파일은 `.ssh` 안에, 비밀번호는 없음으로 설정된다. 파일이름을 원하는 이름으로 생성하고 싶다면 저장 위치를 묻는 란에 파일이름만 입력하면 된다.

```bash
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/ubuntu/.ssh/id_ed25519): "파일 이름"
Enter passphrase (empty for no passphrase): "비밀번호"
Enter same passphrase again: "비밀번호 확인"
```

키가 저장되었다는 메세지가 뜨면서 생성이 완료될 것이다.

생성된 키 페어는 다음과 같다.

- 개인키: `/home/ubuntu/.ssh/mgt`
- 공개키: `/home/ubuntu/.ssh/mgt.pub`

키가 잘 생성되었는지 확인해보면 알수없는 암호들이 적혀있을 것이다.

```bash
cat mgt
```

**_개인키는 절대로 외부에 공개되어서는 안 된다._**

---

## 공개키 github에 등록

ssh를 사용하여 github을 이용하기 위해서는 생성한 키 페어 중 공개키를 등록해줘야 한다.

먼저 [github.com](https://github.com/) 계정이 필요하다.

1. 로그인 후, **우측 상단 프로필 사진 - settings**로 이동힌다.

2. settings에서 **좌측 메뉴 - SSH and GPG keys**로 이동한다.

3. 페이지 본문에서 **SSH keys - New SSH key**로 이동한다.

4. Title에는 **ssh를 등록할 서버의 이름**을 지어준다.

5. Key에는 위에서 **생성한 키 페어 중 공개키인 `.pub`파일의 내용을 복사하여 붙여넣기** 해준다.

6. 모두 완료 되었으면 **Add SSH key** 버튼을 눌러 등록을 완료한다.

---

## ssh 접속 설정

github에 ssh key를 등록했으면 이제 서버의 차례다. 서버에도 github과 ssh 통신을 하겠다고 명시해 주어야 한다.

이를 위해서 `config` 파일이 필요한데, 없으면 생성하면 된다.

```bash
vi config
```

`config` 파일의 내용은 다음과 같이 입력해주면 된다.

```ssh
HOST github.com
    IdentityFile ~/.ssh/mgt
    User git
```

`config` 파일의 설정이 끝났으면 테스트를 해볼 수 있다.

```bash
ssh -T git@github.com
```

지문의 `fingerprint`와 github에서 내가 등록한 ssh-key의 `fingerprint`가 같은지 확인하고 같으면 `yes`치고 넘어가면 된다.

```bash
Hi gtengine! You've successfully authenticated, but GitHub does not provide shell access.
```

하단에 github 계정의 username이 정상적으로 인증되었다는 메세지가 나오면 github과의 ssh 연결 설정은 모두 완료된 것이다.

이제 열심히 커밋만 하면 된다. 끝.
