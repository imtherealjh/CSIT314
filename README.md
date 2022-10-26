# CSIT314

## Configuratation
- Replace <name> with gitlab name and replace <email> with the email that is used to create gitlab account 
```
git config --global user.name "<name>"
git config --global user.email "<email>"
```

## Preparing token for cloning
1) Click on profile on the top right corner
2) Click on preference
3) On the left menu, select access tokens
4) Provide token a name
5) From the select list, select api
6) Click on create personal access token
7) A token will be generated on the on top of the "Add a personal token" header
8) Copy the token and store it somewhere
9) Replace <username> with your gitlab username and <token> with the newly generated token

## Cloning repository to local
```
git clone https://<username>:<token>@gitlab.com/csit314-qwerty/research-conference-system
```

## Adding files to current repo
```
git add .
git commit -m <message>
git push origin
```

## To start the app
```
cd folder_containing_project
npm i
node ./src/server.js
```

## Not as important
cd existing_repo \
git remote add origin \
git init --initial-branch=main\
git branch -M main