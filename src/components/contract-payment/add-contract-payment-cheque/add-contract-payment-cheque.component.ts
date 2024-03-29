import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateHelper } from 'src/helper/dateHelper';
import { ContractPaymentService } from 'src/services/contractPayment/contract-payment.service';

@Component(
	{
		selector: 'add-contract-payment-cheque',
		templateUrl: './add-contract-payment-cheque.component.html',
		styleUrls: ['./add-contract-payment-cheque.component.css']
	}
)

export class AddContractPaymentChequeComponent
	{

		@Input() contractId:string = "";
		@Output() onItemAdded = new EventEmitter<any>();
		
		contractPayment:any ={};
		isLoading:boolean = false;
		validationResult: any ={};

		constructor
		(
			private contractPaymentService: ContractPaymentService,
			private dateHelper:DateHelper
		){}

		setBank(
			bank:any
		):void
			{
				this.contractPayment.bank = bank;
			}

		setBankAccount(
			bankAccount:any
		):void
			{
				this.contractPayment.bankAccount = bankAccount;
			}

		setPrice
		(
			price:number
		):void
			{
				this.contractPayment.price = price;
			}

		setDueDate
		(
			contractPaymentDueDate:any
		):void
			{
				console.log('contractPaymentDueDate');
				console.log(contractPaymentDueDate);
				
				this.contractPayment.dueDate = this.dateHelper.getDateTehranTimeZoneDate(
					contractPaymentDueDate.year,
					contractPaymentDueDate.month,
					contractPaymentDueDate.day
				);
				
				this.contractPayment.dueDateShamsi = this.dateHelper.getDateTehranTimeZoneDateString(
					contractPaymentDueDate.year,
					contractPaymentDueDate.month,
					contractPaymentDueDate.day
				);
			}

		validate
		(
			contractPayment: any
		): any
			{
				let validationResult: any ={
					hasError: false,
					messageList: []
				};
			
				if (!contractPayment.price){
					validationResult.hasError = true;
					validationResult.messageList.push("بخش مبلغ را وارد کنید.");
				}
			
				if(!contractPayment.bankAccount){
					validationResult.hasError = true;
					validationResult.messageList.push("شماره حساب را انتخاب کنید.");
				}
			
			
				if(!contractPayment.dueDate){
					validationResult.hasError = true;
					validationResult.messageList.push("تاریخ سررسید را وارد کنید.");
				}

				if(!contractPayment.chequeNumber){
					validationResult.hasError = true;
					validationResult.messageList.push("شماره چک را وارد کنید.");
				}

				if(!contractPayment.bank){
					validationResult.hasError = true;
					validationResult.messageList.push("بانک صادر کننده ی چک را انتخاب کنید.");
				}

				if(!contractPayment.drawer){
					validationResult.hasError = true;
					validationResult.messageList.push("نام و نام خانوادگی صاحب چک را وارد کنید.");
				}

			
				return validationResult;
			}

		async save
		():Promise<void>
			{
				this.validationResult  = this.validate(this.contractPayment);

				if
				(
					this.validationResult .hasError
				)
					{
						return;
					}
				else
					{
						try
							{
		
								this.isLoading = true;
		
								const data = await this.contractPaymentService.addCheque(
									this.contractId,
									this.contractPayment.price,
									this.contractPayment.bankAccount._id,
									this.contractPayment.dueDate,
									this.contractPayment.dueDateShamsi,
									this.contractPayment.chequeNumber,
									this.contractPayment.bank._id,
									this.contractPayment.drawer
								);
		
								console.log(data.contractPaymentId);
								this.contractPayment._id = data.contractPaymentId
							
								this.isLoading = false;

								this.onItemAdded.emit(this.contractPayment);
							}
						catch
						(
							error:any
						)
							{
								this.isLoading = false;
								
								if
								(
									error.error &&
									error.error.message
								)
									{
										alert(error.error.message);
									}
								else
									{
										alert(error)
									}
							}
					}
				
			}
	}
