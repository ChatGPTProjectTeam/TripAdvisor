# trip advisor backend


### prerequisites
1. python3.12
2. mysql


### 개발 환경 설정
```bash
# 가상 환경 세팅 (세팅한 경우 생략 가능)
$ python3.12 -m venv venv
$ source venv/bin/activate

# 패키지 설치
$ pip install -r requirements.txt
```

### 데이터베이스
로컬호스트에서 아래와 같이 데이터베이스를 생성해주세요.

```sql
CREATE DATABASE `tripper` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'tripper'@'%' IDENTIFIED BY '*tripper';
GRANT ALL PRIVILEGES ON `tripper`.* TO 'tripper'@'%';
```


### .env
본 프로젝트는 .env 파일을 통해 환경변수를 관리합니다. 아래와 같이 .env 파일을 생성해주세요.  
경로: backend/.env
```
OPENAI_API_KEY=""
SQLALCHEMY_DATABASE_URL="mysql://tripper:*tripper@localhost:3306/tripper"
```


### 로컬 실행
```bash
cd backend
uvicorn main:app --reload
```

아래와 같이 실행이 된다면 http://127.0.0.1:8000/docs# 에서 API 문서를 확인할 수 있습니다. 
```bash
(.venv) shmoon ~/Desktop/projects/TripAdvisor/backend uvicorn main:app --reload
INFO:     Will watch for changes in these directories: ['/Users/shmoon/Desktop/projects/TripAdvisor/backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [52275] using StatReload
INFO:     Started server process [52277]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

