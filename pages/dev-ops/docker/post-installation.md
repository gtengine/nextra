# Docker User 추가 설정

`docker` 명령어를 실행할 때마다 앞에 `sudo`를 붙여줘야 해서 너무 귀찮다.

`root`가 아니어도 실행할 수 있도록 만들어 줘야겠다.

---

## Manage Docker as a non-root user

*Docker daemon*은 TCP 포트가 아닌 Unix 소켓에 바인딩된다.

기본적으로 Unix 소켓을 소유하는 것은 `root`이기 때문에 다른 사용자는 `sudo`를 앞에 붙여줘야 Unix 소켓에 접근이 가능하다.

`sudo`를 붙이지 않고도 `docker` 명령어를 실행하려면 *docker*라는 Unix 그룹을 만들고 여기에 사용자를 추가해 주어야한다.

그래야 *Docker daemon*이 실행될 때, _docker_ 그룹의 사용자가 접근할 수 있는 Unix 소켓을 생성하기 때문이다.

일부 Linux 배포판에서는 *Docker Engine*을 설치할 때 시스템이 패키지 관리자를 통해 이 그룹을 자동으로 생성해 주는데 이 경우에는 사용자 그룹을 직접 만들 필요가 없다.

#### 1. Create the docker group

```bash
sudo groupadd docker
```

#### 2. Add your user to the docker group

```bash
sudo usermod -aG docker $USER
```

#### 3. Activate the changes to group

```bash
newgrp docker
```

#### 4. Verify to run docker commands with out sudo

```bash
docker run hello-world
```

---

사용자를 docker 그룹에 추가하기 전에 `sudo`를 사용하여 `docker` 명령어를 실행한 적이 있으면 다음과 같은 에러가 발생할 수 있다.

```bash
WARNING: Error loading config file: /home/user/.docker/config.json -
stat /home/user/.docker/config.json: permission denied
```

이 에러는 전에 `sudo` 명령을 사용했기 때문에 `~/.docker/` 디렉토리에 대한 권한 설정이 올바르게 되지 않아서 발생하는 것이다.

이 문제를 해결하려면 `~/.docker/` 디렉토리를 제거하거나 (제거하면 자동으로 다시 생성되서 따로 다시 만들어줄 필요는 없지만 모든 사용자 지정 설정도 손실됨),

다음 명령어를 사용하여 소유권과 권한을 변경하면 된다.

```bash
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
```

```bash
sudo chmod g+rwx "$HOME/.docker" -R
```

끝.
