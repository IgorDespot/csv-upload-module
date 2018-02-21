Developer diary

- Use npm 5.2.0 since there are issues with npm 5.3.0 on Windows 10
- Use npm recursive-install package to install all modules from nested
package.json files. Use with "npx recursive-install".
- Download docker image using "docker pull marijaborisov/csvmodule"
- Run the downloaded docker image: 
"docker run -p 3000:3000 -d marijaborisov/csvmodule"