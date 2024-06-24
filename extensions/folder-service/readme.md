### Folder Service 

open doc folder then trigger render on web page

@route: folder

@paramters:
    dir=/WorkSpace/zanvil_page
    file=__manifest__.py

http://127.0.0.1:8080/folder?dir={}&file={}line={}
http://127.0.0.1:8080/folder?dirId={}&file={}line={}


eg:
    http://localhost:3030/folder?dir=/workspace/code/src&file=welcome.md&line=12



    http://127.0.0.1:8080/folder?dir=/WorkSpace/zanvil_page&file=__manifest__.py&line=11


    http://127.0.0.1:8080/folder?dir=/WorkSpace/zanvil_page&file=static/src/password_meter.js&line=1&line=14