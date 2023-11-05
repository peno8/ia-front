# Interactive-Alpha-Front

Frontend server of [Interactive-Alpha](https://interactive-alpha.com/)

with Typescript, Next.js

## Getting Started

```bash
NEXT_PUBLIC_BACKEND_URL='http://127.0.0.1:8080' npm run dev
```

## Build
```
npm run build

docker build -t xxxx/ia-front:0.0.x . 

docker push xxxx/ia-front:0.0.x 
```

## Maintenance
```
npm audit
# list vulnerabilities

npm outdated
# list outdated packages

npm update
# update 'wanted' packages
```
