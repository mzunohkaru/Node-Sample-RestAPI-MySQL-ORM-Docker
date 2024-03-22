## インストール
$ npm i express cors nodemon mysql2 dotenv

$ npm install --save sequelize

## グローバル環境にインストール

$ sudo npm install -g sequelize-cli

## Userモデルの作成

$ npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string

## Docker Command
$ docker-compose up --build
$ docker-compose build --no-cache && docker-compose up

## データベース (MySQL) へのアクセス
$ docker-compose exec db mysql -uuser -ppassword dev

## データベースのマイグレーション
$ docker-compose exec backend npx sequelize-cli db:migrate

## テストデータを追加する
$ docker-compose exec backend npx sequelize-cli db:seed:all

## データを元に戻す
$ npx sequelize-cli db:seed:undo:all

## 32バイトのランダムなデータを生成し、それを16進数の文字列に変換して出力
$ node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
