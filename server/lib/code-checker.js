import https from "https";
import crypto from "crypto";

export class CodeChecker {
    constructor(token) {
        this.token = token;
    }

    run(zip) {
        var requestId = crypto.randomUUID();
        console.log('Start run code check with id ' + requestId);

        var solution = {
            zip: zip,
            launchInfo: {
                solutionName: 'HelloWorld',
                dockerImageName: 'ulearn-dotnet-sandbox',
                timeLimitSeconds: 100
            }
        };
        var data = JSON.stringify(solution);
        var options = {
            hostname: 'code-checker.testkontur.ru',
            port: 443,
            path: '/api/v1/teams/dotnext-challenge/solution-zips/' + requestId,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': 'Bearer ' + this.token
            }
        };
        const request = https.request(
            options, (response) => {
                console.log('Response Status Code :>> ', response.statusCode);

                response.on('data', (chunk) => {
                    console.log(`Data arrived: ${chunk.toString()}`);
                });

                response.on('error', (err) => {
                    console.log('Response error :>> ', err);
                })

            });

        request.write(data);
        request.end();

        return requestId;
    }

    async getResult(requestId) {
        return new Promise((resolve, reject) => {
            var options = {
                hostname: 'code-checker.testkontur.ru',
                port: 443,
                path: '/api/v1/solution-result/' + requestId,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            };
            const request = https.request(
                options, (response) => {
                    console.log('Response Status Code :>> ', response.statusCode);

                    let data = ''

                    response.on('data', (chunk) => {
                        console.log(`Data arrived: ${chunk.toString()}`);
                        data += chunk;
                    });

                    response.on('end', () => {
                        try {
                            var result = JSON.parse(data);
                            console.log('Response Body:', result);
                            resolve(result)
                        } catch (e) {
                            console.error('Error parsing JSON:', e.message);
                            console.log('Raw Response Body:', rawData); // Fallback to raw data
                            reject(e);
                        }
                    });

                    response.on('error', (err) => {
                        console.log('Response error :>> ', err);
                        reject(err);
                    })

                });

            request.end();
        })
    }
}