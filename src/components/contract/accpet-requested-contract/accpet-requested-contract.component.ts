import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHelper } from 'src/helper/errorHelper';
import { ContractService } from 'src/services/contract/contract.service';

@Component(
	{
		selector: 'accpet-requested-contract',
		templateUrl: './accpet-requested-contract.component.html',
		styleUrls: ['./accpet-requested-contract.component.css']
	}
)

export class AccpetRequestedContractComponent implements OnInit
	{
		isLoading:boolean = false;
		contractId!: string;
		contract!: any;

		constructor
		(
			private route: ActivatedRoute,
			private router: Router,
			private contractService: ContractService,
			private errorHelper: ErrorHelper
		){}

		ngOnInit
		(): void 
			{
				this.route.params.subscribe(params => 
					{
						this.contractId = params['contractId'];
						if
						(
							this.contractId
						)
							{
								this.getContract();
							}
						else
							{
								this.navigateToRequestedContractList();
							}
						
					}
				);
				
			}

		async getContract
		(): Promise<void>
			{

				try
					{
						this.isLoading = true;

						const data = await this.contractService
							.get(
								this.contractId
							);
						console.log(data.contract);
						this.contract = data.contract;

						this.isLoading = false;
					}
				catch
				(
					error: any
				)
					{
						this.isLoading = false;
						this.errorHelper.showErrorAsAlert(error);
					}
				
			}

		async accpet
		():Promise<void>
			{
					

				try
					{
						this.isLoading = true;
						const data = await this.contractService
							.acceptRequestedContract(
								this.contractId
							);
						console.log(data.result);
						this.isLoading = false;

						// show message 
						
						this.navigateToRequestedContractList();
					}
				catch
				(
					error: any
				)
					{
						this.isLoading = false;
						this.errorHelper.showErrorAsAlert(error);
					}
			}

			
		async reject
		():Promise<void>
			{
				try
					{
						this.isLoading = true;
						const data = await this.contractService
							.rejectRequestedContract(
								this.contractId
							);
						console.log(data.result);
						this.isLoading = false;

						this.navigateToRequestedContractList();
					}
				catch
				(
					error: any
				)
					{
						this.isLoading = false;
						this.errorHelper.showErrorAsAlert(error);
					}
			}

		navigateToRequestedContractList
		():void
			{
				const requestedContractListUrlPartList:any[] = ['/','contractManagement','list','requested']
				this.router.navigate(
					requestedContractListUrlPartList
				);
			}

	}
