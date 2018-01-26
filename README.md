https://github.com/chentsulin/electron-react-boilerplate 를 base로 하였습니다. 

https://poscoict-arvrmr.github.io/docs/ 를 참고하세요.

### 스크린 사이즈
main.dev.js 에서 수정하기.
1. fullscreen 을 원하면 frame: false, fullscreen:true
2. 아니면 show: false, width: 1024, height: 728 

### 주의사항 (checkNative에러가 보인다면..)
firebase 는 ./package.json 에서 지우고,  ./app/package.json 에서 install
```s
$ npm uninstall firebase
$ cd app
$ npm install firebase --save
```

##### $npm install 에서 생기는 flow-typed 에러는 뭔지 알 수 없음.. 
>> !! No flow@v0.63.1-compatible libdefs found in flow-typed for the above untyped dependencies !!

##### second의 uitest 브랜치와 merge - 2018.01.24

##### master 외의 브랜치 다운받기?
```s
$ git clone your-git-remote-repo-address.git --depth=1
이때 모든 브랜치도 다 다운받음 (최신 git 버젼에서는.)
$ git fetch origin 
(혹시나 원하면..)
$ git branch
master 만 나올것임.
$ git checkout uitest 
```
참고로 uitest는 remote repo의 non-master branch의 이름. checkout 하면 자동으로 생기면서 그 안에다가 해당 uitest branch 정보 다 저장함. 단, remote repo의 branch 와 반드시 이름이 같도록 설정하긔.

