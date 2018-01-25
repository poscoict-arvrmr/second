https://github.com/chentsulin/electron-react-boilerplate 를 base로 하였습니다. 

https://poscoict-arvrmr.github.io/docs/ 를 참고하세요.

## 주의사항 (checkNative에러가 보인다면..)
firebase 는 ./package.json 에서 지우기

$ npm uninstall firebase

./app/package.json 에서 install

$ cd app
$ npm install firebase --save

### second의 uitest 브랜치와 merge - 2018.01.24

### master 외의 브랜치 다운받기?
$ git clone your-git-remote-repo-address.git --depth=1

>> 이때 모든 브랜치도 다 다운받음 (최신 git 버젼에서는.)

$ git fetch origin (혹시나 원하면..)

$ git branch

>> master 만 나올것임.

$ git checkout uitest 

>> uitest는 remote repo의 non-master branch. checkout 하면 자동으로 생김. 그 안에 branch 정보 다 저장되어있음. 단, remote repo의 branch 와 반드시 이름이 같도록 설정하긔.

