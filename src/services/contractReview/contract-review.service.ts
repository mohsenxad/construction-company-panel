import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthHttpInterceptorService } from '../authHttpInterceptor/auth-http-interceptor.service';
import { environment } from 'src/environments/environment';

@Injectable(
	{
  		providedIn: 'root'
	}
)

export class ContractReviewService
	{
		private URL_CONTRACT_REVIEW_ADD: string = `${environment.API_URL}/contractReview`;
		private URL_CONTRACT_REVIEW_GET: string = `${environment.API_URL}/contractReview`;
		private URL_CONTRACT_CUSTOMER_REMOVE: string = `${environment.API_URL}/contractReview`;
		private URL_CONTRACT_REVIEW_GET_ALL: string = `${environment.API_URL}/contractReview`;
		private URL_CONTRACT_REVIEW_GET_ALL_BY_CONTRACT: string = `${environment.API_URL}/contractReview/byContract`;
		private URL_CONTRACT_REVIEW_SET_REVIEW_RESULT: string = `${environment.API_URL}/contractReview/setReviewResult`;

		constructor
		(
			private httpInteceptor: AuthHttpInterceptorService,
		){}
		

		async add
		(
			contractId: string,
			userCompanyAccessId: string
		):Promise<any>
			{
				{
					let headers: HttpHeaders = new HttpHeaders();

					let body: any = {
						contractId: contractId,
						userCompanyAccessId: userCompanyAccessId
					};

					const result = await  this.httpInteceptor.postWithAuth_(
						this.URL_CONTRACT_REVIEW_ADD,
						headers,
						body
					);

					return result;
				}
			}

		async getAll
		(): Promise<any>
			{
				let headers: HttpHeaders = new HttpHeaders();
	
				const result = await this.httpInteceptor.getWithAuth_(
					this.URL_CONTRACT_REVIEW_GET_ALL,
					headers
				);

				return result;
			};

		async getAllByContract
		(
			contractId: string
		): Promise<any>
			{
				let headers: HttpHeaders = new HttpHeaders();

				let url = `${this.URL_CONTRACT_REVIEW_GET_ALL_BY_CONTRACT}/${contractId}`;
	
				const result = await this.httpInteceptor.getWithAuth_(
					url,
					headers
				);

				return result;
			};

		async get
		(
			contractReviewId: string
		): Promise<any>
			{
				let headers: HttpHeaders = new HttpHeaders();

				let url = `${this.URL_CONTRACT_REVIEW_GET}/${contractReviewId}`;

				const result = await this.httpInteceptor.getWithAuth_(
					url,
					headers
				);

				return result;
			}

		async setReviewResult
		(
			contractReviewId: string,
			isApproved:boolean,
			isRejected:boolean
		):Promise<any>
			{
				let headers: HttpHeaders = new HttpHeaders();

				let body: any = {
					contractReviewId: contractReviewId,
					isApproved: isApproved,
					isRejected: isRejected,
				};

				const result = await this.httpInteceptor.postWithAuth_(
					this.URL_CONTRACT_REVIEW_SET_REVIEW_RESULT,
					headers,
					body
				);

				return result;
			}
		
		async remove
		(
			contractReviewId: string
		): Promise<any>
			{
				let headers: HttpHeaders = new HttpHeaders();

				const url = `${this.URL_CONTRACT_CUSTOMER_REMOVE}/${contractReviewId}`;

				const result = await this.httpInteceptor.deleteWithAuth_(
					url,
					headers,
					{}
				);

				return result;
			}
	}
