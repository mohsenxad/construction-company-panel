import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContractTemplateService } from 'src/services/contractTemplate/contract-template.service';

@Component(
	{
		selector: 'select-contract-template',
		templateUrl: './select-contract-template.component.html',
		styleUrls: ['./select-contract-template.component.css']
	}
)

export class SelectContractTemplateComponent implements OnInit
	{
		@Output() setContractTemplate = new EventEmitter<any>();

		contractTemplateList: any[]= [];
		selectedContractTemplate:any = {};
		isLoading: boolean = false;

		constructor
		(
			private contractTemplateService: ContractTemplateService
		){}
			
		ngOnInit
		(): void 
			{
				this.getAllContractTemplateList();
			}

		async getAllContractTemplateList
			(): Promise<void>
				{
					try
						{
							this.isLoading = true;

							const data = await this.contractTemplateService.getAll()
							console.log(data.contractTemplateList);
							this.contractTemplateList = data.contractTemplateList;

							this.isLoading = false;
						}
					catch
					(
						error:any
					)
						{
							this.isLoading = false;
							alert(error.error);
						}
					
				}

		remove
		():void
			{
				this.selectedContractTemplate = {};
				this.setContractTemplate.emit(undefined);
			}

		selectContractTemplate
		(
			contractTemplate:any
		):void
			{
				this.selectedContractTemplate = contractTemplate;
				this.setContractTemplate.emit(contractTemplate);
			}
	}