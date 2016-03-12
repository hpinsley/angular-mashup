import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptionsArgs, Response} from 'angular2/http';
import {Authentication} from './Authentication';

@Injectable()
export class Server {

	constructor(public http:Http, public authenticationService:Authentication) {

	}

    get(url:string) : Observable<Response> {
        var headers = new Headers();

        if (this.authenticationService.bearerToken) {
            headers.append('Authorization', 'Bearer ' + this.authenticationService.bearerToken);
        }

		var options: RequestOptionsArgs = {
			headers: headers
		};

        console.info(`Get ${url}.`);

		let result = this.http.get(url, options);
        return result;
    }

    post(url:string, data:any) : Observable<Response> {
        let dataStr = JSON.stringify(data);

        var headers = new Headers();
		headers.append('Content-Type', 'application/json');

        if (this.authenticationService.bearerToken) {
            headers.append('Authorization', 'Bearer ' + this.authenticationService.bearerToken);
        }

		var options: RequestOptionsArgs = {
			headers: headers
		};

        console.info(`Posting to ${url}.  Data: ${dataStr}.`);

		let result = this.http.post(url, dataStr, options);
        return result;
    }
}
