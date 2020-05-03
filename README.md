# Udagram User Service

## Coding Style Guide
​
codestyle is defined in the tslint config file [tslint.json](tslint.json)
​
## Build Tool
​
### Prerequisites
​
- nodejs
- docker
​
### Overview
 see all node commands in [package.json](package.json)
 
### Build
```shell script
node run build
```

### Run Dev
```shell script
node run dev
```
​
### Dockerize

e.g.
```shell script
docker build -t <image_tag> . && docker run --env-file ../docker.env <image_tag> 
```

docker.env file should include:

```shell script
POSTGRESS_USERNAME=xxx
POSTGRESS_PASSWORD=xxx
POSTGRESS_DB=xxx
POSTGRESS_HOST=xxx
AWS_REGION=xxx
AWS_PROFILE=xxx
AWS_BUCKET=xxx
JWT_SECRET=xxx
```

### Running tests

#### unit tests
to be implemented
​
## Versioning
​
This project uses [SemVer](https://semver.org/) for versioning and [gitflow](https://danielkummer.github.io/git-flow-cheatsheet/) for the git workflow
​
The Version number is defined by Tags in git. The Version-name is based on git-Tags.
​​
## License
​
© 2020 jaschke.it All Rights Reserved.
