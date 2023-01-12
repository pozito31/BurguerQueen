import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { OrderService } from 'src/app/services/order.service';
import * as _ from 'lodash';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Modales
  @ViewChild("modal_order", { static: false }) modal_order;
  @ViewChild("modal_choose_payment", { static: false }) modal_choose_payment;
  @ViewChild("modal_paypal", { static: false }) modal_paypal;
  @ViewChild("modal_num_order", { static: false }) modal_num_order;

  public payPalConfig ? : IPayPalConfig;

  constructor(
    private modalService: NgbModal,
    public orderService: OrderService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.payPalConfig = {
            currency: 'EUR',
            clientId: 'AZGZRTUjcqqTE95zj28VSbmrwy_Rtirm4hMRiEsucIn8qtid27CYQmNxyU6kjaLB6QkUaSd_kzaQX_6n',

            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);

            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
    };
  }

  openModalOrder() {
    this.modalService.open(this.modal_order, { windowClass: "my-modal-dialog" }).result.then(result => {
      // Si hemos pulsado el boton de hacer pedido, crearemos el pedido
      if (result === 'yes') {
        this.modalService.open(this.modal_choose_payment, { windowClass: "my-modal-dialog" }).result.then(typePayment => {
          if (typePayment === 'paypal') {
            const items = [];

            _.forEach(this.orderService.order.productsOrder, product => {
              items.push({
                name: this.translateService.getTranslate(product.name),
                quantity: product.quantity,
                unit_amount: {
                  currency_code: 'EUR',
                  value: product.totalPrice().toFixed(2)
                }
              })
            });

            this.payPalConfig.createOrderOnClient = (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [{
                  amount: {
                    currency_code: 'EUR',
                    value: this.orderService.order.totalOrder().toFixed(2),
                    breakdown: {
                      item_total: {
                        currency_code: 'EUR',
                        value: this.orderService.order.totalOrder().toFixed(2)
                      }
                    }
                  },
                  items: items
                }]
            };

            this.payPalConfig.onApprove = (data, actions) => {
              console.log("Vamos a crear el pedido");
              // Creo el pedido desde el servicio
              this.orderService.createOrder().subscribe(data => {
                console.log("se ha creado el objeto ", data);
                // Limpio la orden
                this.orderService.clearOrder();

                // Abro el modal para mostrar el numero de pedido
                this.modalService.open(this.modal_num_order).result.then(r_num_order => {
                  this.modalService.dismissAll('close');
                });

              }, error => {
                console.log("Ha habido un error: " + error);
              })
            };

            this.modalService.open(this.modal_paypal, { windowClass: "my-modal-dialog" });
          } else {
            console.log("Vamos a crear el pedido");
            // Creo el pedido desde el servicio
            this.orderService.createOrder().subscribe(data => {
              console.log("se ha creado el objeto ", data);
              // Limpio la orden
              this.orderService.clearOrder();

              // Abro el modal para mostrar el numero de pedido
              this.modalService.open(this.modal_num_order);

            }, error => {
              console.log("Ha habido un error: " + error);
            })
          }
        })

      } else {
        console.log("Se ha cancelado el pedido");

      }
    })
  }


}
