https://github.com/chentsulin/electron-react-boilerplate 를 base로 하였습니다. 

https://poscoict-arvrmr.github.io/docs/ 를 참고하세요.

## second의 uitest 브랜치입니다.

### 브랜치 다운받기
이 브랜치를 merge하기 전에 따로 다운로드 받아 실행하고 싶은 경우에는 다음 중 하나를 선택해서 커맨드를 따라하세요.

1. 새로운 폴더를 만든다. 생성한 폴더의 master 브랜치에 remote repo의 uitest 브랜치가 복제된다.

```
$ mkdir new
$ cd new
$ git init
$ git remote add -t uitest -f origin https://github.com/poscoict-arvrmr/second.git
$ git pull origin master
```

2. 기존 master가 있는 폴더에 uitest 브랜치를 추가한다.
현재 브랜치는 master
```
$ git clone -b uitest --single-branch https://github.com/poscoict-arvrmr/second.git --depth 1
$ git checkout uitest
```

하면 uitest 라는 브랜치가 생겼고, 그 안에 remote branch 내용이 복제되어 있다. master 브랜치와 master의 본래 내용은 그대로 살아있다.

### 실행 팁 
참고로 package.json 에서 firebase 를 찾아 지운 뒤,

```
$ npm install
$ npm install firebase --save 
$ npm run dev 
```

npm install 하고 나서 에러가 나도 무시하고 진행하면 됩니다.