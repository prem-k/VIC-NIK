import { Injectable } from '@angular/core';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class ConfigService {

  	constructor() { } 

  	public configInfo : {} = ''; // aise he

  	public tdsCharge : Number = 5; // in percent
	public handlingCharge : Number = 5; // in percent

	//public apiUrl = 'http://localhost:3000/';

	public apiUrl = 'http://192.168.254.59/victoryledbackend/';

	//public apiUrl = 'https://admin.ndroidpro.com/victoryledbackend/';

	//public apiUrl = 'https://victoryled.in/backend/';

	public pusherTimeout = 60*60*1000;  // 1 Hour

	public appVersion = '1.27.4';

	public allowLogs: false; 

}



