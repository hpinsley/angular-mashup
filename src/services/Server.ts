import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers, RequestOptionsArgs, Response} from 'angular2/http';

@Injectable()
export class Server {

	constructor(public http:Http) {

	}

    post(url:string, data:any) : Observable<Response> {
        let dataStr = JSON.stringify(data);

        var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		var options: RequestOptionsArgs = {
			headers: headers
		};

        console.info(`Posting to ${url}.  Data: ${dataStr}.`);

		let result = this.http.post(url, dataStr, options);
        return result;
    }
}
